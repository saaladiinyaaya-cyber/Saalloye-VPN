import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useAppPreferences } from '@/providers/AppPreferencesProvider';

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    preferredCountry,
    hapticsEnabled,
    setHapticsEnabled,
    storageWarning,
  } = useAppPreferences();

  const updateHaptics = async (enabled: boolean) => {
    try {
      await setHapticsEnabled(enabled);
      if (enabled) void Haptics.selectionAsync();
    } catch {
      Alert.alert(
        'Could not save setting',
        'This setting could not be saved on your device. Please try again.',
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
        <Text style={[styles.eyebrow, { color: colors.success }]}>CONTROL CENTER</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Tune the app experience and review what is currently available.
        </Text>

        {storageWarning ? (
          <View
            style={[
              styles.warning,
              { backgroundColor: colors.surfaceInset, borderColor: colors.border },
            ]}
          >
            <Ionicons
              name="warning-outline"
              size={19}
              color={colors.success}
            />
            <Text style={[styles.warningText, { color: colors.mutedForeground }]}>
              A preference could not be loaded or saved. Try changing it again.
            </Text>
          </View>
        ) : null}

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          APP EXPERIENCE
        </Text>
        <View style={[styles.settingsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingRow}>
            <View style={[styles.settingIcon, { backgroundColor: colors.secondary }]}>
              <Ionicons name="moon-outline" size={19} color={colors.primary} />
            </View>
            <View style={styles.settingCopy}>
              <Text style={[styles.settingTitle, { color: colors.foreground }]}>Appearance</Text>
              <Text style={[styles.settingDescription, { color: colors.mutedForeground }]}>
                Dark theme is always on
              </Text>
            </View>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.settingRow}>
            <View style={[styles.settingIcon, { backgroundColor: colors.secondary }]}>
              <Ionicons name="phone-portrait-outline" size={19} color={colors.primary} />
            </View>
            <View style={styles.settingCopy}>
              <Text style={[styles.settingTitle, { color: colors.foreground }]}>
                Haptic feedback
              </Text>
              <Text style={[styles.settingDescription, { color: colors.mutedForeground }]}>
                Vibration for app interactions
              </Text>
            </View>
            <Switch
              accessibilityLabel="Haptic feedback"
              testID="haptics-switch"
              value={hapticsEnabled}
              onValueChange={(value) => void updateHaptics(value)}
              trackColor={{ false: colors.muted, true: colors.success }}
              thumbColor={colors.foreground}
            />
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          PREFERENCES
        </Text>
        <Pressable
          accessibilityRole="button"
          testID="preferred-country-setting"
          onPress={() => router.push('/locations')}
          style={({ pressed }) => [
            styles.locationCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: pressed ? 0.82 : 1,
            },
          ]}
        >
          <View style={[styles.settingIcon, { backgroundColor: colors.secondary }]}>
            <Ionicons name="globe-outline" size={19} color={colors.primary} />
          </View>
          <View style={styles.settingCopy}>
            <Text style={[styles.settingTitle, { color: colors.foreground }]}>
              Preferred country
            </Text>
            <Text style={[styles.settingDescription, { color: colors.mutedForeground }]}>
              {preferredCountry ?? 'Not selected'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
        </Pressable>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          VPN SERVICE
        </Text>
        <View
          style={[
            styles.serviceCard,
            { backgroundColor: colors.surfaceInset, borderColor: colors.border },
          ]}
        >
          <View style={styles.serviceHeader}>
            <View style={[styles.serviceIcon, { backgroundColor: colors.accent }]}>
              <Ionicons name="shield-outline" size={20} color={colors.success} />
            </View>
            <View style={styles.settingCopy}>
              <Text style={[styles.settingTitle, { color: colors.foreground }]}>
                Not configured
              </Text>
              <Text style={[styles.settingDescription, { color: colors.mutedForeground }]}>
                No VPN provider or secure tunnel is connected.
              </Text>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
            Connect controls and protocol settings will only work after a real VPN
            server and secure tunnel are added.
          </Text>
        </View>

        <Text style={[styles.version, { color: colors.mutedForeground }]}>
          Saalloye VPN · Interface preview · 1.0.0
        </Text>
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
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.15,
    marginTop: 8,
    marginBottom: 1,
  },
  settingsCard: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
  },
  settingRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  settingIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingCopy: { flex: 1, gap: 4 },
  settingTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  settingDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 17,
  },
  divider: { height: StyleSheet.hairlineWidth, marginLeft: 54 },
  locationCard: {
    minHeight: 76,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 13,
  },
  serviceHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  serviceIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    padding: 12,
    borderWidth: 1,
    borderRadius: 14,
  },
  warningText: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  version: {
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    marginTop: 12,
  },
});
