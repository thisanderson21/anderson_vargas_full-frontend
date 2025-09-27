import { useEffect, useMemo } from 'react';
import axiosIntance  from '@/core/axios-config';
import { InternalAxiosRequestConfig , AxiosResponse, AxiosError } from 'axios';

import { getSession } from 'next-auth/react';

interface TokenSession {
  accessToken?: string;
}

const useAxiosToken = () => {
  const interceptors = useMemo(() => ({
    error: (error: AxiosError) => Promise.reject(error),

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
