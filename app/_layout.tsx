import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"
import { ClerkProvider } from '@clerk/clerk-expo';

import { useColorScheme, useInitialAndroidBarSync } from '../UIProvider/theme/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UIProvider } from '@/UIProvider';
import { tokenCache } from '@/cache';
import { sqliteService } from '@/lib/SQLite/SQLite';
import { SQLiteProvider } from 'expo-sqlite';
export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useInitialAndroidBarSync();
    const { isDarkColorScheme } = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    };

    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={'pk_test_bXV0dWFsLXRyb3V0LTYxLmNsZXJrLmFjY291bnRzLmRldiQ'}>
            <SQLiteProvider databaseName={sqliteService.name} onInit={sqliteService.migrateDbIfNeeded}>
                <StatusBar
                    key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
                    style={isDarkColorScheme ? 'light' : 'dark'}
                />
                <SafeAreaProvider>
                    <UIProvider>
                        <Stack screenOptions={{ headerShown: false }} />
                    </UIProvider>
                </SafeAreaProvider>
            </SQLiteProvider>
        </ClerkProvider>
    );
}
