// SideBar.tsx
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeftCircleIcon } from "lucide-react";
import ProfileChat from "../profileChat/page";

interface SideBarProps {
    setCurrentChat: (chatId: string) => void;
}

export default function SideBar({ setCurrentChat }: SideBarProps) {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.navBar}>
                <Link href={'/Homepage'} className={styles.backBtn}>
                    <ArrowLeftCircleIcon color="#231F17" size={33}/>
                </Link>

                <div className={styles.divInput}>
                    <input type="text" name="" id="" className={styles.searchInput} />
                    <Search strokeWidth={3} color="#fff" />
                </div>
            </nav>

            <p className={styles.titleSecNavBar}>Conversas</p>
            <hr className={styles.division} />

            <nav className={styles.secondNavBar}>
                {/* Lista de contatos - Atualize os IDs conforme necessário */}
                <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor 1' chatId='nome_do_apicultor_1' setCurrentChat={setCurrentChat} />
                <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor 2' chatId='nome_do_apicultor_2' setCurrentChat={setCurrentChat} />
                <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor 2' chatId='nome_do_apicultor_2' setCurrentChat={setCurrentChat} />
                <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor 2' chatId='nome_do_apicultor_2' setCurrentChat={setCurrentChat} />
                <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor 2' chatId='nome_do_apicultor_2' setCurrentChat={setCurrentChat} />
                <ProfileChat imageAddress='/beekeeper.svg' userName='nome do apicultor 2' chatId='nome_do_apicultor_2' setCurrentChat={setCurrentChat} />
                {/* Adicione mais contatos conforme necessário */}
            </nav>
        </aside>
    );
}
