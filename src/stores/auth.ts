import { defineStore } from 'pinia';
import { api } from 'src/api/api';
import { RESPONSE_TYPE } from 'src/enums/response';
import { error } from 'src/lib/notifications';
import type { User } from 'src/types/models';
import type { NotificationResponse, RedirectResponse } from 'src/types/responses';
import { ref } from 'vue';

export const useAuth = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('auth_token'));

  function authenticate(newToken: string): RedirectResponse {
    token.value = newToken;
    localStorage.setItem('auth_token', newToken);

    return { type: RESPONSE_TYPE.REDIRECT, url: '/dashboard' };
  }

  function notifyError(message: string): NotificationResponse {
    return {
      type: RESPONSE_TYPE.NOTIFICATION,
      notification: {
        ...error,
        message,
      },
    };
  }

  async function login(payload: {
    email: string;
    password: string;
  }): Promise<RedirectResponse | NotificationResponse> {
    const res = await api.auth.login(payload);

    return 'token' in res ? authenticate(res.token) : notifyError(res.error);
  }

  async function register(params: {
    nickname: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }): Promise<RedirectResponse | NotificationResponse> {
    const res = await api.auth.register(params);

    return 'token' in res ? authenticate(res.token) : notifyError(res.error);
  }

  async function logout(): Promise<RedirectResponse | NotificationResponse> {
    const res = await api.auth.logout(token.value);

    if ('success' in res) {
      user.value = null;
      token.value = null;
      localStorage.removeItem('auth_token');

      return { type: RESPONSE_TYPE.REDIRECT, url: '/login' };
    } else {
      return notifyError(res.error);
    }
  }

  async function me(): Promise<User | null> {
    const res = await api.auth.me(token.value);

    user.value = res;

    return res;
  }

  return { user, token, login, register, logout, me };
});
