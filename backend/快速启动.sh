#!/bin/bash

# 货车司机权益保障平台 - 快速启动脚本

echo "🚀 货车司机权益保障平台 - 后端服务"
echo "=================================="
echo ""

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到Node.js，请先安装Node.js"
    echo "   访问: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js版本: $(node --version)"
echo "✅ npm版本: $(npm --version)"
echo ""

# 检查MongoDB
if ! command -v mongosh &> /dev/null && ! command -v mongo &> /dev/null; then
    echo "⚠️  警告: 未找到MongoDB，请确保MongoDB已安装并运行"
    echo "   macOS: brew install mongodb-community"
    echo "   启动: brew services start mongodb-community"
else
    echo "✅ MongoDB已安装"
fi
echo ""

# 检查.env文件
if [ ! -f .env ]; then
    echo "📝 创建.env文件..."
    if [ -f env.example ]; then
        cp env.example .env
        echo "✅ 已从env.example创建.env文件"
        echo "⚠️  请编辑.env文件，修改JWT_SECRET和ENCRYPTION_KEY"
    else
        echo "❌ 错误: 未找到env.example文件"
        exit 1
    fi
else
    echo "✅ .env文件已存在"
fi
echo ""

# 检查node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖包..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖包已安装"
fi
echo ""

# 创建uploads目录
if [ ! -d "uploads" ]; then
    echo "📁 创建uploads目录..."
    mkdir -p uploads
    echo "✅ uploads目录已创建"
else
    echo "✅ uploads目录已存在"
fi
echo ""

# 检查MongoDB连接
echo "🔍 检查MongoDB连接..."
if command -v mongosh &> /dev/null; then
    mongosh --eval "db.adminCommand('ping')" --quiet > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✅ MongoDB连接正常"
    else
        echo "⚠️  警告: MongoDB可能未运行"
        echo "   请运行: brew services start mongodb-community"
    fi
elif command -v mongo &> /dev/null; then
    mongo --eval "db.adminCommand('ping')" --quiet > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✅ MongoDB连接正常"
    else
        echo "⚠️  警告: MongoDB可能未运行"
    fi
fi
echo ""

# 启动服务器
echo "🚀 启动服务器..."
echo "=================================="
echo ""
echo "服务器将在 http://localhost:3000 启动"
echo "按 Ctrl+C 停止服务器"
echo ""

if [ "$1" == "dev" ]; then
    npm run dev
else
    npm start
fi
