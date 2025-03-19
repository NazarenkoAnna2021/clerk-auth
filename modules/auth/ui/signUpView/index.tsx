import { FC, useMemo } from 'react'
import { ScreenContainer } from '@/components/screenContainer'
import { MainHeader } from '@/components/mainHeader'
import { MainInput } from '@/components/mainInput'
import { useSignUp } from '../../presenters/useSignUp'
import { Button } from '@/components/nativewindui/Button'
import { Text } from '@/components/nativewindui/Text'
import { getStyles } from './styles'
import { ActivityIndicator } from 'react-native'
import { useUiContext } from '@/UIProvider'

export const SignUpView: FC = () => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(), []);
    const { router, isLoading, error, emailAddress, password, setEmailAddress, setPassword, onSignUpPress } = useSignUp();

    return (
        <ScreenContainer headerComponent={<MainHeader title='Sign up' onGoBack={router.back} />}>
            <MainInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email"
                keyboardType={'email-address'}
                onChangeText={setEmailAddress}
                containerStyle={styles.input}
            />
            <MainInput
                type={'password'}
                value={password}
                placeholder="Password"
                onChangeText={setPassword}
                containerStyle={styles.input}
                secureTextEntry
            />
            <Text style={{ color: colors.destructive, textAlign: 'center', }}>{error}</Text>
            <Button disabled={isLoading} variant={isLoading ? 'tonal' : 'primary'} style={styles.button} onPress={onSignUpPress} >
                {isLoading
                    ? <ActivityIndicator color={colors.primary} size={'small'} />
                    : <Text>Confirm</Text>
                }
            </Button>
        </ScreenContainer>
    )
}