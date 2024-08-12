import React from "react";
import style from "./page.module.css";
import Link from "next/link";
import Image from "next/image"
import {House, Search, MessageSquare, Settings} from "lucide-react";

export default function Sidebar(){
    return(
        <aside className={style.sidebar}>
            <nav className={style.navBar}>
                <Link href={"/Homepage"} className={style.navLink}> <House/> Início </Link>
                <Link href={"/AreaSearch"} className={style.navLink}> <Search/> Pesquisar </Link>
                <Link href={"/Chat"} className={style.navLink}> <MessageSquare/> Chat </Link>
                <Link href={"/Settings"} className={style.navLink}> <Settings/> Configurações </Link>
            </nav>

            <hr className={style.division} />

            <nav className={style.secondNavBar}>
                <p className={style.titleSecNavBar}>Últimas conversas</p>

                <Link href={"/Chat/?"} className={style.navChat}>
                    <Image priority
                        src='/apiProfile.svg'
                        width={40}
                        height={40}
                        alt="Foto de perfil de algum usuário"
                        className={style.profileUserChat}/>
                    Nome do usuário
                </Link>

                <Link href={"/Chat/?"} className={style.navChat}>
                    <Image priority
                        src='/apiProfile.svg'
                        width={40}
                        height={40}
                        alt="Foto de perfil de algum usuário"
                        className={style.profileUserChat}/>
                    Nome do usuário
                </Link>
                <Link href={"/Chat/?"} className={style.navChat}>
                    <Image priority
                        src='/apiProfile.svg'
                        width={40}
                        height={40}
                        alt="Foto de perfil de algum usuário"
                        className={style.profileUserChat}/>
                    Nome do usuário
                </Link>

            </nav>
        </aside>
    )
}