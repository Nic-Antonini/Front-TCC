import styles from './page.module.css';
import Link from "next/link";
import Image from "next/image";

export default function login(){
    return(
        <div className={styles.main}>
            <div className={styles.loginContainer}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.titleLogin}>
                    Entre na <span className={styles.span}>BeeTech</span>
                    </h1>
                    <h2 className={styles.subtitleLogin}>
                    Preencha os dados corretamente para entrar na BeeTech:
                    </h2>
                </div>
                <input type="email" id='email' placeholder='Insira seu e-mail' className={styles.input}/>
                <input type="password" id='password' placeholder='Insira sua senha' className={styles.input}/>
                <div className={styles.extra}>
                <p className={styles.text}> <input type="checkbox" name="rememberMe" id="rememberMe" className={styles.check} /> Manter-me conectado </p>
                <Link href={'/'} className={styles.link}>Esqueci a senha</Link>
                </div>
                <input type="button" value="Entrar" className={styles.btn} />
                <Link className={styles.link} href={'/'}>Não possui conta? Cadastre-se</Link>
            </div>
        </div>
    )
} 