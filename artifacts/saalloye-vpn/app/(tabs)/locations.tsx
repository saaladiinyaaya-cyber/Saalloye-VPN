import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { countries } from '@/constants/countries';
import type { Country } from '@/constants/countries';
import { useColors } from '@/hooks/useColors';
import { useAppPreferences } from '@/providers/AppPreferencesProvider';

export default function LocationsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { preferredCountry, setPreferredCountry, hapticsEnabled } =
    useAppPreferences();

  const saveCountry = async (country: Country) => {
    try {
      await setPreferredCountry(country);
      if (hapticsEnabled) void Haptics.selectionAsync();
    } catch {
      Alert.alert(
        'Could not save preference',
        'Your country preference could not be saved on this device. Please try again.',
      );
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 12),
            paddingBottom: 120 + (Platform.OS === 'web' ? 34 : 0),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.eyebrow, { color: colors.success }]}>
          PREFERRED LOCATION
        </Text>
        <Text style={[styles.title, { color: colors.foreground }]}>
          Choose a country
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Save where you would like to connect when a real VPN service is set
          up.
        </Text>

        <View
          style={[
            styles.notice,
            { backgroundColor: colors.surfaceInset, borderColor: colors.border },
          ]}
        >
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={colors.primary}
          />
          <Text style={[styles.noticeText, { color: colors.mutedForeground }]}>
            These are country preferences, not live VPN servers. No server
            availability is being shown.
          </Text>
        </View>

        <View style={styles.countryList}>
          {countries.map((country) => {
            const selected = preferredCountry === country;
            return (
              <Pressable
                key={country}
                accessibilityRole="button"
                accessibilityLabel={`Select ${country} as preferred country`}
                testID={`country-${country.toLowerCase().replaceAll(' ', '-')}`}
                onPress={() => void saveCountry(country)}
                style={({ pressed }) => [
                  styles.countryRow,
                  {
                    backgroundColor: selected
                      ? colors.accent
                      : colors.card,
                    borderColor: selected ? colors.success : colors.border,
                    opacity: pressed ? 0.82 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.countryMarker,
                    { backgroundColor: selected ? colors.success : colors.secondary },
                  ]}
                >
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={selected ? colors.background : colors.mutedForeground}
                  />
                </View>
                <View style={styles.countryCopy}>
                  <Text
                    style={[
                      styles.countryName,
                      { color: colors.foreground },
                    ]}
                  >
                    {country}
                  </Text>
                  {selected ? (
                    <Text style={[styles.selectedLabel, { color: colors.success }]}>
                      Saved preference
                    </Text>
                  ) : null}
                </View>
                {selected ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color={colors.success}
                  />
                ) : (
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.mutedForeground}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22, gap: 12 },
  eyebrow: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.4,
    marginBottom: 2,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 30,
    letterSpacing: -0.7,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 8,
  },
  noticeText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 19,
  },
  countryList: { gap: 9 },
  countryRow: {
    minHeight: 68,
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countryMarker: {
    height: 40,
    width: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCopy: { flex: 1, gap: 3 },
  countryName: { fontFamily: 'Inter_600SemiBold', fontSize: 15 },
  selectedLabel: { fontFamily: 'Inter_500Medium', fontSize: 11 },
});
