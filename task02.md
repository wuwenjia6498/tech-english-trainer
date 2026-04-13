角色：资深 Next.js 全栈工程师。

任务：我们的 tech-english-trainer 项目已经完成了静态 UI，现在需要接入 Supabase 数据库。

技术动作：

请在项目根目录（或 lib 文件夹）下创建一个 Supabase 客户端配置文件 supabase.ts，读取 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY。

将主页面（app/page.tsx）改造为可以从 Supabase 的 vocabulary 表中异步获取数据的服务端组件（Server Component）或客户端组件（根据最佳实践）。

取消原来写死在代码里的 mockData。现在，闪卡组件需要接收从 Supabase 获取到的真实单词数据列表。

保持现有的极简治愈系 UI 样式、翻转动画和小喇叭发音功能完全不变。如果数据还在加载中，请提供一个优雅的极简 Loading 状态。

请给出更新后的完整代码。