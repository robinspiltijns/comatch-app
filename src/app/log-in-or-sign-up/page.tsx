"use client";

import Authenticate from "@/app/_components/Authenticate";
import { AuthContext } from "@/lib/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function LogInOrSignUp() {
  const router = useRouter();
  const authState = useContext(AuthContext);

  useEffect(() => {
    if (authState.type == "AUTHENTICATED") router.push("/");
  }, [authState, router]);

  return (
    <div>
      <h2 className="font-mono text-2xl py-3 px-5 lg:px-20 border-b-2 border-dotted">
        Inloggen of registreren
      </h2>
      <div className="p-5 flex flex-row justify-center">
        <Authenticate />
      </div>
    </div>
  );
}
