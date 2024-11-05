import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image"
import {Search, ArrowLeftCircleIcon } from "lucide-react";

export default function SideBar(){
    return(
        <aside className={styles.sidebar}>
        <nav className={styles.navBar}>
            {/* BOTÃO DE VOLTAR E INPUT PARA PROCURAR CONVERSA */}
        </nav>

        <hr className={styles.division} />

        <nav className={styles.secondNavBar}>
            {/*LISTA DE CONVERSAS*/}
        <p className={styles.titleSecNavBar}>Conversas</p> 



        </nav>
    </aside>
    )
}