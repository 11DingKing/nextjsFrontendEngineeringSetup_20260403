# Front UI 项目

## How to Run

### 使用 Docker Compose（推荐）

```bash
# 构建并启动所有服务
docker-compose up --build -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f frontend-user

# 停止服务
docker-compose down
```

### 本地开发

```bash
# 进入前端用户端目录
cd frontend-user

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

## Services

| 服务名称 | 端口 | 描述 |
|---------|------|------|
| frontend-user | 8081 | 用户端前端应用 |

## 测试账号

| 角色 | 账号 | 密码 |
|------|------|------|
| 测试用户 | test@example.com | 123456 |

## 题目内容

```
1.命名规范后端项目文件名叫backend 管理后台 frontend-admin 小程序 frontend-mp 用户端 frontend-user（以上文件夹根据项目抉择）
2.每个子项目中编写一个Dodckerfile （需要包含编译过程、基础镜像要选用跨平台版本 同时支持 ARM 和 X86， 可以使用 ` docker pull --platform linux/arm64 镜像名:tag` 命令验证镜像是否可以在 arm 环境下使用，因为验收人员使用苹果电脑
3.根目录增加 docker-compose.yml 和 .gitignore 和 README.md
4.确保 docker-compose up --build -d 可以正确运行项目。
5.前端项目的对外映射端口为 8081 ，如有两个就是 8081、8082。
6..gitignore 中需要包含所有子项目需要忽略的文件。
7.README.md 中除了要包含你的项目介绍，需要在最前面增加三个二级标题 1 How to Run  2 Services  3 测试账号 4 题目内容(填写原始prompt内容)
```

---

## 项目介绍

基于 Next.js 16 构建的现代化前端用户端应用。

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | 16.x |
| UI 库 | React | 19.x |
| 样式 | Tailwind CSS | 4.x |
| 状态管理 | Zustand | 5.x |
| 数据请求 | TanStack Query + Axios | 5.x |
| 表单处理 | React Hook Form + Zod | 7.x |
| 代码规范 | ESLint + Prettier | - |
| Git Hooks | Husky + lint-staged | - |
| 测试 | Jest + Testing Library | - |

## 项目初始化步骤

### 1. 创建 Next.js 项目

```bash
pnpm create next-app frontend-user --typescript --tailwind --eslint --app --src-dir
```

### 2. 安装核心依赖

```bash
cd frontend-user

# 状态管理
pnpm add zustand

# 表单处理
pnpm add react-hook-form @hookform/resolvers zod

# 数据请求
pnpm add axios @tanstack/react-query @tanstack/react-query-devtools

# UI 工具
pnpm add class-variance-authority clsx tailwind-merge lucide-react dayjs
```

### 3. 安装开发依赖

```bash
# 代码规范
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier

# Git Hooks
pnpm add -D husky lint-staged

# 测试
pnpm add -D jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest
```

### 4. 初始化 Husky

```bash
pnpm exec husky init
```

## 开发命令

```bash
# 启动开发服务器
pnpm dev

# 代码检查
pnpm lint
pnpm lint:fix

# 代码格式化
pnpm format
pnpm format:check

# 类型检查
pnpm type-check

# 运行测试
pnpm test
pnpm test:watch
pnpm test:coverage

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 清理构建产物
pnpm clean
```

## 项目结构

```
frontend-user/
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── (auth)/       # 认证相关页面（登录、注册）
│   │   ├── (dashboard)/  # 仪表盘页面
│   │   ├── api/          # API 路由
│   │   ├── layout.tsx    # 根布局
│   │   └── page.tsx      # 首页
│   ├── components/       # 可复用组件
│   │   ├── common/       # 通用组件（Providers 等）
│   │   ├── layout/       # 布局组件
│   │   └── ui/           # UI 基础组件
│   ├── hooks/            # 自定义 Hooks
│   ├── lib/              # 工具库配置（axios、query-client）
│   ├── schemas/          # Zod 验证模式
│   ├── services/         # API 服务层
│   ├── stores/           # Zustand 状态管理
│   ├── types/            # TypeScript 类型定义
│   └── utils/            # 工具函数
├── __tests__/            # 测试文件
├── public/               # 静态资源
├── Dockerfile            # Docker 构建文件
├── tailwind.config.ts    # Tailwind CSS 配置
└── package.json
```

## 配置说明

### 环境变量

复制 `.env.example` 为 `.env.local` 并配置：

```bash
cp .env.example .env.local
```

| 变量名 | 说明 | 示例 |
|--------|------|------|
| NEXT_PUBLIC_API_BASE_URL | API 基础地址 | http://localhost:3001/api |
| NEXT_PUBLIC_APP_NAME | 应用名称 | Front UI |
| NEXT_PUBLIC_APP_VERSION | 应用版本 | 0.1.0 |

### Tailwind CSS 配置

项目使用自定义 Tailwind 配置，包含：
- 自定义主题颜色（primary、secondary）
- 自定义字体（Inter、JetBrains Mono）
- 自定义动画（fade-in、slide-up）

详见 `tailwind.config.ts`

## 最佳实践

### 组件开发
- 使用函数组件 + Hooks
- 组件文件使用 PascalCase 命名
- 每个组件目录包含 index.ts 导出

### 状态管理
- 全局状态使用 Zustand
- 服务端状态使用 TanStack Query
- 表单状态使用 React Hook Form

### 代码规范
- 提交前自动运行 ESLint 和 Prettier
- 使用 Conventional Commits 规范
- TypeScript 严格模式

### 测试
- 组件测试放在 `__tests__/components/`
- Hooks 测试放在 `__tests__/hooks/`
- 工具函数测试放在 `__tests__/utils/`

## Docker 部署

### 镜像说明

使用 `node:20-alpine` 多阶段构建，支持 ARM64/AMD64 跨平台。

### 验证跨平台支持

```bash
docker pull --platform linux/arm64 node:20-alpine
docker pull --platform linux/amd64 node:20-alpine
```

### 单独构建镜像

```bash
cd frontend-user
docker build -t frontend-user:latest .
docker run -p 8081:3000 frontend-user:latest
```
