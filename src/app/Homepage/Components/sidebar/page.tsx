import React, {useState} from "react";
import style from "./page.module.css";
import Link from "next/link";
import {House, Search, MessageSquare, Settings} from "lucide-react";



export default function Sidebar(){

    
    return(
        <aside className={style.sidebar}>
            <nav className={style.navBar}>
                <Link href={"/Homepage"} className={style.navLink}> <House/> Início </Link>
                <Link href={"/Homepage/SearchArea"} className={style.navLink}> <Search/> Pesquisar </Link>
                <Link href={"/Homepage/Chat"} className={style.navLink}> <MessageSquare/> Chat </Link>
                <Link href={"/Homepage/Settings"} className={style.navLink}> <Settings/> Configurações </Link>
            </nav>

        </aside>
    )
}