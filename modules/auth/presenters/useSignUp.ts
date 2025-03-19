import { useSignUp as useClerkSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { emailAuthModel } from "../entities/EmailAuthModel";
import { useState } from "react";

export const useSignUp = () => {
    const router = useRouter();
    const { isLoaded, signUp } = useClerkSignUp();
    const { emailAddress, password } = emailAuthModel.useEmailAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSignUpPress = async () => {
        if (!isLoaded) return;
        try {
            setIsLoading(true);
            setError('');
            await signUp.create({ emailAddress, password });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            router.navigate('/(auth)/sign-up-verification');
        } catch (error: any) {
            setError(error?.errors?.[0]?.longMessage);
            console.error(JSON.stringify(error, null, 2));
        } finally {
            setIsLoading(false);
        };
    };

    const setEmailAddress = (value: string) => {
        emailAuthModel.emailAddress = value
    };

    const setPassword = (value: string) => {
        emailAuthModel.password = value
    };

    return { router, isLoading, error, emailAddress, password, setEmailAddress, setPassword, onSignUpPress };
};