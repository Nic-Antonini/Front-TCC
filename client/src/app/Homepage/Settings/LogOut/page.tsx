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
                <h1 className={styles.title}>
                    Sair da minha conta
                </h1>
                <h2 className={styles.subTitle}>
                   - Você poderá entrar novamente. <br />
                   Tem certeza que deseja sair?
                </h2>
                <input className={styles.button} type="submit" value="Sair"  />
                </main>
            </div>
        </div>
    )
}