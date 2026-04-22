# Security Policy

## Supported Versions

We actively maintain the following versions:

| Version | Supported |
| ------- | ----------|
| Latest (main) | ✅ |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public issue for security vulnerabilities.
2. Use [GitHub Security Advisories](https://github.com/haseo-ai/zai-peaktime-monitor/security/advisories/new) to report the vulnerability privately.
3. Include as much detail as possible: steps to reproduce, affected versions, potential impact.
4. We will acknowledge receipt within 48 hours and aim to resolve within 7 days.

## Security Measures

- **Secret scanning**: Enabled with push protection
- **Dependency vulnerabilities**: Monitored via Dependabot
- **Branch protection**: PR review required before merge to main
- **Minimal permissions**: Repository-scoped tokens only

## Dependencies

This project depends on:
- [Express.js](https://expressjs.com/) — Web framework
- [Axios](https://axios-http.com/) — HTTP client
- [Chart.js](https://www.chartjs.org/) — Visualization (CDN)
- [Node.js](https://nodejs.org/) — Runtime

Dependency vulnerabilities are automatically tracked by Dependabot. Please keep dependencies up to date.

## Policy

- API keys and secrets are **never** committed to the repository
- Configuration files with sensitive data are gitignored
- Runtime data (history.json) is gitignored and auto-rotated
