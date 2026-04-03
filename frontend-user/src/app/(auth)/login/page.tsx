'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/schemas';
import { useAuthStore } from '@/stores';
import { UserRole } from '@/types';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui';

// 模拟测试账号
const TEST_ACCOUNTS = [{ email: 'test@example.com', password: '123456', name: '测试用户' }];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);

    // 模拟请求延迟
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 模拟登录验证（实际项目中应调用 API）
    const account = TEST_ACCOUNTS.find(
      (acc) => acc.email === data.email && acc.password === data.password
    );

    if (account) {
      // 登录成功
      const mockUser = {
        id: '1',
        username: account.name,
        email: account.email,
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const mockToken = 'mock-jwt-token-' + Date.now();

      login(mockUser, mockToken);
      router.push('/dashboard');
    } else {
      setError('邮箱或密码错误');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>欢迎回来</CardTitle>
          <CardDescription>请输入您的账号信息登录</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                邮箱地址
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                密码
              </label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" loading={isSubmitting}>
              登录
            </Button>
            <p className="text-center text-sm text-zinc-500">
              还没有账号？{' '}
              <Link
                href="/register"
                className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
              >
                立即注册
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
