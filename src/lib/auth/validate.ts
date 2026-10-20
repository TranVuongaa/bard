export const passwordMinimum = 8;

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? undefined : 'Enter a valid email address.';
}

export function validatePassword(password: string, signingUp: boolean) {
  if (!password) return 'Enter your password.';
  return signingUp && password.length < passwordMinimum ? `Use at least ${passwordMinimum} characters.` : undefined;
}
