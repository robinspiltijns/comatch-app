'use client'

import Image from "next/image";
import { useState } from 'react';

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <nav className={`sticky top-0 w-full ${showMenu ? 'bg-black' : 'bg-light-green'}`}>
            <div className={`flex flex-row justify-between align-middle px-5 py-3 border-b-2 ${showMenu ? 'border-white' : 'border-black'}`}>
                {!showMenu && <Image src="/logo.png" alt="comatch-logo" width={62} height={48}/>}
                {showMenu && <Image src="/logo-white.png" alt="comatch-logo" width={62} height={48}/>}
                <button onClick={toggleMenu}>
                    <svg className="h-8 w-8" stroke={showMenu ? 'white' : 'black'}>
                        {!showMenu && <path strokeWidth="3" d="M4 8h24M4 16h24M4 24h24"/>}
                        {showMenu && <path strokeWidth="3" d="M4 8L28 32M4 32L28 8"/>}
                    </svg>
                </button>
            </div>
            {showMenu && (
                <div className={`absolute w-full bg-black`}>
                    <div className="font-mono text-white px-5 py-3 border-b-2">
                        Login
                    </div>
                    <div className="font-mono text-white px-5 py-3">
                        Register
                    </div>
                </div>
            
            )}
        </nav>
    );
}
