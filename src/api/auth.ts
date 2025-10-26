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
    const p = {
      ...params,
      avatar:
        'https://scontent.fbts12-1.fna.fbcdn.net/v/t39.30808-6/526297249_2210856226089804_6042065527610702923_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=QvvHJZCUGoIQ7kNvwHU-Y8i&_nc_oc=AdlXduEpNY-boFiKRxGolP4dTag0xDjBLv0urDZfm7Mvn5UWBNaw6OeHBty58LE5vbw&_nc_zt=23&_nc_ht=scontent.fbts12-1.fna&_nc_gid=FrVt_rPyUNVG1K6VVhwEkw&oh=00_AffPYhFeRg8MMz4ZJrmiEGAHOgYDktEjURgbaIyzeZZx5g&oe=69028F80',
    };
    const res = await axios.post('/auth/register', p);

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
