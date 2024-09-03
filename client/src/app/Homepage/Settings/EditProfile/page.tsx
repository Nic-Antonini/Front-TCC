import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '../components/sidebar/page'

export default function settings(){
    return(
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <Sidebar />
                <main className={styles.main}>

                </main>
            </div>
        </div>
    )
}