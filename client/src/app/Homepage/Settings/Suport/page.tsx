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
                        Suporte
                    </h1>
                <form action="/Homepage/Settings/Suport" className={styles.form}>
                    <input  className={styles.input} type="text" name="name" placeholder='Insira seu nome completo'/>
                    <input className={styles.input} type="email" name="email" placeholder='Insira seu e-mail'/>
                    <input className={styles.input} type="text" name="subject" placeholder='Insira o título do assunto a ser tratado'/>
                    <textarea className={styles.textarea} name="message" placeholder='Insira a sua mensagem'>
                    </textarea>
                    <input className={styles.button} type="submit" value="Enviar"  />
                </form>
                </main>
            </div>
        </div>
    )
}