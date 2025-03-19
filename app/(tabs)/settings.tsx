import { ScreenContainer } from '@/components/screenContainer';
import { Text } from '@/components/nativewindui/Text';
import { Button } from '@/components/nativewindui/Button';
import { SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

export default function Tab() {
    const { user } = useUser();
    const { signOut } = useAuth();

    return (
        <ScreenContainer edges={['top']}>
            <Text>Hello {user?.emailAddresses?.[0]?.emailAddress}</Text>
            <Button onPress={() => signOut()}>
                <Text>Logout</Text>
            </Button>
            <SignedOut>
                <Redirect href={'/(auth)/authentication'} />
            </SignedOut>
        </ScreenContainer>
    )
};
