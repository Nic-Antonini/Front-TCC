"use client"
import styles from './page.module.css'
import Image from 'next/image'

export default function apiEdit(){
    return(
        <main className={styles.main}>
            <div className={styles.coverPhoto}>
                <input className={styles.addCover} type="image" />
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

        </main>
    )
}