// Simple admin authentication using localStorage
const ADMIN_TOKEN_KEY = 'er_med_admin_token';

export function login(password: string): boolean {
  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
  
  if (password === correctPassword) {
    const token = generateToken();
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  return !!token;
}

function generateToken(): string {
  return 'token_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}
