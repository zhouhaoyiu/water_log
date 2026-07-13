declare module "tdesign-miniprogram/toast" {
  export interface ToastOptionsType {
    message: string;
    theme?: string;
    direction?: string;
    duration?: number | string;
    [key: string]: unknown;
  }

  export default function Toast(
    options: ToastOptionsType & { context: unknown; selector: string },
  ): void;
}

declare module "tdesign-miniprogram/toast/index" {
  export interface ToastOptionsType {
    message: string;
    theme?: string;
    direction?: string;
    duration?: number | string;
    [key: string]: unknown;
  }

  export function hideToast(options: { context: unknown; selector: string }): void;
  export default function Toast(
    options: ToastOptionsType & { context: unknown; selector: string },
  ): void;
}
