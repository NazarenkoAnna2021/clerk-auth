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
import { ActivityIndicator } from 'react-native'

export const SignInView = () => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(), []);
    const { router, isLoading, error, emailAddress, password, setEmailAddress, setPassword, onSignIn } = useSignIn();

    return (
        <ScreenContainer headerComponent={<MainHeader onGoBack={router.back} title='Sign in' />}>
            <MainInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email"
                keyboardType={'email-address'}
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
                secureTextEntry
            />
            <Text style={{ color: colors.destructive, textAlign: 'center', }}>{error}</Text>
            <Button disabled={isLoading} variant={isLoading ? 'tonal' : 'primary'} style={styles.button} onPress={onSignIn} >
                {isLoading
                    ? <ActivityIndicator color={colors.primary} size={'small'} />
                    : <Text>Confirm</Text>
                }
            </Button>
            <MainLink title={'Don\'t have an account?'} linkText={'Sign up'} href={'/sign-up'} />
        </ScreenContainer>
    )
}