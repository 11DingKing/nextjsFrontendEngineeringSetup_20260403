'use client';

import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">仪表盘</h1>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: '总用户数', value: '12,345', change: '+12%' },
              { title: '活跃用户', value: '8,901', change: '+8%' },
              { title: '总收入', value: '¥234,567', change: '+23%' },
              { title: '订单数', value: '1,234', change: '+5%' },
            ].map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                    {stat.change} 较上月
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 占位内容区域 */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>最近活动</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-zinc-100 pb-3 last:border-0 dark:border-zinc-800"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                          活动事件 {i}
                        </p>
                        <p className="text-xs text-zinc-500">2 小时前</p>
                      </div>
                      <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        进行中
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>快速操作</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  这里将展示快速操作面板，您可以在此处添加常用功能的快捷入口。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
