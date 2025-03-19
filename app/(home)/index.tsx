import { MainHeader } from '@/components/mainHeader';
import { Button } from '@/components/nativewindui/Button';
import { ScreenContainer } from '@/components/screenContainer';
import { SignedIn, SignedOut, useAuth, useSSO, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { useEffect } from 'react';
import { Text } from '@/components/nativewindui/Text';
import { AuthenticationView } from '@/modules/auth/ui/authenticationView';



export default function Page() {
    const { user } = useUser();
    const { signOut } = useAuth();
    return (
        <>
            <SignedIn>
                <ScreenContainer edges={['top']}>
                    <Text>Hello {user?.emailAddresses?.[0]?.emailAddress}</Text>
                    <Button onPress={() => signOut()}>
                        <Text>Logout</Text>
                    </Button>
                </ScreenContainer>
            </SignedIn>
            <SignedOut>
                <AuthenticationView />
            </SignedOut>
        </>
    )
};
