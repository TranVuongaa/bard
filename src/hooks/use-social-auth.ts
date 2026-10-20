import { useSSO } from '@clerk/expo';
import { useRef, useState } from 'react';

import { authError, incompleteAuth } from '@/lib/auth/errors';

export function useSocialAuth() {
  const { startSSOFlow } = useSSO();
  const locked = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function start(strategy: 'oauth_google' | 'oauth_apple') {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setError('');
    try {
      const result = await startSSOFlow({ strategy });
      if (result.createdSessionId && result.setActive) {
        await result.setActive({ session: result.createdSessionId });
      } else if (result.authSessionResult?.type === 'success') {
        setError(incompleteAuth);
      }
    } catch (cause) {
      setError(authError(cause));
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  return { start, busy, error };
}
