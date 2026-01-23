# API接口需求分析

## 1. 用户认证模块
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/me` - 获取当前用户信息
- `POST /api/auth/refresh` - 刷新Token

## 2. 误导话术识别模块
- `POST /api/detection/upload` - 上传文件（聊天记录/合同/录音）
- `POST /api/detection/analyze` - AI分析误导话术
- `GET /api/detection/reports/:id` - 获取分析报告
- `GET /api/detection/reports` - 获取用户的分析报告列表
- `POST /api/detection/save` - 保存分析报告

## 3. 合同解析模块
- `POST /api/contract/upload` - 上传保险合同
- `POST /api/contract/analyze` - AI解析合同条款
- `GET /api/contract/:id` - 获取合同详情
- `GET /api/contract/list` - 获取用户合同列表
- `GET /api/contract/:id/report` - 下载合同解读报告

## 4. 证据管理模块（电子存证）
- `POST /api/evidence/upload` - 上传证据（图片/录音/文件）
- `GET /api/evidence/list` - 获取证据列表
- `GET /api/evidence/:id` - 获取证据详情（含时间戳、哈希值）
- `POST /api/evidence/verify` - 验证证据完整性
- `DELETE /api/evidence/:id` - 删除证据
- `POST /api/evidence/generate-list` - 生成证据清单

## 5. 投诉管理模块
- `POST /api/complaint/create` - 创建投诉
- `GET /api/complaint/list` - 获取投诉列表
- `GET /api/complaint/:id` - 获取投诉详情
- `POST /api/complaint/:id/update` - 更新投诉状态
- `GET /api/complaint/agencies` - 获取监管机构联系方式

## 6. 语音助手模块
- `POST /api/voice/upload` - 上传语音文件
- `POST /api/voice/analyze` - 实时分析语音中的误导话术
- `GET /api/voice/result/:id` - 获取语音分析结果

## 7. 数据看板模块
- `GET /api/dashboard/stats` - 获取统计数据
- `GET /api/dashboard/regions` - 获取区域投诉数据
- `GET /api/dashboard/policies` - 获取政策更新
- `GET /api/dashboard/risk-agencies` - 获取高风险机构列表

## 8. 文件上传模块（通用）
- `POST /api/upload` - 通用文件上传接口
- `GET /api/upload/:filename` - 下载文件
