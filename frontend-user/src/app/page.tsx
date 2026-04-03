'use client';

import Link from 'next/link';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { useAuthStore } from '@/stores';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            Front UI
          </h1>
          <p className="mb-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            基于 Next.js + TypeScript + Tailwind CSS 构建的现代化前端项目模板。
          </p>
          <p className="mb-10 text-base text-zinc-500 dark:text-zinc-500">
            集成 Zustand 状态管理 · React Query 数据获取 · React Hook Form + Zod 表单验证 · Axios
            请求封装
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              进入仪表盘
            </Link>
            {!isAuthenticated && (
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                登录账号
              </Link>
            )}
          </div>
        </div>

        {/* 技术栈展示 */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: '状态管理',
              desc: 'Zustand 轻量级状态管理 + React Query 服务端状态',
            },
            {
              title: '表单处理',
              desc: 'React Hook Form + Zod 类型安全的表单验证',
            },
            {
              title: 'UI 组件',
              desc: 'Tailwind CSS + CVA 构建可定制组件体系',
            },
            {
              title: 'API 请求',
              desc: 'Axios 封装 + 拦截器 + 统一错误处理',
            },
            {
              title: '代码质量',
              desc: 'ESLint + Prettier + Husky + lint-staged',
            },
            {
              title: '测试框架',
              desc: 'Jest + React Testing Library 单元测试',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-zinc-200 p-6 transition-shadow hover:shadow-md dark:border-zinc-800"
            >
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
// test
