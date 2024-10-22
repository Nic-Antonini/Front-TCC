import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '../components/sidebar/page'

export default function suport(){
    return(
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <Sidebar />
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Redefinir Senha
                    </h1>
                <form action="/Homepage/Settings/Suport" className={styles.form}>
                    <input  className={styles.input} type="password" name="password" placeholder='Insira sua senha atual'/>
                    <input className={styles.input} type="password" name="passwordConfirm" placeholder='Insira sua nova senha'/>
    
                    <input className={styles.button} type="submit" value="Redefinir"  />
                </form>
                </main>
            </div>
        </div>
    )
}