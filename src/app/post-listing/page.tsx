'use client'

import LoadingSpinner from "@/components/LoadingSpinner"
import SignInOrSignUp from "@/components/SignInOrSignUp"
import { useAuth } from "@/lib/hooks/useAuth"

export default function PostListing() {
    const authState = useAuth()

    let body: JSX.Element;

    switch (authState.type) {
        case "LOADING": 
            body = (
                <div className="flex flex-row justify-center">
                    <LoadingSpinner/>
                </div>
            );
            break;
        case "UNAUTHENTICATED":
            body = <SignInOrSignUp/>
            break;
        case "AUTHENTICATED": 
            body = <div>To add flow for posting cohouse.</div>
            break;
        default:
            body = <div>Error: Unknown state</div>; // Or any error state 
    }

    return (
        <div>
            <h2 className="font-mono text-2xl py-2 px-5 border-b-2 border-dotted">
                Place listing
            </h2>
            <div className="p-5">
                {body}
            </div>
        </div>
    )
}
