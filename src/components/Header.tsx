import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-[#202229] text-white">
            <div className="flex items-center">
                <Image width={100} height={100} src="/img/bd71.png" alt="BD71" className="h-10 w-10 mr-2" />
                <Link href="/">
                    <span className="text-xl font-bold">BD71 Esports Tournaments</span>
                </Link>
            </div>
            <nav className="space-x-4">
                <Link href="/add-tournament" className="p-3 bg-amber-700 rounded">Add Tournaments</Link>
                
            </nav>
        </div>
    )
}

export default Header