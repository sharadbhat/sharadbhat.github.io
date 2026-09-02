const backendBaseUrls = {
  local: "/api",
  production: "https://portfolio-backend.sharad-mbhat.workers.dev",
} as const;

export const backendBaseUrl = import.meta.env.PROD
  ? backendBaseUrls.production
  : backendBaseUrls.local;

export const chatApiUrl = `${backendBaseUrl}/chat`;
