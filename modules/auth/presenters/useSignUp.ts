import { useSignUp as useClerkSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useSignUp = () => {
    const router = useRouter();
    const { isLoaded, signUp } = useClerkSignUp();
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const onSignUpPress = async () => {
        if (!isLoaded) return
        try {
            await signUp.create({
                emailAddress,
                password,
            })
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            router.navigate('/(auth)/sign-up-verification');
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        };
    };


    return { router, emailAddress, password, setEmailAddress, setPassword, onSignUpPress };
};