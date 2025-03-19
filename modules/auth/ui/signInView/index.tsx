import React, { useMemo } from 'react'
import { Button } from '@/components/nativewindui/Button'
import { Text } from '@/components/nativewindui/Text'
import { MainInput } from '@/components/mainInput'
import { ScreenContainer } from '@/components/screenContainer'
import { MainHeader } from '@/components/mainHeader'
import { getStyles } from './styles'
import { MainLink } from '@/components/MainLink'
import { useSignIn } from '../../presenters/useSignIn'
import { useUiContext } from '@/UIProvider'

export const SignInView = () => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(), []);
    const { router, error, emailAddress, password, setEmailAddress, setPassword, onSignInPress } = useSignIn();

    return (
        <ScreenContainer headerComponent={<MainHeader onGoBack={router.back} title='Sign in' />}>
            <MainInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email"
                onChangeText={setEmailAddress}
                containerStyle={styles.input}
                error={error}
            />
            <MainInput
                type={'password'}
                value={password}
                placeholder="Password"
                onChangeText={setPassword}
                containerStyle={styles.input}
                error={error}
            />
            <Text style={{ color: colors.destructive, textAlign:'center', }}>{error}</Text>
            <Button style={styles.button} onPress={onSignInPress} >
                <Text>Confirm</Text>
            </Button>
            <MainLink title={'Don\'t have an account?'} linkText={'Sign up'} href={'/sign-up'} />
        </ScreenContainer>
    )
}