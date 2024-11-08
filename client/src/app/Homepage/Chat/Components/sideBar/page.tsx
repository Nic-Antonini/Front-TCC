import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image"
import {Search, ArrowLeftCircleIcon } from "lucide-react";
import ProfileChat from "../profileChat/page";

export default function SideBar(){
    return(
        <aside className={styles.sidebar}>
        <nav className={styles.navBar}>

            {/* BOTÃO DE VOLTAR E INPUT PARA PROCURAR CONVERSA */}

            <Link href={'/Homepage'} className={styles.backBtn}>
                <ArrowLeftCircleIcon color="#231F17" size={33}/>
            </Link>

            <div className={styles.divInput}>
                <input type="text" name="" id="" className={styles.searchInput} />
            </div>

        </nav>

        <p className={styles.titleSecNavBar}>Conversas</p> 
        <hr className={styles.division} />

        <nav className={styles.secondNavBar}>
            {/*LISTA DE CONVERSAS*/}
        
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>
        <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor' chatLink=""/>

        </nav>
    </aside>
    )
}