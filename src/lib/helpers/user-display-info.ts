export function getUserDisplayInfo(user: {
  name?: string;
  email?: string;
  avatar?: { url?: string };
  id?: string | number;
}) {
  const name = user.name || user.email?.split('@')[0] || 'Usuario';
  const email = user.email || '';
  const avatarUrl = user.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

  return { name, email, avatarUrl };
}
