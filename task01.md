角色：你现在是一位精通 Next.js (App Router)、Tailwind CSS 的资深前端开发工程师，同时你非常擅长极简治愈系（Minimalist Healing）的 UI 设计。

任务：我们需要开发一个技术英语记忆训练工具的 V0.1 静态页面。请帮我实现一个主页和核心的闪卡（Flashcard）组件。

设计规范 (Design System)：

配色：整体背景使用低饱和度的燕麦灰（如 bg-[#F7F6F2]），卡片本身为纯白，带非常柔和的阴影。强调色和图标使用莫兰迪绿（如 text-[#7A9586]）。

排版：大字体，留白充足（呼吸感强），无需复杂的边框，靠空间来分隔信息。

交互：卡片点击后有平滑的 3D 翻转过渡动画（使用 CSS Transform）。

数据结构：
请在代码中直接使用以下 mock 数据：

JavaScript
const mockData = [
  {
    word: "Component",
    phonetic: "[kəmˈpoʊ.nənt]",
    translation: "组件",
    tech_context: "就像搭积木的零件，构成网页上的按钮、导航栏等独立区块。",
    code_example: "export default function ButtonComponent() { return <button>点击</button> }"
  },
  {
    word: "Deploy",
    phonetic: "[dɪˈplɔɪ]",
    translation: "部署",
    tech_context: "把你在本地写好的代码，发布到服务器上，让全世界都能通过网址访问。",
    code_example: "vercel deploy --prod"
  }
];
功能要求：

主页面 (app/page.tsx)：居中展示闪卡。包含“上一个”、“下一个”的简单切换按钮（样式也要极简）。

闪卡组件 (components/Flashcard.tsx)：

正面：正中心显示巨大的英文单词（如 text-5xl），单词下方是较小、浅色的音标。右上角放置一个 lucide-react 的喇叭图标。

发音功能：点击喇叭图标，调用浏览器原生的 Web Speech API (window.speechSynthesis) 播放单词发音（美音）。

背面：显示中文释义（突出）、技术语境解释（浅色段落）以及用淡灰色背景包裹的一行代码示例。

请给出这两个文件的完整代码，确保可以直接运行。