import { Button } from '@/components/nativewindui/Button';
import { ScreenContainer } from '@/components/screenContainer';
import { SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Text } from '@/components/nativewindui/Text';
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
