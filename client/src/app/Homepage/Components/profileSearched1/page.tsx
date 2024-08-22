import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from './page.module.css'

interface ProfileProps {
    name: string;
    location: string;
    availability: number;
    profilePhoto: string;
    species: string;
}


export default function profileSearched({name, location, availability, profilePhoto, species }: ProfileProps){
    return(
        <div className={styles.profile}>
            <Link href={'/?'} className={styles.profileLink}>
                <Image src={profilePhoto}
                alt="Foto de perfil do usuário buscado"
                width={220}
                height={220}
                className={styles.profilePhoto}
                />
                <ul className={styles.infoList}>
                    <li className={styles.profileName}>{name}</li>
                    <li className={styles.profileInfo}>Proximidade: {location}</li>
                    <li className={styles.profileInfo}>Caixas disponíveis: {availability}</li>
                    <li className={styles.profileInfo}>Espécies de abelha: {species}</li>
                </ul>
            </Link>
        </div>
    )
}
