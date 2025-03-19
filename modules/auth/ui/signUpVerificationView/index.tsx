import { FC, useMemo } from 'react'
import { ScreenContainer } from '@/components/screenContainer'
import { MainHeader } from '@/components/mainHeader'
import { MainInput } from '@/components/mainInput'
import { Button } from '@/components/nativewindui/Button'
import { Text } from '@/components/nativewindui/Text'
import { getStyles } from './styles'
import { useSignUpVerification } from '../../presenters/useSignUpVerification'

export const SignUpVerificationView: FC = () => {
    const styles = useMemo(() => getStyles(), []);
    const { router, error, code, setCode, onVerifyPress } = useSignUpVerification();

    return (
        <ScreenContainer headerComponent={<MainHeader title='Sign up' onGoBack={router.back} />}>
            <MainInput
                enableErrorMessage
                autoCapitalize="none"
                value={code}
                placeholder="Code"
                onChangeText={setCode}
                containerStyle={styles.input}
                error={error}
            />
            <Button onPress={onVerifyPress} style={styles.button} >
                <Text>Verify</Text>
            </Button>
        </ScreenContainer>
    )
}