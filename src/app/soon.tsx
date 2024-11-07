'use client'

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const SoonPage: FC = () => {
    return (
        <div>
            <main>
                <h1>
                    Coming soon...
                </h1>
                <Image src='/constructing.png' alt='constructing'/>
                <Link href='/'>Back to Home</Link>
            </main>
        </div>
    )
}

export default SoonPage;