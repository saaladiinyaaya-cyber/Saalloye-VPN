import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Country } from '@/constants/countries';

const COUNTRY_KEY = 'saalloye.preferred-country';
const HAPTICS_KEY = 'saalloye.haptics-enabled';

type AppPreferences = {
  preferredCountry: Country | null;
  hapticsEnabled: boolean;
  preferencesLoaded: boolean;
  storageWarning: boolean;
  setPreferredCountry: (country: Country) => Promise<void>;
  setHapticsEnabled: (enabled: boolean) => Promise<void>;
};

const AppPreferencesContext = createContext<AppPreferences | null>(null);

export function AppPreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preferredCountry, setPreferredCountryState] = useState<Country | null>(
    null,
  );
  const [hapticsEnabled, setHapticsEnabledState] = useState(true);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPreferences() {
      try {
        const [country, haptics] = await Promise.all([
          AsyncStorage.getItem(COUNTRY_KEY),
          AsyncStorage.getItem(HAPTICS_KEY),
        ]);

        if (!active) return;

        if (country) {
          setPreferredCountryState(country as Country);
        }
        if (haptics !== null) {
          setHapticsEnabledState(haptics === 'true');
        }
      } catch {
        if (active) setStorageWarning(true);
      } finally {
        if (active) setPreferencesLoaded(true);
      }
    }

    void loadPreferences();
    return () => {
      active = false;
    };
  }, []);

  const setPreferredCountry = useCallback(async (country: Country) => {
    try {
      await AsyncStorage.setItem(COUNTRY_KEY, country);
      setPreferredCountryState(country);
      setStorageWarning(false);
    } catch (error) {
      setStorageWarning(true);
      throw error;
    }
  }, []);

  const setHapticsEnabled = useCallback(async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem(HAPTICS_KEY, String(enabled));
      setHapticsEnabledState(enabled);
      setStorageWarning(false);
    } catch (error) {
      setStorageWarning(true);
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      preferredCountry,
      hapticsEnabled,
      preferencesLoaded,
      storageWarning,
      setPreferredCountry,
      setHapticsEnabled,
    }),
    [
      preferredCountry,
      hapticsEnabled,
      preferencesLoaded,
      storageWarning,
      setPreferredCountry,
      setHapticsEnabled,
    ],
  );

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  );
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);
  if (!context) {
    throw new Error(
      'useAppPreferences must be used inside AppPreferencesProvider.',
    );
  }
  return context;
}
