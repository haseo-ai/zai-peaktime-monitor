// i18n.js - 국제화 모듈
const translations = {
    ko: {
        // 헤더
        title: "API 피크타임 모니터",
        subtitle: "실시간 API 성능 모니터링 대시보드",
        
        // 상태
        paas: "PAAS",
        coding: "CODING",
        stable: "안정",
        warning: "주의", 
        danger: "위험",
        none: "없음",
        
        // 모델 카드
        avgResponseTime: "평균 응답시간",
        errorRate: "에러율",
        paasApi: "PaaS API",
        codingApi: "CODING API",
        concurrent: "concurrent",
        
        // 버튼
        hour1: "1시간",
        hours24: "24시간",
        days7: "7일",
        
        // 차트 제목
        responseTimeTrend: "📈 모델별 응답 시간 추이",
        responseTimeHourly: "📊 모델별 응답 시간 (시간대별)",
        
        // 하단
        dataRegion: "데이터 수집 지역",
        timeDisplay: "시간 표시",
        sameRegion: "동일 지역",
        lastUpdate: "마지막 업데이트",
        loading: "로딩 중...",
        
        // 에러 이력
        recentErrors: "⚠️ 최근 에러 이력",
        noErrors: "없음",
        
        // 법적 고지
        disclaimer: "본 앱은 비공식 앱으로, z.ai와 무관한 개인 프로젝트입니다. 표기된 내용은 각자의 판단에 맡기며, z.ai와 개인은 내용에 책임지지 않습니다."
    },
    en: {
        // 헤더
        title: "API Peak Time Monitor",
        subtitle: "Real-time API Performance Monitoring Dashboard",
        
        // 상태
        paas: "PAAS",
        coding: "CODING",
        stable: "Stable",
        warning: "Warning",
        danger: "Danger",
        none: "None",
        
        // 모델 카드
        avgResponseTime: "Avg Response Time",
        errorRate: "Error Rate",
        paasApi: "PaaS API",
        codingApi: "CODING API",
        concurrent: "concurrent",
        
        // 버튼
        hour1: "1 Hour",
        hours24: "24 Hours",
        days7: "7 Days",
        
        // 차트 제목
        responseTimeTrend: "📈 Response Time Trend by Model",
        responseTimeHourly: "📊 Response Time by Model (Hourly)",
        
        // 하단
        dataRegion: "Data Collection Region",
        timeDisplay: "Time Display",
        sameRegion: "Same Region",
        lastUpdate: "Last Update",
        loading: "Loading...",
        
        // 에러 이력
        recentErrors: "⚠️ Recent Error History",
        noErrors: "None",
        
        // 법적 고지
        disclaimer: "This app is an unofficial app and a personal project unrelated to z.ai. The content presented is left to each individual's judgment, and neither z.ai nor the individual is responsible for the content."
    },
    zh: {
        // 헤더
        title: "API 峰值时间监控器",
        subtitle: "实时 API 性能监控仪表板",
        
        // 상태
        paas: "PAAS",
        coding: "CODING",
        stable: "稳定",
        warning: "注意",
        danger: "危险",
        
        none: "无",
        // 모델 카드
        avgResponseTime: "平均响应时间",
        errorRate: "错误率",
        paasApi: "PaaS API",
        codingApi: "CODING API",
        concurrent: "concurrent",
        
        // 버튼
        hour1: "1小时",
        hours24: "24小时",
        days7: "7天",
        
        // 차트 제목
        responseTimeTrend: "📈 各模型响应时间趋势",
        responseTimeHourly: "📊 各模型响应时间 (按小时)",
        
        // 하단
        dataRegion: "数据收集区域",
        timeDisplay: "时间显示",
        sameRegion: "相同区域",
        lastUpdate: "最后更新",
        loading: "加载中...",
        
        // 에러 이력
        recentErrors: "⚠️ 最近错误历史",
        noErrors: "无",
        
        // 법적 고지
        disclaimer: "本应用是非官方应用，是与z.ai无关的个人项目。所展示的内容由各人自行判断，z.ai和个人不对内容负责。"
    },
    es: {
        // 헤더
        title: "Monitor de Pico de API",
        subtitle: "Panel de Monitoreo de Rendimiento de API en Tiempo Real",
        
        // 상태
        paas: "PAAS",
        coding: "CODING",
        stable: "Estable",
        warning: "Precaución",
        danger: "Peligro",
        
        none: "Ninguno",
        // 모델 카드
        avgResponseTime: "Tiempo de Respuesta Promedio",
        errorRate: "Tasa de Error",
        paasApi: "API PaaS",
        codingApi: "API CODING",
        concurrent: "concurrent",
        
        // 버튼
        hour1: "1 Hora",
        hours24: "24 Horas",
        days7: "7 Días",
        
        // 차트 제목
        responseTimeTrend: "📈 Tendencia de Tiempo de Respuesta por Modelo",
        responseTimeHourly: "📊 Tiempo de Respuesta por Modelo (Por Hora)",
        
        // 하단
        dataRegion: "Región de Recolección de Datos",
        timeDisplay: "Visualización de Tiempo",
        sameRegion: "Misma Región",
        lastUpdate: "Última Actualización",
        loading: "Cargando...",
        
        // 에러 이력
        recentErrors: "⚠️ Historial de Errores Recientes",
        noErrors: "Ninguno",
        
        // 법적 고지
        disclaimer: "Esta aplicación es una aplicación no oficial y un proyecto personal no relacionado con z.ai. El contenido presentado queda a juicio de cada individuo, y ni z.ai ni el individuo son responsables del contenido."
    },
    hi: {
        // 헤더
        title: "API पीक टाइम मॉनिटर",
        subtitle: "रियल-टाइम API प्रदर्शन मॉनिटरिंग डैशबोर्ड",
        
        // 상태
        paas: "PAAS",
        coding: "CODING",
        stable: "स्थिर",
        warning: "चेतावनी",
        danger: "खतरा",
        
        none: "कोई नहीं",
        // 모델 카드
        avgResponseTime: "औसत प्रतिक्रिया समय",
        errorRate: "त्रुटि दर",
        paasApi: "PaaS API",
        codingApi: "CODING API",
        concurrent: "concurrent",
        
        // 버튼
        hour1: "1 घंटा",
        hours24: "24 घंटे",
        days7: "7 दिन",
        
        // 차트 제목
        responseTimeTrend: "📈 मॉडल द्वारा प्रतिक्रिया समय प्रवृत्ति",
        responseTimeHourly: "📊 मॉडल द्वारा प्रतिक्रिया समय (प्रति घंटा)",
        
        // 하단
        dataRegion: "डेटा संग्रह क्षेत्र",
        timeDisplay: "समय प्रदर्शन",
        sameRegion: "समान क्षेत्र",
        lastUpdate: "अंतिम अपडेट",
        loading: "लोड हो रहा है...",
        
        // 에러 이력
        recentErrors: "⚠️ हाल की त्रुटि इतिहास",
        noErrors: "कोई नहीं",
        
        // 법적 고지
        disclaimer: "यह ऐप एक अनाधिकारिक ऐप है और z.ai से असंबंधित एक व्यक्तिगत परियोजना है। प्रस्तुत सामग्री प्रत्येक व्यक्ति के विवेक पर छोड़ी गई है, और न ही z.ai और न ही व्यक्ति सामग्री के लिए जिम्मेदार हैं।"
    },
    fr: {
        // 헤더
        title: "Moniteur de Pointe API",
        subtitle: "Tableau de Bord de Surveillance des Performances API en Temps Réel",
        
        // 상태
        paas: "PAAS",
        coding: "CODING",
        stable: "Stable",
        warning: "Attention",
        danger: "Danger",
        
        none: "Aucun",
        // 모델 카드
        avgResponseTime: "Temps de Réponse Moyen",
        errorRate: "Taux d'Erreur",
        paasApi: "API PaaS",
        codingApi: "API CODING",
        concurrent: "concurrent",
        
        // 버튼
        hour1: "1 Heure",
        hours24: "24 Heures",
        days7: "7 Jours",
        
        // 차트 제목
        responseTimeTrend: "📈 Tendance du Temps de Réponse par Modèle",
        responseTimeHourly: "📊 Temps de Réponse par Modèle (Horaire)",
        
        // 하단
        dataRegion: "Région de Collecte des Données",
        timeDisplay: "Affichage de l'Heure",
        sameRegion: "Même Région",
        lastUpdate: "Dernière Mise à Jour",
        loading: "Chargement...",
        
        // 에러 이력
        recentErrors: "⚠️ Historique des Erreurs Récentes",
        noErrors: "Aucun",
        
        // 법적 고지
        disclaimer: "Cette application est une application non officielle et un projet personnel sans rapport avec z.ai. Le contenu présenté est laissé à l'appréciation de chacun, et ni z.ai ni l'individu ne sont responsables du contenu."
    },
    ar: {
        // 헤더
        title: "مراقبة ذروة API",
        subtitle: "لوحة مراقبة أداء API في الوقت الفعلي",
        
        // 상태
        paas: "PAAS",
        coding: "CODING",
        stable: "مستقر",
        warning: "تحذير",
        danger: "خطر",
        
        none: "لا يوجد",
        // 모델 카드
        avgResponseTime: "متوسط وقت الاستجابة",
        errorRate: "معدل الخطأ",
        paasApi: "API PaaS",
        codingApi: "API CODING",
        concurrent: "concurrent",
        
        // 버튼
        hour1: "1 ساعة",
        hours24: "24 ساعة",
        days7: "7 أيام",
        
        // 차트 제목
        responseTimeTrend: "📈 اتجاه وقت الاستجابة حسب النموذج",
        responseTimeHourly: "📊 وقت الاستجابة حسب النموذج (بالساعة)",
        
        // 하단
        dataRegion: "منطقة جمع البيانات",
        timeDisplay: "عرض الوقت",
        sameRegion: "نفس المنطقة",
        lastUpdate: "آخر تحديث",
        loading: "جاري التحميل...",
        
        // 에러 이력
        recentErrors: "⚠️ سجل الأخطاء الأخيرة",
        noErrors: "لا يوجد",
        
        // 법적 고지
        disclaimer: "هذا التطبيق هو تطبيق غير رسمي ومشروع شخصي غير مرتبط بـ z.ai. المحتوى المعروض متروك لتقدير كل فرد، ولا z.ai ولا الفرد مسؤول عن المحتوى."
    },
    pt: {
        // 헤더
        title: "Monitor de Pico de API",
        subtitle: "Painel de Monitoramento de Desempenho de API em Tempo Real",
        
        // 상태
        paas: "PAAS",
        coding: "CODING",
        stable: "Estável",
        warning: "Atenção",
        danger: "Perigo",
        
        none: "Nenhum",
        // 모델 카드
        avgResponseTime: "Tempo Médio de Resposta",
        errorRate: "Taxa de Erro",
        paasApi: "API PaaS",
        codingApi: "API CODING",
        concurrent: "concurrent",
        
        // 버튼
        hour1: "1 Hora",
        hours24: "24 Horas",
        days7: "7 Dias",
        
        // 차트 제목
        responseTimeTrend: "📈 Tendência de Tempo de Resposta por Modelo",
        responseTimeHourly: "📊 Tempo de Resposta por Modelo (Por Hora)",
        
        // 하단
        dataRegion: "Região de Coleta de Dados",
        timeDisplay: "Exibição de Tempo",
        sameRegion: "Mesma Região",
        lastUpdate: "Última Atualização",
        loading: "Carregando...",
        
        // 에러 이력
        recentErrors: "⚠️ Histórico de Erros Recentes",
        noErrors: "Nenhum",
        
        // 법적 고지
        disclaimer: "Este aplicativo é um aplicativo não oficial e um projeto pessoal não relacionado ao z.ai. O conteúdo apresentado fica a critério de cada indivíduo, e nem z.ai nem o indivíduo são responsáveis pelo conteúdo."
    },
    ja: {
        // 헤더
        title: "APIピークタイムモニター",
        subtitle: "リアルタイムAPIパフォーマンス監視ダッシュボード",
        
        // 상태
        paas: "PAAS",
        coding: "CODING",
        stable: "安定",
        warning: "注意",
        danger: "危険",
        
        none: "なし",
        // 모델 카드
        avgResponseTime: "平均応答時間",
        errorRate: "エラー率",
        paasApi: "PaaS API",
        codingApi: "CODING API",
        concurrent: "concurrent",
        
        // 버튼
        hour1: "1時間",
        hours24: "24時間",
        days7: "7日間",
        
        // 차트 제목
        responseTimeTrend: "📈 モデル別応答時間トレンド",
        responseTimeHourly: "📊 モデル別応答時間（時間別）",
        
        // 하단
        dataRegion: "データ収集地域",
        timeDisplay: "時間表示",
        sameRegion: "同一地域",
        lastUpdate: "最終更新",
        loading: "読み込み中...",
        
        // 에러 이력
        recentErrors: "⚠️ 最近のエラー履歴",
        noErrors: "なし",
        
        // 법적 고지
        disclaimer: "このアプリは非公式アプリであり、z.aiとは無関係の個人プロジェクトです。表示された内容は各個人の判断に委ねられ、z.aiと個人は内容について責任を負いません。"
    },
    ru: {
        // 헤더
        title: "Монитор Пикового Времени API",
        subtitle: "Панель мониторинга производительности API в реальном времени",
        
        // 상태
        paas: "PAAS",
        coding: "CODING",
        stable: "Стабильно",
        warning: "Внимание",
        danger: "Опасно",
        
        none: "Нет",
        // 모델 카드
        avgResponseTime: "Среднее время ответа",
        errorRate: "Коэффициент ошибок",
        paasApi: "API PaaS",
        codingApi: "API CODING",
        concurrent: "concurrent",
        
        // 버튼
        hour1: "1 час",
        hours24: "24 часа",
        days7: "7 дней",
        
        // 차트 제목
        responseTimeTrend: "📈 Тренд времени ответа по моделям",
        responseTimeHourly: "📊 Время ответа по моделям (почасово)",
        
        // 하단
        dataRegion: "Регион сбора данных",
        timeDisplay: "Отображение времени",
        sameRegion: "Тот же регион",
        lastUpdate: "Последнее обновление",
        loading: "Загрузка...",
        
        // 에러 이력
        recentErrors: "⚠️ История недавних ошибок",
        noErrors: "Нет",
        
        // 법적 고지
        disclaimer: "Это приложение является неофициальным приложением и личным проектом, не связанным с z.ai. Представленный контент оставляется на усмотрение каждого человека, и ни z.ai, ни человек не несут ответственности за контент."
    }
};

// 지원되는 언어 목록
const supportedLanguages = Object.keys(translations);

// 기본 언어 설정
const defaultLanguage = 'ko';

// 현재 언어 가져오기
function getCurrentLanguage() {
    // 1. localStorage에서 언어 확인
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        return savedLanguage;
    }
    
    // 2. 브라우저 언어 감지
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0]; // 'ko-KR' -> 'ko'
    
    if (translations[langCode]) {
        return langCode;
    }
    
    // 3. 기본 언어
    return defaultLanguage;
}

// 언어 설정
function setLanguage(lang) {
    if (translations[lang]) {
        localStorage.setItem('selectedLanguage', lang);
        applyTranslations(lang);
        updateLanguageSelector(lang);
        
        // RTL 언어 처리
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    }
}

// 번역 적용
function applyTranslations(lang) {
    const translation = translations[lang];
    
    // data-i18n 속성이 있는 모든 요소에 번역 적용
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translation[key]) {
            element.textContent = translation[key];
        }
    });
    
    // 특수 요소들 직접 처리 (템플릿 리터럴 등으로 생성된 요소들)
    // 제목
    const titleElement = document.querySelector('h1');
    if (titleElement) {
        const titleText = titleElement.textContent.replace('API 피크타임 모니터', '').trim();
        titleElement.innerHTML = `<img src="/zai-logo.png" alt="z.ai" style="vertical-align: middle; margin-right: 10px; height: 1.2em;">${translation.title}`;
    }
    
    // 부제목
    const subtitleElement = document.querySelector('.subtitle');
    if (subtitleElement) {
        subtitleElement.textContent = translation.subtitle;
    }
    
    // 상태 표시기
    const paasStatusSpan = document.querySelector('#statusBar span:first-child');
    if (paasStatusSpan && paasStatusSpan.textContent.includes('PAAS')) {
        paasStatusSpan.innerHTML = `<span style="background: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85em; font-weight: bold;">${translation.paas}</span>`;
    }
    
    const codingStatusSpan = document.querySelector('#statusBar span:nth-child(2)');
    if (codingStatusSpan && codingStatusSpan.textContent.includes('CODING')) {
        codingStatusSpan.innerHTML = `<span style="background: #764ba2; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85em; font-weight: bold;">${translation.coding}</span>`;
    }
    
    // 차트 제목
    const chartTitles = document.querySelectorAll('.chart-title');
    if (chartTitles.length >= 2) {
        chartTitles[0].textContent = translation.responseTimeTrend;
        chartTitles[1].textContent = translation.responseTimeHourly;
    }
    
    // 에러 이력 제목
    const errorTitle = document.querySelector('.error-title');
    if (errorTitle) {
        errorTitle.innerHTML = `⚠️ ${translation.recentErrors}`;
    }
    
    // 법적 고지
    const disclaimer = document.querySelector('.last-update + div');
    if (disclaimer) {
        disclaimer.textContent = translation.disclaimer;
    }
    
    // 버튼들
    const buttons = document.querySelectorAll('.controls .btn');
    if (buttons.length >= 3) {
        buttons[0].textContent = translation.hour1;
        buttons[1].textContent = translation.hours24;
        buttons[2].textContent = translation.days7;
    }
    
    // 상태 카드 리렌더 (언어 변경 시 텍스트 업데이트)
    if (typeof lastStatusData !== 'undefined' && lastStatusData && typeof updateStatusFromApi === 'function') {
        updateStatusFromApi(lastStatusData);
    }
}

// 언어 선택기 생성
function createLanguageSelector() {
    const selector = document.createElement('select');
    selector.id = 'languageSelector';
    selector.style.cssText = 'position: absolute; top: 20px; right: 20px; padding: 5px 10px; border: none; border-radius: 5px; background: white; font-size: 14px; cursor: pointer;';
    
    supportedLanguages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        const langNames = {
            ko: '한국어',
            en: 'English', 
            zh: '中文',
            es: 'Español',
            hi: 'हिन्दी',
            fr: 'Français',
            ar: 'العربية',
            pt: 'Português',
            ja: '日本語',
            ru: 'Русский'
        };
        option.textContent = langNames[lang];
        selector.appendChild(option);
    });
    
    selector.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
    
    return selector;
}

// 언어 선택기 업데이트
function updateLanguageSelector(lang) {
    const selector = document.getElementById('languageSelector');
    if (selector) {
        selector.value = lang;
    }
}

// i18n 초기화
function initI18n() {
    // 언어 선택기 추가
    const header = document.querySelector('header');
    if (header) {
        const selector = createLanguageSelector();
        header.appendChild(selector);
    }
    
    // 현재 언어로 번역 적용
    const currentLang = getCurrentLanguage();
    setLanguage(currentLang);
}

// DOM이 로드된 후 i18n 초기화
document.addEventListener('DOMContentLoaded', initI18n);