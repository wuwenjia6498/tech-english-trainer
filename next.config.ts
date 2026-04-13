import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 允许 ngrok 等内网穿透工具的域名通过开发服务器的 origin 校验 */
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
  ],
};

export default nextConfig;
