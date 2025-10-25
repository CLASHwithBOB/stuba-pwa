import { defineStore } from 'pinia';
import { RESPONSE_TYPE } from 'src/enums/response';
import { axios } from 'src/lib/axios';
import type { User } from 'src/types/models';
import type { RedirectResponse } from 'src/types/responses';
import { ref } from 'vue';

export const useAuth = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('auth_token'));

  function authenticate(newToken: string): void {
    token.value = newToken;
    localStorage.setItem('auth_token', newToken);
  }

  async function login(payload: { email: string; password: string }): Promise<void> {
    try {
      const result = await axios.post('/auth/login', payload);

      authenticate(result.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async function register(payload: {
    nickname: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }): Promise<void> {
    try {
      const result = await axios.post('/auth/register', payload);
      authenticate(result.data.token);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  async function logout(): Promise<RedirectResponse | undefined> {
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
    } catch (error) {
      console.error('Logout failed:', error);
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
