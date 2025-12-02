# ReviewPilot - AI 客户评论回复生成器

一个基于 DeepSeek AI 的智能客户评论回复生成工具，帮助电商卖家快速生成专业、人性化的评论回复。

## ✨ 功能特性

- 🤖 **AI 驱动** - 使用 DeepSeek API 生成智能回复
- 🎭 **多种人格** - 4 种不同的回复风格：
  - Amazon 合规官 - 专业、谨慎、符合政策
  - Google 营销经理 - 热情、SEO 优化
  - 社交媒体运营 - 友好、随意、使用表情符号
  - 危机管理专家 - 谦逊、专注于化解危机
- 📝 **三种回复选项** - 为每条评论生成 3 种不同风格的回复
- 🌍 **多语言支持** - 支持英语、西班牙语、法语、德语、中文等
- 💾 **自动保存** - 店铺信息自动保存到本地
- 📋 **一键复制** - 快速复制生成的回复

## 🚀 快速开始

### 1. 安装依赖

\`\`\`bash
npm install
# 或者
pnpm install
\`\`\`

### 2. 配置 API Key

复制 `.env.example` 文件为 `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

编辑 `.env.local` 文件，填入你的 DeepSeek API Key:

\`\`\`env
DEEPSEEK_API_KEY=your_actual_api_key_here
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
\`\`\`

**如何获取 DeepSeek API Key:**
1. 访问 [DeepSeek 官网](https://platform.deepseek.com/)
2. 注册并登录账号
3. 在控制台中创建 API Key
4. 复制 API Key 到 `.env.local` 文件

### 3. 启动开发服务器

\`\`\`bash
npm run dev
# 或者
pnpm dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 开始使用。

## 📖 使用说明

1. **配置店铺信息**
   - 输入店铺名称（必填）
   - 可选：添加关键词（用于 SEO 优化）
   - 选择输出语言

2. **粘贴客户评论**
   - 将客户评论复制粘贴到文本框中
   - 支持自动清理格式和多余空格

3. **选择回复人格**
   - 根据平台和情况选择合适的回复风格
   - 不同人格会生成不同语气的回复

4. **生成回复**
   - 点击 "Draft Reply" 按钮
   - AI 会生成 3 种不同风格的回复选项
   - 选择最合适的一个，一键复制使用

## 🛠️ 技术栈

- **框架**: Next.js 16 + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件**: Radix UI
- **AI 服务**: DeepSeek API

## 📁 项目结构

\`\`\`
review-reply-generator/
├── app/
│   ├── api/
│   │   └── generate-reply/
│   │       └── route.ts          # DeepSeek API 调用接口
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── dashboard.tsx              # 主面板组件
│   ├── left-panel.tsx             # 左侧配置面板
│   ├── right-panel.tsx            # 右侧结果面板
│   └── ui/                        # UI 组件库
├── .env.local                     # 环境变量（需要创建）
├── .env.example                   # 环境变量示例
└── package.json
\`\`\`

## 🔒 安全说明

- ⚠️ **不要提交** `.env.local` 文件到 Git 仓库
- 🔑 API Key 仅在服务器端使用，不会暴露给客户端
- 🛡️ 所有 API 调用都通过 Next.js API 路由进行，确保安全性

## 📝 API 使用说明

### DeepSeek API 调用示例

\`\`\`javascript
const response = await fetch('/api/generate-reply', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    review: '客户评论内容',
    storeName: '店铺名称',
    keywords: '关键词',
    language: 'English US',
    persona: 'amazon'
  })
})

const data = await response.json()
// data.options - 3 种回复选项
// data.warnings - 政策警告（如果有）
// data.usage - API 使用统计
\`\`\`

## 🎨 自定义

### 添加新的人格

编辑 `app/api/generate-reply/route.ts` 中的 `PERSONA_CONFIGS` 对象：

\`\`\`typescript
const PERSONA_CONFIGS = {
  custom: {
    name: "自定义人格",
    systemPrompt: "你的系统提示词...",
    warnings: ["警告信息"],
  },
}
\`\`\`

然后在 `components/left-panel.tsx` 中的 `PERSONAS` 数组添加对应的选项。

## 🐛 常见问题

### 1. API Key 错误

**错误**: "DeepSeek API key not configured"

**解决方案**: 
- 确保 `.env.local` 文件存在
- 确保 `DEEPSEEK_API_KEY` 已正确设置
- 重启开发服务器（修改 `.env.local` 后需要重启）

### 2. 端口被占用

**错误**: "Port 3000 is in use"

**解决方案**:
\`\`\`bash
# 查找占用端口的进程
lsof -i :3000

# 终止进程
kill -9 <PID>
\`\`\`

### 3. 生成的回复不理想

**解决方案**:
- 尝试不同的人格选项
- 调整系统提示词（在 `route.ts` 中）
- 提供更多的关键词信息
- 确保评论内容完整清晰

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请通过 Issue 联系。

---

**注意**: 使用本工具生成的回复仅供参考，建议根据实际情况进行调整后再发布。


