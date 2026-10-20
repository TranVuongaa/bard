export function authError(error: unknown): string {
  const value = error as { code?: string; errors?: { code?: string }[] };
  const code = value?.errors?.[0]?.code ?? value?.code;
  switch (code) {
    case 'form_password_incorrect':
    case 'form_identifier_not_found':
      return 'Check your email and password and try again.';
    case 'form_identifier_exists':
      return 'An account already uses this email. Try signing in.';
    case 'form_password_pwned':
      return 'This password has appeared in a data breach. Choose another password.';
    case 'form_password_length_too_short':
      return 'Use at least 8 characters.';
    case 'form_code_incorrect':
      return 'That code isn’t correct. Try again.';
    case 'verification_expired':
    case 'verification_failed':
      return 'This code has expired. Request a new code.';
    case 'too_many_requests':
      return 'Too many attempts. Wait a moment and try again.';
    case 'network_error':
      return 'Can’t connect. Check your connection and try again.';
    default:
      return 'We couldn’t complete that request. Please try again.';
  }
}

export const incompleteAuth = 'Your account needs another verification step. Please contact support for help.';
