import { User } from '@/payload-types';

/**
 * Safely get user name from User object
 */
export const getUserName = (user?: number | User | null): string => {
  if (!user || typeof user !== 'object') {
    return 'Usuario';
  }
  return user.name || 'Usuario';
};

/**
 * Safely get user avatar URL from User object
 */
export const getUserAvatarUrl = (user?: number | User | null): string | undefined => {
  if (!user || typeof user !== 'object') {
    return undefined;
  }

  const avatar = user.avatar;
  if (avatar && typeof avatar === 'object' && avatar.url) {
    return avatar.url;
  }

  return undefined;
};

/**
 * Safely get user email from User object
 */
export const getUserEmail = (user?: number | User | null): string => {
  if (!user || typeof user !== 'object') {
    return '';
  }
  return user.email || '';
};

/**
 * Check if user is populated (not just an ID)
 */
export const isUserPopulated = (user?: number | User | null): user is User => {
  return user !== null && user !== undefined && typeof user === 'object';
};
