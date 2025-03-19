import { useSignUp as useClerkSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useSignUpVerification = () => {
    const router = useRouter();
    const { isLoaded, signUp, setActive } = useClerkSignUp();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const onVerifyPress = async () => {
        if (!isLoaded) return;
        setError('');
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/');
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
            };
        } catch (error: any) {
            setError(error?.errors?.[0]?.longMessage);
            console.error(JSON.stringify(error, null, 2))
        };
    };

    return { router, error, code, setCode, onVerifyPress };
};