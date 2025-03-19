import { ScreenContainer } from "@/components/screenContainer";
import { FC, useMemo } from "react";
import { Text } from "@/components/nativewindui/Text";
import { Button } from "@/components/nativewindui/Button";
import { useUser, useAuth, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { getStyles } from "./styles";

export const SettingsView: FC = () => {
    const styles = useMemo(() => getStyles(), []);
    const { user } = useUser();
    const { signOut } = useAuth();

    return (
        <ScreenContainer edges={['top', 'bottom']} containerStyle={styles.container}>
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