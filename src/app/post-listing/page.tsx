import GoogleSignIn from "@/components/GoogleSignIn"
import Image from "next/image"

export default function PostListing() {
    return (
        <div className="p-5">
            <h1 className="font-mono text-2xl mb-7">
                Log in or sign up
            </h1>
            <GoogleSignIn/>
        </div>
    )
}