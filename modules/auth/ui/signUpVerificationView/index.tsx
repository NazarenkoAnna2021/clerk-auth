import { FC, useMemo } from 'react'
import { ScreenContainer } from '@/components/screenContainer'
import { MainHeader } from '@/components/mainHeader'
import { MainInput } from '@/components/mainInput'
import { Button } from '@/components/nativewindui/Button'
import { Text } from '@/components/nativewindui/Text'
import { getStyles } from './styles'
import { useSignUpVerification } from '../../presenters/useSignUpVerification'
import { ActivityIndicator } from 'react-native'
import { useUiContext } from '@/UIProvider'

export const SignUpVerificationView: FC = () => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(), []);
    const { router, isLoading, error, code, setCode, onVerifyPress } = useSignUpVerification();

    return (
        <ScreenContainer headerComponent={<MainHeader title='Sign up' onGoBack={router.back} />}>
            <MainInput
                autoCapitalize="none"
                value={code}
                placeholder="Code"
                onChangeText={setCode}
                containerStyle={styles.input}
            />
            <Text style={{ color: colors.destructive, textAlign: 'center', }}>{error}</Text>
            <Button disabled={isLoading} variant={isLoading ? 'tonal' : 'primary'} onPress={onVerifyPress} style={styles.button} >
                {isLoading
                    ? <ActivityIndicator color={colors.primary} size={'small'} />
                    : <Text>Verify</Text>
                }
            </Button>
        </ScreenContainer>
    )
}