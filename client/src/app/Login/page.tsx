import styles from './page.module.css';
import Link from "next/link";

export default function login(){
    return(
        <div className={styles.main}>
            <div className={styles.loginContainer}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.titleLogin}>
                    Entre na BeeTech
                    </h1>
                    <h2 className={styles.subtitleLogin}>
                    Preencha os dados corretamente para entrar na BeeTech
                    </h2>
                </div>
                <input type="email" id='email' placeholder='Insira seu e-mail'/>
                <input type="password" id='password' placeholder='Insira sua senha'/>
                <div className={styles.extra}>
                Manter-me conectado <input type="checkbox" name="rememberMe" id="rememberMe" />
                <Link href={'/'}>Esqueci a senha</Link>
                </div>
                <input type="button" value="Entrar" />
                <Link href={'/'}>Não possui conta? Cadastre-se</Link>
            </div>
        </div>
    )
} 