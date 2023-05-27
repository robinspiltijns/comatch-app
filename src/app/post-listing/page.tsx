'use client'

import GoogleSignIn from "@/components/GoogleSignIn"
import { auth } from "@/lib/firebase"
import { useState } from "react"

const initialAuthState = auth.currentUser

export default function PostListing() {
    const [authState, setAuthState] = useState(initialAuthState)
    auth.onAuthStateChanged(autState => {
        setAuthState(autState)
    })

    return (
        <div>
            <h2 className="font-mono text-2xl py-2 px-5 border-b-2 border-dotted">
                Place listing
            </h2>
            <div className="p-5">
                {authState == null && (<GoogleSignIn/>)}
                {authState != null && (<div>To add flow for posting cohouse.</div>)}
            </div>
        </div>
    )
}