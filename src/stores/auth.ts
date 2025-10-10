import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any | null>(null);
  const token = ref<string | null>(localStorage.getItem('auth_token'));

  function authenticate(newToken: string): void {
    token.value = newToken;
    localStorage.setItem('auth_token', newToken);
  }

  async function login(payload: { email: string; password: string }): Promise<void> {
    try {
      const result = await api.post('/auth/login', payload);

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
      const result = await api.post('/auth/register', payload);
      authenticate(result.data.token);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  async function logout(): Promise<void> {
    try {
      await api.delete('/auth/logout', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      user.value = null;
      token.value = null;
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async function me(): Promise<any | null> {
    try {
      const result = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      user.value = result.data.user;
      return user.value;
    } catch (error) {
      console.error('Fetching user failed:', error);
    }
  }

  return { user, token, login, register, logout, me };
});
