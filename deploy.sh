#!/bin/bash

# 货车司机权益保障平台 - 一键部署脚本

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}🚀 货车司机权益保障平台 - 一键部署脚本${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null
then
    echo -e "${RED}❌ 错误: Node.js 未安装${NC}"
    echo -e "${YELLOW}请先安装 Node.js v18.x 或更高版本${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js 已安装: $(node -v)${NC}"

# 检查 npm 是否安装
if ! command -v npm &> /dev/null
then
    echo -e "${RED}❌ 错误: npm 未安装${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm 已安装: $(npm -v)${NC}"

# 检查 MongoDB 是否安装或可访问
if ! command -v mongosh &> /dev/null
then
    echo -e "${YELLOW}⚠️  警告: MongoDB Shell (mongosh) 未安装${NC}"
    echo -e "${YELLOW}将尝试使用默认连接地址连接 MongoDB${NC}"
fi

echo ""
echo -e "${BLUE}📦 开始安装依赖...${NC}"
echo ""

# 安装前端依赖
echo -e "${BLUE}1. 安装前端依赖...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 前端依赖安装失败${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 前端依赖安装成功${NC}"

# 安装后端依赖
echo -e "${BLUE}2. 安装后端依赖...${NC}"
cd backend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 后端依赖安装失败${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 后端依赖安装成功${NC}"

# 检查并创建 .env 文件
echo -e "${BLUE}3. 配置环境变量...${NC}"
if [ ! -f ".env" ]; then
    cp env.example .env
    echo -e "${GREEN}✅ 已创建后端 .env 文件${NC}"
    echo -e "${YELLOW}⚠️  提示: 已使用默认配置，如需修改请编辑 backend/.env 文件${NC}"
else
    echo -e "${GREEN}✅ 后端 .env 文件已存在${NC}"
fi

cd ..

# 添加 dev:all 脚本到 package.json
echo -e "${BLUE}4. 配置启动脚本...${NC}"
if ! grep -q "dev:all" package.json; then
    # 使用 jq 工具修改 package.json
    if command -v jq &> /dev/null; then
        jq '.scripts."dev:all" = "concurrently \"npm run dev\" \"cd backend && npm run dev\""' package.json > package.json.tmp && mv package.json.tmp package.json
        echo -e "${GREEN}✅ 已添加 dev:all 脚本${NC}"
        
        # 安装 concurrently
        npm install -D concurrently
        echo -e "${GREEN}✅ 已安装 concurrently${NC}"
    else
        echo -e "${YELLOW}⚠️  jq 未安装，跳过添加 dev:all 脚本${NC}"
    fi
else
    echo -e "${GREEN}✅ dev:all 脚本已存在${NC}"
fi

echo ""
echo -e "${BLUE}🚀 开始启动服务...${NC}"
echo ""

# 启动 MongoDB 服务（如果本地安装）
echo -e "${BLUE}5. 检查 MongoDB 服务...${NC}"
if command -v brew &> /dev/null; then
    # macOS with Homebrew
    if ! brew services list | grep -q "mongodb-community.*started"; then
        echo -e "${YELLOW}⚠️  MongoDB 服务未启动，尝试启动...${NC}"
        brew services start mongodb-community
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ MongoDB 服务已启动${NC}"
            sleep 2 # 等待 MongoDB 完全启动
        else
            echo -e "${YELLOW}⚠️  MongoDB 服务启动失败，请手动启动${NC}"
        fi
    else
        echo -e "${GREEN}✅ MongoDB 服务已在运行${NC}"
    fi
elif command -v systemctl &> /dev/null; then
    # Linux with systemctl
    if ! systemctl is-active --quiet mongod; then
        echo -e "${YELLOW}⚠️  MongoDB 服务未启动，尝试启动...${NC}"
        sudo systemctl start mongod
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ MongoDB 服务已启动${NC}"
            sleep 2 # 等待 MongoDB 完全启动
        else
            echo -e "${YELLOW}⚠️  MongoDB 服务启动失败，请手动启动${NC}"
        fi
    else
        echo -e "${GREEN}✅ MongoDB 服务已在运行${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  无法检查 MongoDB 服务状态，请确保 MongoDB 已启动${NC}"
fi

echo ""
echo -e "${BLUE}6. 启动前后端服务...${NC}"
echo ""
echo -e "${GREEN}🚀 前端服务将启动在: http://localhost:5173${NC}"
echo -e "${GREEN}🚀 后端服务将启动在: http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}⚠️  提示: 服务启动后，按 Ctrl+C 可停止服务${NC}"
echo ""

# 启动服务（使用不同终端）
if command -v gnome-terminal &> /dev/null; then
    # GNOME Terminal (Linux)
    gnome-terminal -- bash -c "npm run dev; exec bash"
    gnome-terminal -- bash -c "cd backend && npm run dev; exec bash"
elif command -v kitty &> /dev/null; then
    # Kitty Terminal
    kitty --title "前端服务" -- bash -c "npm run dev; exec bash"
    kitty --title "后端服务" -- bash -c "cd backend && npm run dev; exec bash"
elif command -v xterm &> /dev/null; then
    # xterm
    xterm -title "前端服务" -e "npm run dev"
    xterm -title "后端服务" -e "cd backend && npm run dev"
elif command -v iTerm2 &> /dev/null; then
    # iTerm2 (macOS)
    osascript -e "tell application \"iTerm2\" to create window with default profile"
    osascript -e "tell application \"iTerm2\" to tell current window to create tab with default profile"
    osascript -e "tell application \"iTerm2\" to tell current session of current window to write text \"npm run dev\""
    osascript -e "tell application \"iTerm2\" to tell current window to create tab with default profile"
    osascript -e "tell application \"iTerm2\" to tell current session of current window to write text \"cd backend && npm run dev\""
else
    # 回退方案：使用 & 后台运行
    echo -e "${YELLOW}⚠️  未检测到支持的终端模拟器，将使用后台运行方式${NC}"
    echo -e "${BLUE}启动前端服务...${NC}"
    npm run dev &
    FRONTEND_PID=$!
    echo -e "${BLUE}启动后端服务...${NC}"
    cd backend && npm run dev &
    BACKEND_PID=$!
    cd ..
    
    echo ""
    echo -e "${GREEN}✅ 服务已在后台启动${NC}"
    echo -e "${YELLOW}前端服务 PID: $FRONTEND_PID${NC}"
    echo -e "${YELLOW}后端服务 PID: $BACKEND_PID${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  提示: 执行以下命令可停止服务:${NC}"
    echo -e "${YELLOW}kill $FRONTEND_PID $BACKEND_PID${NC}"
    echo ""
fi

echo ""
echo -e "${BLUE}======================================${NC}"
echo -e "${GREEN}🎉 部署完成！${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""
echo -e "${GREEN}🌐 前端访问地址: http://localhost:5173${NC}"
echo -e "${GREEN}🌐 后端 API 地址: http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}📖 详细部署说明请查看: DEPLOYMENT_GUIDE.md${NC}"
echo ""
echo -e "${BLUE}======================================${NC}"