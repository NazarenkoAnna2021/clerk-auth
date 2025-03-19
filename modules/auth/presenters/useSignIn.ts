import { useSignIn as useClerkSIgnIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { emailAuthModel } from "../entities/EmailAuthModel";

export const useSignIn = () => {
    const router = useRouter();
    const { signIn, setActive, isLoaded } = useClerkSIgnIn();
    const { emailAddress, password } = emailAuthModel.useEmailAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSignIn = async () => {
        if (!isLoaded) return;
        try {
            setIsLoading(true);
            setError('');
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
                return;
            };
            console.error(JSON.stringify(signInAttempt, null, 2));
        } catch (err: any) {
            setError(err?.errors?.[0]?.longMessage);
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(false);
        };
    };

    const setEmailAddress = (value: string) => {
        emailAuthModel.emailAddress = value;
    };

    const setPassword = (value: string) => {
        emailAuthModel.password = value;
    };

    return { router, isLoading, error, emailAddress, password, setEmailAddress, setPassword, onSignIn };
};