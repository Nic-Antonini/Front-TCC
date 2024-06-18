"use client"
import styles from './page.module.css'
import Image from 'next/image'

export default function apiEdit(){
    return(
        <main className={styles.main}>
            <div className={styles.coverPhoto}>
                <input className={styles.addCover} type="file" />
            </div>
            <div className={styles.profilePhoto}>
                <Image 
                src="ApiProfile.svg"
                alt='Beekeeper icon'
                width={206}
                height={206}
                priority
                />
            </div>
            <div className={styles.infoProfile}>
                <p className={styles.nameProfile}>Laís Teixeira de Freitas</p>
                <p className={styles.localProfile}>Tupã, São Paulo</p>
                
            </div>


        </main>
    )
}