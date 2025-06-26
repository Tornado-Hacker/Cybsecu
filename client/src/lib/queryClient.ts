import { QueryClient } from '@tanstack/react-query';

export async function apiRequest(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => apiRequest(queryKey[0] as string),
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});