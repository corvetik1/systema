// src/auth/authActions.ts
import axiosRetry from 'axios-retry';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { financeActions } from '../features/finance/store/financeSlice'; // Исправленный путь для сброса finance
import { apiClient } from '../api/index'; // Импортируем apiClient как именованный экспорт
import { initSocket, disconnectSocket } from '../app/socket'; // Импорт WebSocket
import { setSnackbar } from './authSlice'; // Импорт для уведомлений


/**
 * Интерфейс учетных данных для входа.
 */
interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Интерфейс ответа при успешном входе или проверке аутентификации.
 */
interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
    permissions?: Array<{ action: string; subject: string }>;
  };
}

// Настройка повторных попыток для axios через api.js
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error),
});

/**
 * Асинхронное действие для входа пользователя.
 * @param {LoginCredentials} credentials - Учетные данные пользователя.
 * @returns {Promise<AuthResponse>} Объект с токеном и нормализованными данными пользователя.
 */
export const login = createAsyncThunk(
  'auth/loginSuccess',
  async ({ username, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      return { token: '', user: { id: 0, username: '', role: '' } };
    } catch (error) {
      return rejectWithValue('Ошибка входа');
    }
  }
);

/**
 * Асинхронное действие для обновления токена.
 * @returns {Promise<string>} Новый токен.
 */
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const startTime = Date.now();
    
    const { auth } = getState() as { auth: { token: string | null } };
    const currentToken = auth.token;

    if (!currentToken) {
      
      dispatch(logout());
      throw new Error('Токен отсутствует');
    }

    try {
      
      // TODO: реализовать refreshToken через api, если появится
      if (!isValidJWT('')) {
        
        throw new Error('Получен некорректный новый JWT-токен');
      }

      
      localStorage.setItem('token', '');

      dispatch(setSnackbar({ message: 'Токен успешно обновлён', severity: 'info' }));
      return '';
    } catch (error) {
      
      
      dispatch(logout());
      dispatch(setSnackbar({ message: 'Ошибка обновления токена', severity: 'error' }));
      return rejectWithValue('Ошибка обновления токена');
    }
  }
);

/**
 * Асинхронное действие для проверки аутентификации.
 * @returns {Promise<AuthResponse>} Объект с токеном и нормализованными данными пользователя.
 */
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { getState, rejectWithValue }) => {
    // TODO: реализовать checkAuth через api, если появится
    return { token: '', user: { id: 0, username: '', role: '' } };
  }
);

/**
 * Асинхронное действие для выхода из системы.
 * @returns {Promise<null>} null после завершения выхода.
 */
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    const startTime = Date.now();
    
    dispatch(financeActions.resetFinance());
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    
    dispatch(setSnackbar({ message: 'Вы успешно вышли из системы', severity: 'info' }));
    return null;
  }
);

/**
 * Валидация JWT-токена с проверкой формата и срока действия.
 * @param {string} token - JWT-токен.
 * @returns {boolean} Валиден ли токен.
 */
const isValidJWT = (token: string): boolean => {
  if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
    
    return false;
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      
      return false;
    }
    
    return true;
  } catch (e) {
    
    return false;
  }
};

// Экспорт всех действий как объект
export default {
  login,
  logout,
  refreshToken,
  checkAuth,
};