import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useAppPreferences } from '@/providers/AppPreferencesProvider';

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { preferredCountry, hapticsEnabled } = useAppPreferences();
  const explainUnavailable = () => {
    if (hapticsEnabled) void Haptics.selectionAsync();
    Alert.alert(
      'VPN service not configured',
      'This app is an interface preview and does not connect to a VPN or encrypt your traffic. A real VPN server and secure tunnel are required before Connect can work.',
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 10),
            paddingBottom: 120 + (Platform.OS === 'web' ? 34 : 0),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brand}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.logo}
              accessibilityLabel="Saalloye VPN shield"
            />
            <View style={styles.brandText}>
              <Text style={[styles.brandName, { color: colors.foreground }]}>
                Saalloye
              </Text>
              <Text style={[styles.brandCaption, { color: colors.mutedForeground }]}>
                VPN
              </Text>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open settings"
            testID="home-settings-button"
            onPress={() => router.push('/settings')}
            style={({ pressed }) => [
              styles.headerButton,
              { backgroundColor: colors.card, opacity: pressed ? 0.75 : 1 },
            ]}
          >
            <Ionicons name="settings-outline" size={20} color={colors.foreground} />
          </Pressable>
        </View>

        <View style={styles.intro}>
          <Text style={[styles.headline, { color: colors.foreground }]}>
            Your privacy,{"\n"}at your pace.
          </Text>
          <Text style={[styles.introText, { color: colors.mutedForeground }]}>
            Choose a preferred country and manage your VPN interface.
          </Text>
        </View>

        <View
          style={[
            styles.statusCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.statusLeading}>
            <View style={[styles.statusDot, { backgroundColor: colors.mutedForeground }]} />
            <View style={styles.statusCopy}>
              <Text style={[styles.statusTitle, { color: colors.foreground }]}>
                Disconnected
              </Text>
              <Text style={[styles.statusSubtitle, { color: colors.mutedForeground }]}>
                No VPN tunnel is active
              </Text>
            </View>
          </View>
          <View style={[styles.statusTag, { backgroundColor: colors.surfaceInset }]}>
            <Text style={[styles.statusTagText, { color: colors.mutedForeground }]}>
              OFF
            </Text>
          </View>
        </View>

        <View style={styles.connectArea}>
          <View
            style={[
              styles.connectHalo,
              { borderColor: colors.border, backgroundColor: colors.surfaceInset },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Connect to VPN"
              testID="vpn-connect-button"
              onPress={explainUnavailable}
              style={({ pressed }) => [
                styles.connectButton,
                {
                  backgroundColor: colors.primary,
                  shadowColor: colors.shadow,
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Ionicons name="power-outline" size={30} color={colors.primaryForeground} />
              <Text style={[styles.connectLabel, { color: colors.primaryForeground }]}>
                Connect
              </Text>
            </Pressable>
          </View>
          <View style={styles.connectCaption}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.success} />
            <Text style={[styles.unavailableText, { color: colors.mutedForeground }]}>
              VPN service is not configured
            </Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          testID="preferred-location-card"
          onPress={() => router.push('/locations')}
          style={({ pressed }) => [
            styles.locationCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: pressed ? 0.84 : 1,
            },
          ]}
        >
          <View style={[styles.locationIcon, { backgroundColor: colors.secondary }]}>
            <Ionicons name="globe-outline" size={21} color={colors.primary} />
          </View>
          <View style={styles.locationCopy}>
            <Text style={[styles.locationLabel, { color: colors.mutedForeground }]}>
              PREFERRED COUNTRY
            </Text>
            <Text style={[styles.locationName, { color: colors.foreground }]}>
              {preferredCountry ?? 'Choose a country'}
            </Text>
            <Text style={[styles.locationFootnote, { color: colors.mutedForeground }]}>
              Preference only · no live server selected
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={19} color={colors.mutedForeground} />
        </Pressable>

        <View style={[styles.previewNote, { backgroundColor: colors.accent }]}>
          <Ionicons name="information-circle-outline" size={17} color={colors.success} />
          <Text style={[styles.previewNoteText, { color: colors.accentForeground }]}>
            Interface preview. A real VPN server and secure tunnel are required
            for VPN protection.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22, gap: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 42, height: 42, borderRadius: 13 },
  brandText: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  brandName: { fontFamily: 'Inter_700Bold', fontSize: 17, letterSpacing: -0.4 },
  brandCaption: { fontFamily: 'Inter_500Medium', fontSize: 12 },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: { marginTop: 8, gap: 8 },
  headline: {
    fontFamily: 'Inter_700Bold',
    fontSize: 35,
    lineHeight: 41,
    letterSpacing: -1.15,
  },
  introText: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21 },
  statusCard: {
    minHeight: 75,
    borderWidth: 1,
    borderRadius: 19,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLeading: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusDot: { width: 9, height: 9, borderRadius: 5 },
  statusCopy: { gap: 4 },
  statusTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  statusSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 12 },
  statusTag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 9 },
  statusTagText: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1 },
  connectArea: { alignItems: 'center', gap: 13, paddingVertical: 2 },
  connectHalo: {
    height: 194,
    width: 194,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButton: {
    height: 154,
    width: 154,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    elevation: 6,
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
  },
  connectLabel: { fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: 0.2 },
  connectCaption: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  unavailableText: { fontFamily: 'Inter_500Medium', fontSize: 12 },
  locationCard: {
    minHeight: 90,
    borderRadius: 19,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationCopy: { flex: 1, gap: 3 },
  locationLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 0.8 },
  locationName: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  locationFootnote: { fontFamily: 'Inter_400Regular', fontSize: 10 },
  previewNote: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    borderRadius: 14,
  },
  previewNoteText: { flex: 1, fontFamily: 'Inter_500Medium', fontSize: 11, lineHeight: 17 },
});
