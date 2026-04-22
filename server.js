const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3100;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 정적 파일 서빙
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.sw.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
    if (path.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/manifest+json');
    }
  }
}));

// 데이터 저장 경로
const DATA_DIR = path.join(__dirname, 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'history.json');

// 설정 로드 함수
async function loadConfig() {
  try {
    // 먼저 config.json 시도
    const configData = await fs.readFile(path.join(__dirname, 'config.json'), 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    try {
      // config.json이 없으면 config.example.json 시도
      const exampleConfigData = await fs.readFile(path.join(__dirname, 'config.example.json'), 'utf8');
      return JSON.parse(exampleConfigData);
    } catch (exampleError) {
      // 둘 다 없으면 기본값 사용
      console.warn('설정 파일을 찾을 수 없습니다. 기본값을 사용합니다.');
      return {
        endpoints: {
          paas: {
            url: 'https://api.z.ai/api/paas/v4',
            models: ['glm-4.7-flash']
          },
          coding: {
            url: 'https://api.z.ai/api/coding/paas/v4',
            models: ['glm-5.1', 'glm-5-turbo', 'glm-5', 'glm-4.7', 'glm-4.6', 'glm-4.5']
          }
        },
        rateLimits: {
          'glm-5.1': 1, 'glm-5-turbo': 1, 'glm-5': 2, 'glm-4.7': 2,
          'glm-4.7-flash': 1, 'glm-4.6': 3, 'glm-4.5': 10
        },
        measureInterval: 60000
      };
    }
  }
}

// 설정 변수
let config;
let MEASUREMENT_CONFIG;
let ENDPOINT_MODELS;
let RATE_LIMITS;
let API_ENDPOINTS;

// 설정 초기화
async function initializeConfig() {
  config = await loadConfig();
  
  // 측정 모델 목록 (엔드포인트별)
  MEASUREMENT_CONFIG = [];
  Object.keys(config.endpoints).forEach(endpoint => {
    config.endpoints[endpoint].models.forEach(model => {
      MEASUREMENT_CONFIG.push({ model, endpoint });
    });
  });
  
  // 엔드포인트별 모델 목록 (프론트엔드용)
  ENDPOINT_MODELS = {};
  Object.keys(config.endpoints).forEach(endpoint => {
    ENDPOINT_MODELS[endpoint] = config.endpoints[endpoint].models;
  });
  
  // Rate limit 정보
  RATE_LIMITS = config.rateLimits;
  
  // API 엔드포인트
  API_ENDPOINTS = {};
  Object.keys(config.endpoints).forEach(endpoint => {
    API_ENDPOINTS[endpoint] = config.endpoints[endpoint].url + '/chat/completions';
  });
}

// 데이터 초기화 함수
async function initializeData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    try {
      await fs.access(HISTORY_FILE);
    } catch (error) {
      // 파일이 없으면 초기 데이터 생성
      const initialData = {
        measurements: [],
        lastUpdated: Date.now()
      };
      await fs.writeFile(HISTORY_FILE, JSON.stringify(initialData, null, 2));
    }
  } catch (error) {
    console.error('데이터 초기화 실패:', error);
  }
}

// z.ai API 응답 시간 측정 함수
async function measureApi(model, endpoint) {
  const startTime = Date.now();
  let status = 'error';
  let responseTime = 0;

  try {
    const response = await axios.post(API_ENDPOINTS[endpoint], {
      model: model,
      messages: [{ role: 'user', content: 'Hi' }],
      max_tokens: 10,
      stream: false
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30초 타임아웃
    });

    responseTime = Date.now() - startTime;
    status = response.status === 200 ? 'success' : response.status.toString();

    return {
      model,
      endpoint,
      responseTime,
      status,
      timestamp: Date.now()
    };
  } catch (error) {
    responseTime = Date.now() - startTime;
    status = error.response ? error.response.status.toString() : 'timeout';
    
    return {
      model,
      endpoint,
      responseTime,
      status,
      timestamp: Date.now()
    };
  }
}

// 데이터 저장 함수
let writeLock = false;

async function saveMeasurement(measurement) {
  if (writeLock) return;
  writeLock = true;
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf8');
    let history;
    try {
      history = JSON.parse(data);
    } catch (parseError) {
      console.warn('history.json 손상 감지, 새로 생성합니다');
      history = { measurements: [], lastUpdated: Date.now() };
    }
    
    history.measurements.push(measurement);
    
    // 7일 이전 데이터 삭제 (약 10,080개 데이터 포인트 보관)
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    history.measurements = history.measurements.filter(m => m.timestamp > oneWeekAgo);
    
    history.lastUpdated = Date.now();
    
    await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
  } catch (error) {
    console.error('데이터 저장 실패:', error);
  } finally {
    writeLock = false;
  }
}

// 정기 측정 함수
async function performMeasurements() {
  console.log(`측정 시작: ${new Date().toISOString()}`);
  
  for (let i = 0; i < MEASUREMENT_CONFIG.length; i++) {
    const { model, endpoint } = MEASUREMENT_CONFIG[i];
    console.log(`${model} 모델 (${endpoint} 엔드포인트) 측정 중...`);
    const measurement = await measureApi(model, endpoint);
    await saveMeasurement(measurement);
    
    // rate limit 방지를 위해 3초 대기 (마지막 측정 제외)
    if (i < MEASUREMENT_CONFIG.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log(`측정 완료: ${new Date().toISOString()}`);
}

// API 엔드포인트: 현재 상태
app.get('/api/status', async (req, res) => {
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf8');
    const history = JSON.parse(data);
    
    // 최근 10분 데이터로 상태 판단
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    const recentMeasurements = history.measurements.filter(m => m.timestamp > tenMinutesAgo);
    
    const status = {
      overall: 'stable',
      models: {},
      rateLimits: RATE_LIMITS
    };
    
    const endpointKeys = Object.keys(ENDPOINT_MODELS);
    let errorCount = 0;
    let totalModels = 0;
    
    endpointKeys.forEach(endpoint => {
      status.models[endpoint] = {};
      ENDPOINT_MODELS[endpoint].forEach(model => {
        totalModels++;
        const modelMeasurements = recentMeasurements.filter(m => 
          m.model === model && m.endpoint === endpoint
        );
        
        if (modelMeasurements.length > 0) {
          const successfulMeasurements = modelMeasurements.filter(m => m.status === 'success' || m.status === '200');
          const avgResponseTime = successfulMeasurements.length > 0 
            ? Math.round(successfulMeasurements.reduce((sum, m) => sum + m.responseTime, 0) / successfulMeasurements.length)
            : 0;
          
          const errorRate = (modelMeasurements.length - successfulMeasurements.length) / modelMeasurements.length;
          
          status.models[endpoint][model] = {
            avgResponseTime,
            errorRate: Math.round(errorRate * 100),
            status: errorRate > 0.3 ? 'danger' : errorRate > 0.1 ? 'warning' : 'stable'
          };
          
          if (errorRate > 0.3) errorCount++;
        } else {
          status.models[endpoint][model] = {
            avgResponseTime: 0,
            errorRate: 100,
            status: 'danger'
          };
          errorCount++;
        }
      });
    });
    
    if (errorCount === 0) {
      status.overall = 'stable';
    } else if (errorCount < totalModels / 2) {
      status.overall = 'warning';
    } else {
      status.overall = 'danger';
    }
    
    // 서버 시간대 설정 (config에서 읽기, 없으면 자동 감지)
    const detectedTz = config.serverTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    status.serverTimezone = detectedTz;
    
    // 서버 시간대 레이블 설정
    const timezoneLabels = {
      'Asia/Seoul': 'KST (UTC+9)',
      'UTC': 'UTC',
      'Asia/Tokyo': 'JST (UTC+9)',
      'Asia/Shanghai': 'CST (UTC+8)',
      'America/New_York': 'EST (UTC-5)',
      'Europe/London': 'GMT (UTC+0)'
    };
    status.serverTimezoneLabel = timezoneLabels[detectedTz] || detectedTz;
    
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: '상태 조회 실패' });
  }
});

// API 엔드포인트: 히스토리 데이터
app.get('/api/history', async (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const data = await fs.readFile(HISTORY_FILE, 'utf8');
    const history = JSON.parse(data);
    
    const cutoffTime = Date.now() - hours * 60 * 60 * 1000;
    const filteredMeasurements = history.measurements.filter(m => m.timestamp > cutoffTime);
    
    res.json({
      measurements: filteredMeasurements,
      models: ENDPOINT_MODELS,
      rateLimits: RATE_LIMITS,
      endpoints: ['paas', 'coding']
    });
  } catch (error) {
    res.status(500).json({ error: '히스토리 조회 실패' });
  }
});

// API 엔드포인트: 히트맵 데이터
app.get('/api/heatmap', async (req, res) => {
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf8');
    const history = JSON.parse(data);
    
    // 24시간 x 7일 히트맵 데이터 생성 (KST 기준)
    const heatmap = Array(7).fill(null).map(() => Array(24).fill(null).map(() => ({})));
    
    history.measurements.forEach(measurement => {
      const date = new Date(measurement.timestamp + 9 * 60 * 60 * 1000); // KST 변환
      const dayOfWeek = date.getDay(); // 0: 일요일, 1: 월요일, ...
      const hour = date.getHours();
      
      const modelKey = `${measurement.model}-${measurement.endpoint}`;
      
      if (!heatmap[dayOfWeek][hour][modelKey]) {
        heatmap[dayOfWeek][hour][modelKey] = {
          count: 0,
          totalResponseTime: 0,
          successCount: 0
        };
      }
      
      const modelData = heatmap[dayOfWeek][hour][modelKey];
      modelData.count++;
      modelData.totalResponseTime += measurement.responseTime;
      if (measurement.status === '200' || measurement.status === 'success') {
        modelData.successCount++;
      }
    });
    
    // 평균 응답 시간 계산
    const processedHeatmap = heatmap.map(day => 
      day.map(hour => {
        const processed = {};
        Object.keys(hour).forEach(modelKey => {
          const data = hour[modelKey];
          processed[modelKey] = {
            avgResponseTime: data.successCount > 0 ? Math.round(data.totalResponseTime / data.successCount) : 0,
            successRate: data.count > 0 ? Math.round((data.successCount / data.count) * 100) : 0
          };
        });
        return processed;
      })
    );
    
    res.json({
      heatmap: processedHeatmap,
      models: ENDPOINT_MODELS,
      rateLimits: RATE_LIMITS,
      endpoints: ['paas', 'coding']
    });
  } catch (error) {
    res.status(500).json({ error: '히트맵 조회 실패' });
  }
});

// 루트 엔드포인트 (프론트엔드)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
async function startServer() {
  // 설정 초기화
  await initializeConfig();
  
  await initializeData();
  
  // 즉시 첫 측정 실행
  await performMeasurements();
  
  // 설정된 간격으로 측정 실행
  setInterval(performMeasurements, config.measureInterval);
  
  app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`http://localhost:${PORT} 에서 접속 가능합니다.`);
    console.log(`측정 간격: ${config.measureInterval}ms`);
    console.log(`서버 시간대: ${config.serverTimezone || 'auto-detected'}`);
  });
}

startServer();