export type Role = 'admin' | 'viewer';

export interface LoggedInUser {
  name: string;
  role: Role;
}

export const getLoggedInUser = (): LoggedInUser | null => {
  const raw = localStorage.getItem('logged_in');
  return raw ? JSON.parse(raw) : null;
};