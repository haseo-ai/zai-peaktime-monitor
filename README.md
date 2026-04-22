# z.ai API Peak Time Monitor

Real-time performance monitoring dashboard for z.ai API

**Languages:** [한국어](README.ko.md) | English | [中文](README.zh.md)

---

- **Real-time monitoring of 7 models across PAAS/CODING endpoints**
  - PAAS: glm-4.7-flash (free model)
  - CODING: glm-5.1, glm-5-turbo, glm-5, glm-4.7, glm-4.6, glm-4.5 (paid models)
- **Live monitoring**
  - Real-time response time, error rate, and status cards
  - Automatic data collection every 1 minute
- **Various chart views**
  - Selectable time range charts (1 hour / 24 hours / 7 days)
  - Hourly response time analysis
  - Response time trends by model
- **Error management**
  - Recent error history display
  - Error rate monitoring
- **Global support**
  - i18n support for 10 languages (Korean, English, Chinese, Spanish, Hindi, French, Arabic, Portuguese, Japanese, Russian)
  - Automatic browser timezone detection
  - Data collection region display
  - RTL language (Arabic) support

## 🛠️ Installation

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Setup and Run
```bash
# 1. Clone repository
git clone <repository-url>
cd zai-peaktime-monitor

# 2. Install dependencies
npm install

# 3. Set environment variables
echo "ZHIPU_API_KEY=your_api_key_here" > .env

# 4. Start server
npm start
```

Server will run at `http://localhost:3100`

## ⚙️ Configuration

### 1. Environment Variables (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `ZHIPU_API_KEY` | z.ai API key | ✅ Required |
| `PORT` | Server port (default: 3100) | ❌ Optional |

### 2. Config File (config.json)

Copy the example config and customize:
```bash
cp config.example.json config.json
```

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
    "glm-5.1": 1, "glm-5-turbo": 1, "glm-5": 2, "glm-4.7": 2,
    "glm-4.7-flash": 1, "glm-4.6": 3, "glm-4.5": 10
  },
  "serverTimezone": "Asia/Seoul",
  "measureInterval": 60000
}
```

| Field | Description |
|-------|-------------|
| `endpoints.paas.url` | PAAS base URL (auto-appends `/chat/completions`) |
| `endpoints.paas.models` | Models to monitor on PAAS |
| `endpoints.coding.url` | CODING base URL (auto-appends `/chat/completions`) |
| `endpoints.coding.models` | Models to monitor on CODING |
| `rateLimits` | Per-model concurrency limits (display only; server sends 1 request per model per interval) |
| `serverTimezone` | Server timezone for data collection region label | Asia/Seoul |
| `measureInterval` | Measurement interval in ms (default: 60000) |

> Server timezone: set `serverTimezone` in config.json (defaults to system timezone if omitted).

## 📊 Monitored Models

### PAAS Endpoint (Free)
| Model | Concurrency Limit | Description |
|-------|-------------------|-------------|
| glm-4.7-flash | 1 | Free model |

### CODING Endpoint (Paid)
| Model | Concurrency Limit | Description |
|-------|-------------------|-------------|
| glm-5.1 | 1 | Latest model |
| glm-5-turbo | 1 | Turbo version |
| glm-5 | 2 | Standard model |
| glm-4.7 | 2 | Stable model |
| glm-4.6 | 3 | High-performance model |
| glm-4.5 | 10 | Entry-level model |

## 🔌 API Endpoints

### PAAS Endpoint
```
https://api.z.ai/api/paas/v4
```

### CODING Endpoint
```
https://api.z.ai/api/coding/paas/v4
```

## 📁 Project Structure

```
zai-peaktime-monitor/
├── config.example.json      # Config template (included in Git)
├── config.json             # Config file (excluded from Git)
├── server.js              # Express server main file
├── package.json           # Package configuration
├── public/                # Frontend resources
│   ├── index.html        # Main page
│   ├── i18n.js           # Multi-language support
│   ├── zai-logo.png      # Logo image
│   ├── favicon.svg       # Favicon
│   ├── sw.js             # Service Worker (PWA)
│   └── manifest.json     # PWA manifest
├── data/                 # Data storage directory
│   └── history.json      # Measurement history data
├── docs/                 # Documentation
│   └── zai-rate-limits.md # z.ai Rate Limits info
├── .env                  # Environment variables (excluded from Git)
└── README.md            # This document
```

### File Descriptions

- **server.js**: Express server main logic, API measurement, data storage
  - Performance measurement for 7 models every 1 minute
  - Real-time status API provision
  - History data API provision
  - 7-day data retention (auto-cleanup)

- **public/index.html**: Monitoring dashboard UI
  - Real-time status display
  - Chart.js based charts
  - Multi-language support

- **public/i18n.js**: 10-language translation system
  - Automatic browser language detection
  - Language selector
  - RTL (Arabic) support

- **public/sw.js**: Service Worker
  - Cache-first strategy for static assets
  - Network-first strategy for API calls
  - Offline support

- **public/manifest.json**: PWA manifest
  - App metadata and icons
  - Standalone display mode

## 📱 PWA Support

The app includes Progressive Web App support:
- Installable on mobile and desktop
- Offline access with cached data
- Service Worker for asset caching
- To enable full PWA features, serve over HTTPS

## 🛠️ Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - Axios (API calls)

- **Frontend**
  - Vanilla JavaScript
  - Chart.js (chart library)
  - CSS3 (responsive design)

- **Data Storage**
  - File system (JSON)
  - Automatic data cleanup

## 📊 Monitoring Metrics

### Real-time Metrics
- **Average Response Time**: Average response time of successful requests in the last 10 minutes
- **Error Rate**: Error rate among total requests
- **Status**: 3-tier status display (Stable/Warning/Danger)

### Charts
- **Response Time Trend**: Hourly response time changes
- **Time-based Analysis**: 24-hour x 7-day response time patterns
- **Heatmap**: Time-based performance visualization

## 🌍 Multi-language Support

Supported languages:
- Korean (ko)
- English (en)
- Chinese (zh)
- Spanish (es)
- Hindi (hi)
- French (fr)
- Arabic (ar) - RTL support
- Portuguese (pt)
- Japanese (ja)
- Russian (ru)

## 🔔 Important Notes

- **Unofficial App**: This app is a personal project unrelated to z.ai.
- **API Key Required**: A valid z.ai API key is required for use.
- **Data Retention**: Measurement data is retained for 7 days.
- **Rate Limit**: Be aware of usage as the app calls the API every 1 minute for measurements.
  - 7 models × 1 call/min = **7 calls/minute**
  - **1 day**: 10,080 calls / **7 days**: 70,560 calls / **30 days**: 302,400 calls
  - Data file: ~1.4MB/day / ~10MB/7 days (data older than 7 days is automatically pruned)

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Please report bugs or feature suggestions through issues.

---

Made with ❤️ by haseo-ai