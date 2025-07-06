# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.2.x   | :white_check_mark: |
| 1.1.x   | :x:                |
| < 1.1   | :x:                |

## Reporting a Vulnerability

The Quantum Chronicles team takes security seriously. If you believe you have found a security vulnerability, please report it responsibly:

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email security concerns to the repository maintainer through GitHub's private vulnerability reporting
3. Use GitHub's "Report a vulnerability" feature in the Security tab
4. Include detailed information about the vulnerability and steps to reproduce

### What to Include

Please include the following information in your report:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if you have one)
- Your contact information for follow-up

### Response Timeline

- **Initial Response**: Within 48 hours of receiving the report
- **Status Updates**: Every 72 hours until resolution
- **Fix Timeline**: Critical vulnerabilities within 7 days, others within 30 days

### Recognition

We maintain a security hall of fame for researchers who responsibly disclose vulnerabilities. Contributors who follow responsible disclosure will be:

- Credited in release notes (if desired)
- Listed in our security acknowledgments
- Invited to test fixes before public release

## Security Measures

### Automated Security

- CodeQL analysis on all pull requests
- Dependabot for dependency updates
- NPM audit checks in CI/CD pipeline
- ESLint security plugin enabled

### Manual Reviews

- All code changes require review before merge
- Security-focused code review for sensitive components
- Regular security audit of third-party dependencies

### Deployment Security

- No tracking or analytics in production builds
- Content Security Policy headers
- Sanitized user inputs with DOMPurify
- Secure build and deployment pipeline

## Security Best Practices

For developers contributing to this project:

1. Never commit secrets, API keys, or sensitive data
2. Use TypeScript strict mode and proper typing
3. Sanitize all user inputs
4. Follow principle of least privilege
5. Keep dependencies up to date
6. Use secure coding practices

Thank you for helping keep Quantum Chronicles secure!
