import { isAxiosError } from 'axios';
import { defineStore } from 'pinia';
import { RESPONSE_TYPE } from 'src/enums/response';
import { axios } from 'src/lib/axios';
import { error } from 'src/lib/notifications';
import type { User } from 'src/types/models';
import type { ErrorResponse, RedirectResponse } from 'src/types/responses';
import { ref } from 'vue';

export const useAuth = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('auth_token'));

  function authenticate(newToken: string): RedirectResponse {
    token.value = newToken;
    localStorage.setItem('auth_token', newToken);

    return { type: RESPONSE_TYPE.REDIRECT, url: '/dashboard' };
  }

  async function login(payload: {
    email: string;
    password: string;
  }): Promise<RedirectResponse | ErrorResponse> {
    try {
      const result = await axios.post('/auth/login', payload);

      return authenticate(result.data.token);
    } catch (e) {
      const message = isAxiosError(e)
        ? e?.response?.data?.errors?.[0].message
        : 'An unknown error occurred during login.';

      return {
        type: RESPONSE_TYPE.ERROR,
        notification: {
          ...error,
          message,
        },
      };
    }
  }

  async function register(payload: {
    nickname: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }): Promise<RedirectResponse | ErrorResponse> {
    try {
      const result = await axios.post('/auth/register', payload);

      return authenticate(result.data.token);
    } catch (e) {
      const message = isAxiosError(e)
        ? e?.response?.data?.errors?.[0].message
        : 'An unknown error occurred during registration.';

      return {
        type: RESPONSE_TYPE.ERROR,
        notification: {
          ...error,
          message,
        },
      };
    }
  }

  async function logout(): Promise<RedirectResponse | ErrorResponse> {
    try {
      await axios.delete('/auth/logout', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      user.value = null;
      token.value = null;
      localStorage.removeItem('auth_token');

      return { type: RESPONSE_TYPE.REDIRECT, url: '/login' };
    } catch (e) {
      const message = isAxiosError(e)
        ? e?.response?.data?.errors?.[0].message
        : 'An unknown error occurred during logout.';

      return {
        type: RESPONSE_TYPE.ERROR,
        notification: {
          ...error,
          message,
        },
      };
    }
  }

  async function me(): Promise<User | null> {
    try {
      const result = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      user.value = result.data.user;
      return user.value;
    } catch (error) {
      console.error('Fetching user failed:', error);
      return null;
    }
  }

  return { user, token, login, register, logout, me };
});
