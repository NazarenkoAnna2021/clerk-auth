import { useSignIn as useClerkSIgnIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useSignIn = () => {
    const router = useRouter();
    const { signIn, setActive, isLoaded } = useClerkSIgnIn();
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSignInPress = async () => {
        if (!isLoaded) return;
        try {
            setError('');
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')

            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err?.errors?.[0]?.longMessage)
        };
    };
    return { router, error, emailAddress, password, setEmailAddress, setPassword, onSignInPress };
};