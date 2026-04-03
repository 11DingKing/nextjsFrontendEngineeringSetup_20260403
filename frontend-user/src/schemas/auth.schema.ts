import { z } from 'zod';

/** 登录表单验证 Schema */
export const loginSchema = z.object({
  email: z.string().min(1, '请输入邮箱地址').email('请输入有效的邮箱地址'),
  password: z
    .string()
    .min(1, '请输入密码')
    .min(6, '密码长度不能少于6位')
    .max(50, '密码长度不能超过50位'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

/** 注册表单验证 Schema */
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, '请输入用户名')
      .min(2, '用户名长度不能少于2位')
      .max(20, '用户名长度不能超过20位')
      .regex(/^[a-zA-Z0-9_]+$/, '用户名只能包含字母、数字和下划线'),
    email: z.string().min(1, '请输入邮箱地址').email('请输入有效的邮箱地址'),
    password: z
      .string()
      .min(1, '请输入密码')
      .min(8, '密码长度不能少于8位')
      .max(50, '密码长度不能超过50位')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '密码必须包含大写字母、小写字母和数字'),
    confirmPassword: z.string().min(1, '请确认密码'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
