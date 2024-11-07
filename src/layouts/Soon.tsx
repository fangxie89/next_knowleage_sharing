import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/src/components/Container/NavBar";
import style from './layouts.module.css';

const SoonLayout: FC = () => {
    return (
        <>
         <NavBar />
            <div className={style.centerLayout}>
                <main className={style.soonLayout}>
                <h1>
                    Coming soon...
                </h1>
                <Image src='/constructing.png' alt='constructing' width={500} height={500}/>
                <Link href='/' className={style.backHome}>Back to Home</Link>
                </main>
            </div>
        </>
    )
}

export default SoonLayout;