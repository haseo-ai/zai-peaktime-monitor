\ufeff﻿# z.ai API 피크타임 모니터

z.ai API 실시간 성능 모니터링 대시보드

**언어:** 한국어 | [English](README.en.md) | [中文](README.zh.md)

## 🚀 특징

- **PAAS/CODING 엔드포인트별 7개 모델 실시간 측정**
  - PAAS: glm-4.7-flash (무료 모델)
  - CODING: glm-5.1, glm-5-turbo, glm-5, glm-4.7, glm-4.6, glm-4.5 (유료 모델)
- **실시간 모니터링**
  - 응답 시간, 에러율, 상태 카드 실시간 표시
  - 1분마다 자동 데이터 수집
- **다양한 차트 뷰**
  - 1시간/24시간/7일 범위 선택 차트
  - 시간대별 응답 시간 분석
  - 모델별 응답 시간 추이
- **에러 관리**
  - 최근 에러 이력 표시
  - 에러율 모니터링
- **글로벌 지원**
  - 10개 언어 i18n 지원 (한국어, 영어, 중국어, 스페인어, 힌디어, 프랑스어, 아랍어, 포르투갈어, 일본어, 러시아어)
  - 브라우저 시간대 자동 감지
  - 데이터 수집 지역 표시
  - RTL 언어(아랍어) 지원

## 🛠️ 설치 방법

### 사전 요구사항
- Node.js 16 이상
- npm 또는 yarn

### 설치 및 실행
```bash
# 1. 저장소 복제
git clone <repository-url>
cd zai-peaktime-monitor

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
echo "ZHIPU_API_KEY=your_api_key_here" > .env

# 4. 설정 파일 복사
cp config.example.json config.json

# 5. 설정 파일 수정 (선택사항)
# config.json 파일에서 엔드포인트, 모델, 측정 간격 등을 설정할 수 있습니다.

# 6. 서버 시작
npm start
```

서버가 `http://localhost:3100` 에서 실행됩니다.

## ⚙️ 환경 변수

| 변수명 | 설명 | 필수여부 |
|--------|------|----------|
| `ZHIPU_API_KEY` | z.ai API 키 | ✅ 필수 |
| `PORT` | 서버 포트 (기본값: 3100) | ❌ 선택 |

## ⚙️ 설정 파일

### config.json 구조
```json
{
  "endpoints": {
    "paas": {
      "url": "https://api.z.ai/api/paas/v4",
      "models": ["glm-4.7-flash"]
    },
    "coding": {
      "url": "https://api.z.ai/api/coding/paas/v4",
      "models": ["glm-5.1", "glm-5-turbo", "glm-5", "glm-4.7", "glm-4.6", "glm-4.5"]
    }
  },
  "rateLimits": {
    "glm-5.1": 1,
    "glm-5-turbo": 1,
    "glm-5": 2,
    "glm-4.7": 2,
    "glm-4.7-flash": 1,
    "glm-4.6": 3,
    "glm-4.5": 10
  }}
```

### 설정 항목 설명
| 항목 | 설명 | 기본값 |
|------|------|--------|
| `endpoints.paas.url` | PAAS 엔드포인트 기본 URL (`/chat/completions` 자동 추가) | (위 참조) |
| `endpoints.paas.models` | PAAS에서 측정할 모델 목록 | (위 참조) |
| `endpoints.coding.url` | CODING 엔드포인트 기본 URL (`/chat/completions` 자동 추가) | (위 참조) |
| `endpoints.coding.models` | CODING에서 측정할 모델 목록 | (위 참조) |
| `rateLimits` | 모델별 동시 요청 제한 수 (화면 참조용; 서버는 모델당 1회만 요청) | (위 참조) |
| `serverTimezone` | 데이터 수집 지역 표시용 시간대 | `Asia/Seoul` |
| `measureInterval` | 측정 간격 (밀리초) | `60000` (1분) |

> 서버 시간대: config.json에서 `serverTimezone` 설정 (생략 시 시스템 시간대 사용).

## 📊 측정 대상 모델

### PAAS 엔드포인트 (무료)
| 모델명 | 동시성 제한 | 설명 |
|--------|------------|------|
| glm-4.7-flash | 1 | 무료 모델 |

### CODING 엔드포인트 (유료)
| 모델명 | 동시성 제한 | 설명 |
|--------|------------|------|
| glm-5.1 | 1 | 최신 모델 |
| glm-5-turbo | 1 | 터보 버전 |
| glm-5 | 2 | 표준 모델 |
| glm-4.7 | 2 | 안정적인 모델 |
| glm-4.6 | 3 | 고성능 모델 |
| glm-4.5 | 10 | 입문용 모델 |

## 🔌 API 엔드포인트

### PAAS 엔드포인트
```
https://api.z.ai/api/paas/v4
```

### CODING 엔드포인트
```
https://api.z.ai/api/coding/paas/v4
```

## 📁 프로젝트 구조

```
zai-peaktime-monitor/
├── config.example.json      # 설정 템플릿 (Git에 포함)
├── config.json             # 설정 파일 (Git에서 제외)
├── server.js              # Express 서버 메인 파일
├── package.json           # 패키지 설정
├── public/                # 프론트엔드 리소스
│   ├── index.html        # 메인 페이지
│   ├── i18n.js           # 다국어 지원
│   ├── zai-logo.png      # 로고 이미지
│   └── favicon.svg       # 파비콘
├── data/                 # 데이터 저장 디렉토리
│   └── history.json      # 측정 히스토리 데이터
├── docs/                 # 문서
│   └── zai-rate-limits.md # z.ai Rate Limits 정보
├── .env                  # 환경 변수 (Git에서 제외)
└── README.md            # 이 문서
```

### 파일 설명

- **server.js**: Express 서버 메인 로직, API 측정, 데이터 저장
  - 1분마다 7개 모델 성능 측정
  - 실시간 상태 API 제공
  - 히스토리 데이터 API 제공
  - 7일 데이터 보관 (자동 정리)

- **public/index.html**: 모니터링 대시보드 UI
  - 실시간 상태 표시
  - Chart.js 기반 차트
  - 다국어 지원

- **public/i18n.js**: 10개 언어 번역 시스템
  - 브라우저 언어 자동 감지
  - 언어 선택기
  - RTL(아랍어) 지원

## 📱 PWA 지원

- 모바일/데스크톱 설치 가능
- 오프라인 접근 (캐시된 데이터)
- 서비스 워커로 정적 에셋 캐싱
- 전체 PWA 기능 활성화하려면 HTTPS로 서비스 필요

## 🛠️ 기술 스택

- **Backend**
  - Node.js
  - Express.js
  - Axios (API 호출)

- **Frontend**
  - Vanilla JavaScript
  - Chart.js (차트 라이브러리)
  - CSS3 (반응형 디자인)

- **데이터 저장**
  - 파일 시스템 (JSON)
  - 자동 데이터 정리

## 📊 모니터링 지표

### 실시간 지표
- **평균 응답 시간**: 최근 10분간 성공 요청의 평균 응답 시간
- **에러율**: 전체 요청 중 에러 비율
- **상태**: 안정/주의/위험 3단계 상태 표시

### 차트
- **응답 시간 추이**: 시간별 응답 시간 변화
- **시간대별 분석**: 24시간 x 7일 응답 시간 패턴
- **히트맵**: 시간대별 성능 시각화

## 🌍 다국어 지원

지원하는 언어:
- 한국어 (ko)
- 영어 (en)
- 중국어 (zh)
- 스페인어 (es)
- 힌디어 (hi)
- 프랑스어 (fr)
- 아랍어 (ar) - RTL 지원
- 포르투갈어 (pt)
- 일본어 (ja)
- 러시아어 (ru)

## 🔔 주의사항

- **비공식 앱**: 본 앱은 z.ai와 무관한 개인 프로젝트입니다.
- **API 키 필요**: 사용하려면 유효한 z.ai API 키가 필요합니다.
- **데이터 보관**: 측정 데이터는 7일간 보관됩니다.
- **Rate Limit**: 측정을 위해 1분마다 API를 호출하므로 사용량에 주의하세요.
  - 모델 7개 × 1분당 1회 = **분당 7회**
  - **1일**: 10,080회 / **7일**: 70,560회 / **30일**: 302,400회
  - 데이터 파일: 1일 약 1.4MB / 7일 약 10MB (7일 이상 데이터는 자동 삭제됨)

## 📄 라이선스

MIT License - [LICENSE](LICENSE) 파일을 참조하세요.

## 🤝 기여

버그 리포트나 기능 제안은 이슈를 통해 알려주세요.

---

Made with ❤️ by haseo-ai