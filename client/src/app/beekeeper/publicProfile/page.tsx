import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { ArrowLeftCircle } from "lucide-react";

interface profileProps{
    coverImage: string;
    profileImage: string;
    userName: string;
    
}

export default function publicProfile({coverImage, profileImage, userName}: profileProps){

    return(
        <div className={styles.main}>

            {/* FOTO DE CAPA */}
            <div className={styles.cover}>
                <div className={styles.imageContainer}>
                    <Image
                    src={coverImage}
                    alt="Foto de capa do usuário"
                    layout="full"
                    className={styles.img}
                    />
                </div>
            </div>

            {/* FOTO DE PERFIL + O NOME DE PERFIL */}
            <div className={styles.profile}>
                <div className={styles.imageContainerProfile}>
                    <Image
                    src={profileImage}
                    alt="Foto de capa do usuário"
                    layout="full"
                    className={styles.img}
                    />
                </div>
                <p>{userName}</p>
            </div>

            <div className={styles.more}>

            </div>

        </div>
    )
}