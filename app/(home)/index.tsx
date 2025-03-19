import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router';

export default function Page() {
    return (
        <>
            <SignedIn>
                <Redirect href={'/(tabs)'} />
            </SignedIn>
            <SignedOut>
                <Redirect href={'/(auth)/authentication'} />
            </SignedOut>
        </>
    )
};
