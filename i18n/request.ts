// i18n.ts
import { getRequestConfig, RequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
    messages: (await import(`./messages/${locale}.json`)).default,
} as never as RequestConfig));