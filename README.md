<div align="center">
  <img src="web/default/public/logo.svg" alt="HUICHUAN Logo" width="92" />

# HUICHUAN

**统一、可靠、易于管理的 AI API 网关**

一处连接模型、管理密钥、观察用量并控制成本。

[在线体验](https://www.ai0.store) · [模型广场](https://www.ai0.store/pricing) · [关于项目](https://www.ai0.store/about)

![Go](https://img.shields.io/badge/Go-1.25+-00ADD8?logo=go&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-AGPL--3.0-7C3AED)

</div>

## 项目简介

HUICHUAN 是一个面向个人、团队与应用服务的 AI API 管理平台。它将不同模型服务统一到一套入口中，并提供渠道管理、令牌权限、请求路由、用量统计与计费控制等能力，帮助开发者更简单地接入和维护 AI 应用。

## 核心能力

- **统一模型网关**：通过统一 API 接入和切换不同模型服务。
- **智能路由与重试**：依据优先级、权重和可用性分配请求。
- **精细权限令牌**：为用户、团队或应用签发独立密钥并限制模型与额度。
- **额度与计费控制**：集中管理定价、余额、配额和消费记录。
- **日志与可观测性**：查看请求状态、延迟、Token 用量与错误信息。
- **现代化响应式界面**：支持桌面端、移动端、浅色与暗色主题。
- **多语言支持**：内置中文、英文、法文、日文、俄文和越南文界面。

## 技术栈

| 层级 | 技术 |
| --- | --- |
| 后端 | Go、Gin、GORM |
| 前端 | React 19、TypeScript、Rsbuild、Tailwind CSS |
| 数据库 | SQLite、MySQL、PostgreSQL |
| 缓存 | Redis |
| 部署 | Docker、Docker Compose、Nginx |

## 快速开始

### 使用 Docker 启动开发环境

环境要求：Docker 与 Docker Compose。

```bash
git clone https://github.com/01121531/HUICHUAN.git
cd HUICHUAN
docker compose -f docker-compose.dev.yml up -d --build
```

后端启动后访问：

```text
http://localhost:3000
```

查看运行状态：

```bash
docker compose -f docker-compose.dev.yml ps
curl http://localhost:3000/api/status
```

停止服务：

```bash
docker compose -f docker-compose.dev.yml down
```

> 首次启动后请根据页面引导创建管理员账号。公开部署前务必修改数据库密码、会话密钥及其他默认配置。

## 本地开发

环境要求：Go 1.25+、Bun、Docker。

```bash
# 启动 PostgreSQL、Redis 与后端服务
make dev-api

# 启动默认版前端（默认端口 5173）
make dev-web
```

也可以分别执行：

```bash
cd web
bun install --frozen-lockfile

cd default
bun run dev
```

常用检查命令：

```bash
cd web/default
bun run typecheck
bun run lint
bun run build
```

## 生产部署建议

1. 使用 MySQL 或 PostgreSQL 持久化业务数据。
2. 配置 Redis 以支持缓存和多实例部署。
3. 设置高强度 `SESSION_SECRET`，不要提交真实密码、Token 或密钥。
4. 在应用前配置 Nginx/Caddy，并启用 HTTPS。
5. 对数据库和日志目录进行定期备份。
6. 升级前先在测试环境完成数据库迁移与接口验证。

常用环境变量示例：

```env
PORT=3000
SQL_DSN=user:password@tcp(127.0.0.1:3306)/huichuan?charset=utf8mb4&parseTime=true
REDIS_CONN_STRING=redis://:password@127.0.0.1:6379/0
SESSION_SECRET=replace-with-a-long-random-string
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_TRUSTED_URL=https://your-domain.example
TZ=Asia/Shanghai
```

更多可选配置参见 [`.env.example`](.env.example)。

## 项目结构

```text
HUICHUAN/
├── controller/        # HTTP 接口控制器
├── model/             # 数据模型与数据库逻辑
├── relay/             # 模型请求转发与适配
├── router/            # 路由定义
├── service/           # 业务服务
├── web/default/       # 默认 React 前端
├── web/classic/       # 经典版前端
├── docker-compose.dev.yml
└── main.go
```

## 参与贡献

欢迎通过 Issue 与 Pull Request 提交问题、改进建议和代码变更。提交前建议运行前端检查与构建，并确保没有包含账号、密钥、日志、数据库文件或其他敏感信息。

## 许可证

本项目依据 [GNU Affero General Public License v3.0](LICENSE) 发布。部署、修改或分发本项目时，请遵守许可证中的相关要求。

---

<div align="center">
  <strong>HUICHUAN · 让模型接入与管理更简单</strong>
</div>
