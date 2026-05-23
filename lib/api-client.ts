const BASE_URL =
  'https://algopulse-backend-3knx.onrender.com';

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

export async function apiCall<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {

  const {
    method = 'GET',
    body,
    headers = {}
  } = options;

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('auth_token')
      : null;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };
  const isAuthEndpoint =
  endpoint.startsWith('/api/auth/login') ||
  endpoint.startsWith('/api/auth/register');

  if (token && !isAuthEndpoint) {
  requestHeaders['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      method,
      headers: requestHeaders,
      body: body
        ? JSON.stringify(body)
        : undefined,
    }
  );

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({
        message: 'Unknown error',
      }));

    throw new Error(
      error.message ||
      `API error: ${response.status}`
    );
  }

  return response.json();
}