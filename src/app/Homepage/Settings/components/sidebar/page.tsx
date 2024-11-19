import React from "react";
import style from "./page.module.css";
import Link from "next/link";
import Image from "next/image"
import {ChevronLeft} from "lucide-react";

export default function Sidebar(){
    return(
        <aside className={style.sidebar}>
            <div className={style.titleDiv}>
                <Link href={"/Homepage"} className={style.button}><ChevronLeft size={26} strokeWidth={2.5} /></Link> <p className={style.title}>Configurações</p>
            </div>
            <hr className={style.division} />
            <nav className={style.navBar}>
                <Link href={"/Homepage/Settings/Suport"} className={style.navLink}> Suporte </Link>
                <Link href={"/Homepage/Settings/EditProfile"} className={style.navLink}> Editar Perfil </Link>
                <Link href={"/Homepage/Settings/ResetPassword"} className={style.navLink}> Redefinir senha </Link>
                <Link href={"/Homepage/Settings/DeleteAccount"} className={style.navLink}> Deletar minha conta </Link>
                <Link href={"/Homepage/Settings/LogOut"} className={style.navLink}> Sair da conta </Link>
            </nav>
        </aside>
    )
}