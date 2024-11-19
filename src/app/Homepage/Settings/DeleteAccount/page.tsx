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
                    Deletar minha conta
                </h1>
                <h2 className={styles.subTitle}>
                   - Todos os dados relacionados à sua conta serão apagados definitivamente; <br />
                   - Não será possível recuperar informações após a exclusão. <br />
                   <br />
                   Tem certeza que deseja excluir a sua conta?
                </h2>
                <input className={styles.button} type="submit" value="Deletar"  />
                </main>
            </div>
        </div>
    )
}