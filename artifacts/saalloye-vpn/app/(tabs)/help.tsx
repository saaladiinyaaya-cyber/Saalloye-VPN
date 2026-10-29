import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const questions = [
  {
    id: 'protected',
    question: 'Is my internet traffic protected right now?',
    answer:
      'No. This version is an interface preview only. It does not connect to a VPN server or encrypt, route, or hide your internet traffic.',
  },
  {
    id: 'countries',
    question: 'What does choosing a country do?',
    answer:
      'It saves your preferred country on this device. The list is not a directory of live VPN servers, and choosing a country does not change your internet connection.',
  },
  {
    id: 'needed',
    question: 'What is needed to enable Connect?',
    answer:
      'A real VPN provider or server, a secure tunnel implementation for supported devices, and the configuration needed to establish and verify the tunnel.',
  },
  {
    id: 'disconnect',
    question: 'Can I disconnect from a VPN here?',
    answer:
      'There is no active VPN tunnel in this preview, so there is nothing to disconnect. The status remains Disconnected until a real tunnel is integrated.',
  },
];

export default function HelpScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [openQuestion, setOpenQuestion] = useState<string | null>('protected');

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
        <Text style={[styles.eyebrow, { color: colors.success }]}>SAFETY & SUPPORT</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Help center</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Clear answers about this interface preview and what it can do today.
        </Text>

        <View
          style={[
            styles.safetyCard,
            { backgroundColor: colors.surfaceInset, borderColor: colors.border },
          ]}
        >
          <View style={[styles.safetyIcon, { backgroundColor: colors.accent }]}>
            <Ionicons name="shield-half-outline" size={21} color={colors.success} />
          </View>
          <View style={styles.safetyCopy}>
            <Text style={[styles.safetyTitle, { color: colors.foreground }]}>
              VPN tunnel not configured
            </Text>
            <Text style={[styles.safetyText, { color: colors.mutedForeground }]}>
              Do not rely on this app to protect your traffic yet.
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Frequently asked
        </Text>
        <View style={styles.faqList}>
          {questions.map((item) => {
            const expanded = openQuestion === item.id;
            return (
              <View
                key={item.id}
                style={[
                  styles.faqItem,
                  {
                    backgroundColor: colors.card,
                    borderColor: expanded ? colors.primary : colors.border,
                  },
                ]}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded }}
                  testID={`faq-${item.id}`}
                  onPress={() =>
                    setOpenQuestion(expanded ? null : item.id)
                  }
                  style={({ pressed }) => [
                    styles.faqQuestion,
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                >
                  <Text style={[styles.questionText, { color: colors.foreground }]}>
                    {item.question}
                  </Text>
                  <Ionicons
                    name={expanded ? 'remove-circle-outline' : 'add-circle-outline'}
                    size={21}
                    color={expanded ? colors.primary : colors.mutedForeground}
                  />
                </Pressable>
                {expanded ? (
                  <Text style={[styles.answerText, { color: colors.mutedForeground }]}>
                    {item.answer}
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>

        <View style={[styles.footerCard, { backgroundColor: colors.secondary }]}>
          <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
          <Text style={[styles.footerText, { color: colors.secondaryForeground }]}>
            Saalloye VPN currently provides interface controls only. A real VPN
            server and secure tunnel are required for actual VPN functionality.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22, gap: 13 },
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
    marginBottom: 7,
  },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginBottom: 5,
  },
  safetyIcon: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  safetyCopy: { flex: 1, gap: 5 },
  safetyTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  safetyText: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17 },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    marginTop: 7,
    marginBottom: 1,
  },
  faqList: { gap: 9 },
  faqItem: { borderWidth: 1, borderRadius: 17, paddingHorizontal: 14 },
  faqQuestion: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  questionText: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 19,
  },
  answerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 19,
    paddingBottom: 15,
    paddingRight: 4,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    borderRadius: 16,
    padding: 14,
    marginTop: 3,
  },
  footerText: { flex: 1, fontFamily: 'Inter_500Medium', fontSize: 12, lineHeight: 18 },
});
