import { useEffect } from 'react';
import * as Updates from 'expo-updates';

/**
 * Over-the-air updates (EAS Update).
 * When the app opens, check for a newer JS/image update published with
 * `npm run update:apk`. If there is one, download it and restart into it,
 * so the client always sees the latest version on the first launch.
 * Does nothing in development (Expo Go / `npm start`).
 */
export function useOtaUpdates() {
  useEffect(() => {
    if (__DEV__ || !Updates.isEnabled) return;

    (async () => {
      try {
        const check = await Updates.checkForUpdateAsync();
        if (!check.isAvailable) return;
        const result = await Updates.fetchUpdateAsync();
        if (result.isNew) await Updates.reloadAsync();
      } catch {
        // Offline or update server unreachable: keep running the current version.
      }
    })();
  }, []);
}
