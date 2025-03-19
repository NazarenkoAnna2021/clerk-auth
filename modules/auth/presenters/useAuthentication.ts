import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser'

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
};

WebBrowser.maybeCompleteAuthSession();

export const useAuthentication = () => {
    useWarmUpBrowser();
    const router = useRouter();
    const { startSSOFlow } = useSSO();

    const onSSOSignIn = async (strategy: 'oauth_github' | 'oauth_google') => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy });
            if (createdSessionId) {
                setActive!({ session: createdSessionId })
            };
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        };
    };

    const onGithubSignIn = async () => {
        await onSSOSignIn('oauth_github');
    };

    const onGoogleSignIn = async () => {
        await onSSOSignIn('oauth_google');
    };

    const onOpenMailSignIn = () => {
        router.navigate('/(auth)/sign-in');
    };

    return { router, onGithubSignIn, onGoogleSignIn, onOpenMailSignIn };
};