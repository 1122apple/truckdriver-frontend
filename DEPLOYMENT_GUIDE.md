# 货车司机权益保障平台 - 部署指南

## 📋 环境要求

### 必须安装
- **Node.js** (v18.x 或更高版本)
- **npm** (v9.x 或更高版本)
- **MongoDB** (v5.x 或更高版本，本地或远程)

### 推荐IDE
- **VS Code** (推荐) + 相关插件
  - ESLint
  - Prettier
  - TypeScript
  - MongoDB for VS Code
- **JetBrains WebStorm**

## 🚀 一键部署脚本

### 使用方法
1. 确保已安装 Node.js 和 MongoDB
2. 解压代码压缩包
3. 在项目根目录执行以下命令：

```bash
# 一键安装依赖并启动前后端服务
./deploy.sh
```

### 手动部署步骤

#### 1. 安装依赖
```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd backend
npm install
cd ..
```

#### 2. 配置环境变量

**后端配置** (backend/.env):
```bash
# 复制示例配置文件
cd backend
cp env.example .env
# 根据需要修改 .env 文件中的配置
cd ..
```

**前端配置** (.env):
```bash
# 复制示例配置文件（如果存在）
cp .env.example .env 2>/dev/null || echo "前端无需额外配置"
```

#### 3. 启动 MongoDB

**本地 MongoDB**: 
```bash
# 确保 MongoDB 服务正在运行
# macOS:
brew services start mongodb-community

# Ubuntu/Debian:
sudo systemctl start mongod

# Windows:
net start MongoDB
```

**远程 MongoDB**: 
修改 `backend/.env` 中的 `MONGODB_URI` 为远程数据库地址

#### 4. 启动服务

**方式一：同时启动前后端（推荐）**
```bash
# 在项目根目录执行
npm run dev:all
```

**方式二：分别启动**
```bash
# 终端1：启动后端
cd backend
npm run dev

# 终端2：启动前端
cd ..
npm run dev
```

## 🌐 访问应用

- **前端应用**: http://localhost:5173
- **后端 API**: http://localhost:3000
- **API 文档**: http://localhost:3000/api-docs (如果已配置)

## 📁 项目结构

```
├── backend/          # 后端代码
│   ├── config/       # 配置文件
│   ├── controllers/  # 控制器
│   ├── middleware/   # 中间件
│   ├── models/       # 数据模型
│   ├── routes/       # 路由
│   ├── utils/        # 工具函数
│   └── server.js     # 后端入口
├── src/              # 前端代码
│   ├── components/   # React 组件
│   ├── utils/        # 工具函数
│   ├── App.tsx       # 主组件
│   └── main.tsx      # 入口文件
├── package.json      # 前端依赖
└── README.md         # 项目说明
```

## 🛠️ 常用命令

| 命令 | 描述 | 执行位置 |
|------|------|----------|
| `npm run dev` | 启动前端开发服务器 | 项目根目录 |
| `npm run build` | 构建前端生产版本 | 项目根目录 |
| `cd backend && npm run dev` | 启动后端开发服务器 | 项目根目录 |
| `cd backend && npm run start` | 启动后端生产服务器 | 项目根目录 |
| `npm run typecheck` | 运行 TypeScript 类型检查 | 项目根目录 |
| `npm run lint` | 运行 ESLint 检查 | 项目根目录 |

## 📊 数据库配置

### MongoDB 连接
- 默认连接地址: `mongodb://localhost:27017/traffic_control`
- 可通过 `backend/.env` 中的 `MONGODB_URI` 修改

### 数据库初始化
- 首次启动时，系统会自动创建所需的集合
- 无需手动初始化数据

## 🔧 开发流程

1. **克隆代码** (如果使用 Git)
   ```bash
   git clone <仓库地址>
   cd TrafficControlSystem
   ```

2. **安装依赖** (见上文)

3. **启动开发服务器** (见上文)

4. **访问应用** (见上文)

5. **开始开发**
   - 前端代码修改会自动热更新
   - 后端代码修改会通过 nodemon 自动重启

## 🐛 常见问题及解决方案

### 1. MongoDB 连接失败
**问题**: 启动后端时出现 "MongoDB connection failed"
**解决方案**:
- 确保 MongoDB 服务正在运行
- 检查 `backend/.env` 中的 `MONGODB_URI` 是否正确
- 尝试重启 MongoDB 服务

### 2. 端口被占用
**问题**: 启动服务时出现 "Port 3000/5173 is already in use"
**解决方案**:
- 查找占用端口的进程：
  ```bash
  # macOS/Linux
  lsof -i :3000  # 或 :5173
  # Windows
  netstat -ano | findstr :3000
  ```
- 杀死占用端口的进程：
  ```bash
  # macOS/Linux
  kill -9 <PID>
  # Windows
  taskkill /PID <PID> /F
  ```
- 或修改配置文件中的端口号

### 3. 依赖安装失败
**问题**: `npm install` 失败
**解决方案**:
- 确保 npm 版本符合要求
- 清除 npm 缓存：`npm cache clean --force`
- 尝试使用 yarn 替代：`yarn install`
- 检查网络连接

### 4. 前端编译错误
**问题**: 启动前端时出现 TypeScript 编译错误
**解决方案**:
- 运行 `npm run typecheck` 查看详细错误
- 修复 src 目录中的 TypeScript 错误
- 确保所有依赖都已正确安装

## 📞 技术支持

如果遇到无法解决的问题，请联系：
- 项目负责人：XXX
- 技术支持：XXX
- 团队群：XXX

## 📝 更新日志

### v1.0.0 (2026-01-23)
- ✅ 完整的用户认证系统（注册/登录/登出）
- ✅ 误导话术识别功能
- ✅ 合同解析功能
- ✅ 举证助手功能
- ✅ 投诉举报功能
- ✅ 数据统计看板
- ✅ 完整的导航系统
- ✅ 前后端分离架构
- ✅ TypeScript 支持
- ✅ 一键部署脚本

## 📄 许可证

MIT License
