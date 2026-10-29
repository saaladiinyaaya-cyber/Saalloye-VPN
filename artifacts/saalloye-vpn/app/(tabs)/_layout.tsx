import React from 'react';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/native-tabs';
import { SymbolView } from 'expo-symbols';

// IMPORTANT: iOS 26 uses NativeTabs for native tabs with liquid glass support.
// NativeTabs intentionally does NOT use custom design tokens — liquid glass
// is a system-level appearance provided by iOS and cannot be overridden.
// Custom brand colors are applied only on the ClassicTabLayout path (older iOS / Android / web).
function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
        />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="locations">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'globe', selected: 'globe.americas.fill' }}
        />
        <NativeTabs.Trigger.Label>Countries</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="help">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'questionmark.circle', selected: 'questionmark.circle.fill' }}
        />
        <NativeTabs.Trigger.Label>Help</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
        />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isIOS = Platform.OS === 'ios';
  const isWeb = Platform.OS === 'web';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarLabelStyle: { fontFamily: 'Inter_500Medium', fontSize: 10 },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isIOS ? 'transparent' : colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          ...(isWeb ? { height: 84 } : { height: 66 }),
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={100}
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFill}
            />
          ) : isWeb ? (
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: colors.background },
              ]}
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            isIOS ? (
              <SymbolView
                name="house"
                tintColor={focused ? colors.primary : colors.mutedForeground}
                size={23}
              />
            ) : (
              <Ionicons
                name="home-outline"
                size={21}
                color={focused ? colors.primary : colors.mutedForeground}
              />
            )
          ),
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{
          title: 'Countries',
          tabBarIcon: ({ focused }) => (
            isIOS ? (
              <SymbolView
                name="globe"
                tintColor={focused ? colors.primary : colors.mutedForeground}
                size={23}
              />
            ) : (
              <Ionicons
                name="globe-outline"
                size={21}
                color={focused ? colors.primary : colors.mutedForeground}
              />
            )
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ focused }) => (
            isIOS ? (
              <SymbolView
                name="questionmark.circle"
                tintColor={focused ? colors.primary : colors.mutedForeground}
                size={23}
              />
            ) : (
              <Ionicons
                name="help-circle-outline"
                size={21}
                color={focused ? colors.primary : colors.mutedForeground}
              />
            )
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            isIOS ? (
              <SymbolView
                name="gearshape"
                tintColor={focused ? colors.primary : colors.mutedForeground}
                size={23}
              />
            ) : (
              <Ionicons
                name="settings-outline"
                size={21}
                color={focused ? colors.primary : colors.mutedForeground}
              />
            )
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (Platform.OS === 'ios' && isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
