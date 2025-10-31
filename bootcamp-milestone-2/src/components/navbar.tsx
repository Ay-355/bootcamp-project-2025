import React from "react";
import style from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className={style.navbar}>
            <h1>
                <Link href="index.html">Aryan Sippy</Link>
            </h1>
            <nav>
                <ul className={style.navList}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/blogs">Blogs</Link>
                    </li>
                    <li>
                        <Link href="/portfolio">Portfolio</Link>
                    </li>
                    <li>
                        <Link href="/resume">Resume</Link>
                    </li>
                    <li>
                        <Link href="/about">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
