"use client";

import { useEffect } from "react";

/* 客户端组件：在浏览器中注册 Service Worker */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return null;
}
