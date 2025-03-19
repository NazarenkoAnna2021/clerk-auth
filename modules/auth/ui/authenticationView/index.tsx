import React, { useMemo } from 'react'
import { ScreenContainer } from '@/components/screenContainer'
import { MainHeader } from '@/components/mainHeader'
import { Button } from '@/components/nativewindui/Button'
import { Text } from '@/components/nativewindui/Text'
import { useAuthentication } from '../../presenters/useAuthentication'
import { getStyles } from './styles'

export const AuthenticationView = () => {
    const styles = useMemo(() => getStyles(), []);
    const { onGithubSignIn,onGoogleSignIn, onOpenMailSignIn} = useAuthentication();

    return (
        <ScreenContainer headerComponent={<MainHeader title='Authentication' />}>
            <Button onPress={onOpenMailSignIn} style={styles.button}>
                <Text>Sign in with Email</Text>
            </Button>
            <Button onPress={onGithubSignIn} style={styles.button} >
                <Text>Github</Text>
            </Button>
            <Button onPress={onGoogleSignIn} style={styles.button} >
                <Text>Google</Text>
            </Button>
        </ScreenContainer>
    )
}