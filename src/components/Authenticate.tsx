"use client";

import { auth, googleAuthProvider } from "@/lib/firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

const handleLogin = () => signInWithPopup(auth, googleAuthProvider);

function Authenticate(): JSX.Element {
  // Google OAuth does not support the default Facebook Messenger browser on iPhone.
  useEffect(() => {
    if (window.navigator.userAgent.includes("Messenger"))
      setSupportedUserAgent(false);
  }, []);

  const [supportedUserAgent, setSupportedUserAgent] = useState(true);

  return (
    <div>
      {supportedUserAgent && (
        <button
          onClick={handleLogin}
          className="bg-white border-2 rounded-xl w-full py-3 px-4"
        >
          <div className="flex flex-row items-center relative">
            <Image src="/google.png" alt="google icon" width={25} height={20} />
            <div className="absolute text-center w-full">
              Continue with google
            </div>
          </div>
        </button>
      )}
      {!supportedUserAgent && (
        <div>
          This browser is not supported. Please open this page in your default
          browser.
        </div>
      )}
    </div>
  );
}

export default Authenticate;
