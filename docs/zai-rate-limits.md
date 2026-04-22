# z.ai Rate Limits (2026-04-22 기준)

> API 사용은 동시성(in-flight requests)으로 제한됩니다.
> 아래 제한은 잔액 소비 API 사용자에게 적용됩니다. GLM Coding 사용자는 패키지 혜택을 참조하세요.

## 동시성 제한 (Concurrency Limit)

| 모델 타입 | 모델명 | 동시성 제한 |
|-----------|--------|------------|
| Language Model | GLM-5.1 | 1 |
| Language Model | GLM-5-Turbo | 1 |
| Language Model | GLM-5 | 2 |
| Language Model | GLM-4.7 | 2 |
| Language Model | GLM-4.7-Flash | 1 |
| Language Model | GLM-4.7-FlashX | 3 |
| Language Model | GLM-4.6 | 3 |
| Language Model | GLM-4.5 | 10 |
| Language Model | GLM-4.5-Air | 5 |
| Language Model | GLM-4.5-AirX | 5 |
| Language Model | GLM-4.5-Flash | 2 |
| Language Model | GLM-4-Plus | 20 |
| Language Model | GLM-4-32B-0414-128K | 15 |
| Language Model | GLM-4.6V | 10 |
| Language Model | GLM-4.6V-Flash | 1 |
| Language Model | GLM-4.6V-FlashX | 3 |
| Language Model | GLM-4.5V | 10 |
| Language Model | GLM-5V-Turbo | 1 |
| Image Generation Model | GLM-Image | 1 |
| Image Generation Model | CogView-4-250304 | 5 |
| Video Generation Model | CogVideoX-3 | 1 |
| Video Generation Model | ViduQ1-text | 5 |
| Video Generation Model | ViduQ1-Image | 5 |
| Video Generation Model | ViduQ1-Start-End | 5 |
| Video Generation Model | Vidu2-Image | 5 |
| Video Generation Model | Vidu2-Start-End | 5 |
| Video Generation Model | Vidu2-Reference | 5 |
| Real-time Audio-Video Model | GLM-ASR-2512 | 5 |
| Language Model | GLM-OCR | 2 |
| Language Model | AutoGLM-Phone-Multilingual | 5 |

## 참고
- GLM-4-Flash 무료 체험 기간 동안 8K 초과 컨텍스트는 표준 동시성의 1%로 제한됩니다.
