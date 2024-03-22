"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/lib/AuthProvider";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const authState = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setShowMenu(false);
  }, [pathName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setShowMenu(false);
    auth.signOut();
  };

  return (
    <nav
      className={`z-50 sticky top-0 w-full ${
        showMenu ? "bg-black" : "bg-light-purple"
      }`}
    >
      <div
        className={`flex flex-row justify-between px-5 lg:px-20 py-3 border-b-2 ${
          showMenu ? "border-white" : "border-black"
        }`}
      >
        <Link href="/">
          {!showMenu && (
            <Image
              priority
              src="/logo.png"
              alt="comatch-logo"
              width={62}
              height={48}
            />
          )}
          {showMenu && (
            <Image
              priority
              src="/logo-white.png"
              alt="comatch-logo"
              width={62}
              height={48}
            />
          )}
        </Link>
        <button className="lg:hidden" onClick={toggleMenu}>
          <svg className="h-8 w-8" stroke={showMenu ? "white" : "black"}>
            {!showMenu && <path strokeWidth="3" d="M4 8h24M4 16h24M4 24h24" />}
            {showMenu && <path strokeWidth="3" d="M4 8L28 32M4 32L28 8" />}
          </svg>
        </button>
        <div className="hidden lg:flex lg:flex-row lg:space-x-10 lg:align-middle lg:items-center">
          {authState.type == "AUTHENTICATED" && (
            <div
              onClick={handleLogout}
              className="font-mono cursor-pointer hover:underline"
            >
              Uitloggen
            </div>
          )}
          {authState.type != "AUTHENTICATED" && (
            <Link href="/log-in-or-sign-up">
              <div className="font-mono cursor-pointer hover:underline">
                Inloggen
              </div>
            </Link>
          )}
          {authState.type != "AUTHENTICATED" && (
            <Link href="/log-in-or-sign-up">
              <div className="font-mono cursor-pointer hover:underline">
                Registreren
              </div>
            </Link>
          )}
          <Link href="/post-listing">
            <div className="font-mono cursor-pointer hover:underline">
              Zoekertje plaatsen
            </div>
          </Link>
        </div>
      </div>
      {showMenu && (
        <div className={`absolute w-full bg-black`}>
          {authState.type == "AUTHENTICATED" && (
            <div
              onClick={handleLogout}
              className="cursor-pointer font-mono text-white px-5 py-3"
            >
              Log out
            </div>
          )}
          {authState.type != "AUTHENTICATED" && (
            <div>
              <Link href="/log-in-or-sign-up">
                <div className="font-mono text-white px-5 py-3 border-b-2 border-white">
                  Log in
                </div>
              </Link>
              <Link href="/log-in-or-sign-up">
                <div className="font-mono text-white px-5 py-3">Register</div>
              </Link>
            </div>
          )}
          <Link href="/post-listing">
            <div className="font-mono text-white px-5 py-3 border-t-2 border-white">
              Post cohousing
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
