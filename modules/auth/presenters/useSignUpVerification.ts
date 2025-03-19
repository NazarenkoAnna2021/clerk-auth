import { useSignUp as useClerkSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { emailAuthModel } from "../entities/EmailAuthModel";

export const useSignUpVerification = () => {
    const router = useRouter();
    const { code } = emailAuthModel.useEmailAuth();
    const { isLoaded, signUp, setActive } = useClerkSignUp();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onVerifyPress = async () => {
        if (!isLoaded) return;
        try {
            setIsLoading(true);
            setError('');
            const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/');
                return;
            };
            console.error(JSON.stringify(signUpAttempt, null, 2));
        } catch (error: any) {
            setError(error?.errors?.[0]?.longMessage);
            console.error(JSON.stringify(error, null, 2))
        } finally {
            setIsLoading(false);
        };
    };

    const setCode = (value: string) => {
        emailAuthModel.code = value;
    };

    return { router, isLoading, error, code, setCode, onVerifyPress };
};