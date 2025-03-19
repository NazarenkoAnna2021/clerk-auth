import { FC, useMemo } from 'react'
import { ScreenContainer } from '@/components/screenContainer'
import { MainHeader } from '@/components/mainHeader'
import { MainInput } from '@/components/mainInput'
import { useSignUp } from '../../presenters/useSignUp'
import { Button } from '@/components/nativewindui/Button'
import { Text } from '@/components/nativewindui/Text'
import { getStyles } from './styles'

export const SignUpView: FC = () => {
    const styles = useMemo(() => getStyles(), []);
    const { router, emailAddress, password, setEmailAddress, setPassword, onSignUpPress } = useSignUp();

    return (
        <ScreenContainer headerComponent={<MainHeader title='Sign up' onGoBack={router.back} />}>
            <MainInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email"
                onChangeText={setEmailAddress}
                containerStyle={styles.input}
            />
            <MainInput
                type={'password'}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
                containerStyle={styles.input}
            />
            <Button onPress={onSignUpPress} style={styles.button} >
                <Text>Confirm</Text>
            </Button>
        </ScreenContainer>
    )
}