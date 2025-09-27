import { useEffect, useMemo } from 'react';
import axiosIntance  from '@/core/axios-config';
import { InternalAxiosRequestConfig , AxiosResponse, AxiosError } from 'axios';

import { getSession, signOut } from 'next-auth/react';

interface TokenSession {
  accessToken?: string;
}

const useAxiosToken = () => {
  const interceptors = useMemo(() => ({
    error: (error: AxiosError) => {
      if (error.response?.status === 401) {
        signOut({ callbackUrl: '/login' });
        alert('Tu sesión ha expirado. Por favor inicia sesión de nuevo.');
      } else {
        alert(`Ocurrió un error: ${error.message}`);
      }
      console.error('Axios error:', error);
  
      return Promise.reject(error);
    },

    request: async (config: InternalAxiosRequestConfig) => {
      const session: TokenSession | null = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      return config;
    },

    response: (response: AxiosResponse) => response,
  }), []);

  useEffect(() => {
    const reqInterceptor = axiosIntance.interceptors.request.use(interceptors.request, interceptors.error);
    const resInterceptor = axiosIntance.interceptors.response.use(interceptors.response, interceptors.error);

    return () => {
      axiosIntance.interceptors.request.eject(reqInterceptor);
      axiosIntance.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);
};

export default useAxiosToken;
