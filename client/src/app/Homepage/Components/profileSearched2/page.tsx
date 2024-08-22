import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from './page.module.css'

interface ProfileProps {
    name: string;
    location: string;
    hectares: number;
    profilePhoto: string;
    cultivation: string;
    pesticides: boolean;
}

function pesticideProfile(){
}


export default function profileSearched2({name, location, hectares, profilePhoto, cultivation, pesticides }: ProfileProps){
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
                    <li className={styles.profileInfo}>Hectares da plantação: {hectares}ha</li>
                    <li className={styles.profileInfo}>Culturas: {cultivation}</li>
                    <li className={styles.profileInfo}>Agrotóxico: {pesticides}</li>
                </ul>
            </Link>
        </div>
    )
}
