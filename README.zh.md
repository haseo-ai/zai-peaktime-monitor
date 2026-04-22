# z.ai API 峰值时间监控器

z.ai API 实时性能监控仪表板

**Languages:** [한국어](README.ko.md) | English | [中文](README.zh.md)

## 🚀 特性

- **PAAS/CODING 端点 7 个模型实时监控**
  - PAAS: glm-4.7-flash（免费模型）
  - CODING: glm-5.1, glm-5-turbo, glm-5, glm-4.7, glm-4.6, glm-4.5（付费模型）
- **实时监控**
  - 实时显示响应时间、错误率、状态卡片
  - 每 1 分钟自动数据收集
- **多种图表视图**
  - 可选择时间范围图表（1 小时 / 24 小时 / 7 天）
  - 按小时响应时间分析
  - 按模型响应时间趋势
- **错误管理**
  - 显示最近错误历史
  - 错误率监控
- **全球支持**
  - 支持 10 种语言 i18n（韩语、英语、中文、西班牙语、印地语、法语、阿拉伯语、葡萄牙语、日语、俄语）
  - 自动检测浏览器时区
  - 显示数据收集区域
  - 支持 RTL 语言（阿拉伯语）

## 🛠️ 安装方法

### 前置要求
- Node.js 16 或更高版本
- npm 或 yarn

### 安装和运行
```bash
# 1. 克隆仓库
git clone <repository-url>
cd zai-peaktime-monitor

# 2. 安装依赖
npm install

# 3. 设置环境变量
echo "ZHIPU_API_KEY=your_api_key_here" > .env

# 4. 复制配置文件
cp config.example.json config.json

# 5. 编辑配置文件（可选）
# 您可以在 config.json 中配置端点、模型、测量间隔等

# 6. 启动服务器
npm start
```

服务器将在 `http://localhost:3100` 上运行

## ⚙️ 环境变量

| 变量名 | 描述 | 必需 |
|--------|------|------|
| `ZHIPU_API_KEY` | z.ai API 密钥 | ✅ 必需 |
| `PORT` | 服务器端口（默认：3100） | ❌ 可选 |

### config.json 设置项

| 字段 | 说明 |
|------|------|
| `endpoints.paas.url` | PAAS 端点基础 URL（自动追加 `/chat/completions`） |
| `endpoints.paas.models` | PAAS 监控模型列表 |
| `endpoints.coding.url` | CODING 端点基础 URL（自动追加 `/chat/completions`） |
| `endpoints.coding.models` | CODING 监控模型列表 |
| `rateLimits` | 各模型并发限制（仅供参考；服务器每模型仅发送 1 次请求） |
| `measureInterval` | 测量间隔（毫秒） |

> 服务器时区：在 config.json 中设置 `serverTimezone`（省略时使用系统时区）。

## 📊 监控模型

### PAAS 端点（免费）
| 模型 | 并发限制 | 描述 |
|------|----------|------|
| glm-4.7-flash | 1 | 免费模型 |

### CODING 端点（付费）
| 模型 | 并发限制 | 描述 |
|------|----------|------|
| glm-5.1 | 1 | 最新模型 |
| glm-5-turbo | 1 | 加速版本 |
| glm-5 | 2 | 标准模型 |
| glm-4.7 | 2 | 稳定模型 |
| glm-4.6 | 3 | 高性能模型 |
| glm-4.5 | 10 | 入门级模型 |

## 🔌 API 端点

### PAAS 端点
```
https://api.z.ai/api/paas/v4
```

### CODING 端点
```
https://api.z.ai/api/coding/paas/v4
```

## 📁 项目结构

```
zai-peaktime-monitor/
├── config.example.json      # 配置模板（包含在 Git 中）
├── config.json             # 配置文件（从 Git 中排除）
├── server.js              # Express 服务器主文件
├── package.json           # 包配置
├── public/                # 前端资源
│   ├── index.html        # 主页面
│   ├── i18n.js           # 多语言支持
│   ├── zai-logo.png      # 徽标图像
│   └── favicon.svg       # 网站图标
├── data/                 # 数据存储目录
│   └── history.json      # 测量历史数据
├── docs/                 # 文档
│   └── zai-rate-limits.md # z.ai 速率限制信息
├── .env                  # 环境变量（Git 中排除）
└── README.md            # 本文档
```

### 文件说明

- **server.js**: Express 服务器主逻辑，API 测量，数据存储
  - 每 1 分钟测量 7 个模型性能
  - 提供实时状态 API
  - 提供历史数据 API
  - 7 天数据保留（自动清理）

- **public/index.html**: 监控仪表板 UI
  - 实时状态显示
  - 基于 Chart.js 的图表
  - 多语言支持

- **public/i18n.js**: 10 种语言翻译系统
  - 自动检测浏览器语言
  - 语言选择器
  - RTL（阿拉伯语）支持

## 📱 PWA 支持

- 支持移动端和桌面端安装
- 离线访问（缓存数据）
- Service Worker 静态资源缓存
- 完整 PWA 功能需通过 HTTPS 服务

## 🛠️ 技术栈

- **后端**
  - Node.js
  - Express.js
  - Axios（API 调用）

- **前端**
  - 原生 JavaScript
  - Chart.js（图表库）
  - CSS3（响应式设计）

- **数据存储**
  - 文件系统（JSON）
  - 自动数据清理

## 📊 监控指标

### 实时指标
- **平均响应时间**: 最近 10 分钟内成功请求的平均响应时间
- **错误率**: 总请求中的错误率
- **状态**: 3 级状态显示（稳定/警告/危险）

### 图表
- **响应时间趋势**: 按小时的响应时间变化
- **基于时间的分析**: 24 小时 x 7 天响应时间模式
- **热力图**: 基于时间的性能可视化

## 🌍 多语言支持

支持的语言：
- 韩语 (ko)
- 英语 (en)
- 中文 (zh)
- 西班牙语 (es)
- 印地语 (hi)
- 法语 (fr)
- 阿拉伯语 (ar) - RTL 支持
- 葡萄牙语 (pt)
- 日语 (ja)
- 俄语 (ru)

## 🔔 注意事项

- **非官方应用**: 本应用是与 z.ai 无关的个人项目。
- **需要 API 密钥**: 使用时需要有效的 z.ai API 密钥。
- **数据保留**: 测量数据保留 7 天。
- **速率限制**: 注意使用量，因为应用每 1 分钟调用一次 API 进行测量。
  - 7 个模型 × 每分钟 1 次 = **每分钟 7 次**
  - **1 天**: 10,080 次 / **7 天**: 70,560 次 / **30 天**: 302,400 次
  - 数据文件: 每天约 1.4MB / 7天约 10MB（超过7天的数据会自动删除）

## 📄 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

请通过问题报告错误或功能建议。

---

由 haseo-ai 用 ❤️ 制作