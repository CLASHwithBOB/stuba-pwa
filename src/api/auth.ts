import { isAxiosError } from 'axios';
import { axios } from 'src/lib/axios';
import type { User } from 'src/types/models';

export default { login, register, logout, me };

async function login(params: {
  email: string;
  password: string;
}): Promise<{ token: string } | { error: string }> {
  try {
    const res = await axios.post('/auth/login', params);

    return { token: res.data.token };
  } catch (e) {
    const message = isAxiosError(e)
      ? e?.response?.data?.errors?.[0].message
      : 'An unknown error occurred during login.';

    return { error: message };
  }
}

async function register(params: {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}): Promise<{ token: string } | { error: string }> {
  try {
    const res = await axios.post('/auth/register', params);

    return { token: res.data.token };
  } catch (e) {
    const message = isAxiosError(e)
      ? e?.response?.data?.errors?.[0].message
      : 'An unknown error occurred during registration.';

    return {
      error: message,
    };
  }
}

async function logout(token: string | null): Promise<{ success: true } | { error: string }> {
  try {
    await axios.delete('/auth/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true };
  } catch (e) {
    const message = isAxiosError(e)
      ? e?.response?.data?.errors?.[0].message
      : 'An unknown error occurred during logout.';

    return { error: message };
  }
}

async function me(token: string | null): Promise<User | null> {
  try {
    const res = await axios.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.user;
  } catch (e) {
    console.error('Failed to fetch current user:', e);

    return null;
  }
}
