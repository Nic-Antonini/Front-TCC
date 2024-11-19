import styles from './page.module.css';
import Link from "next/link";

export default function cadastro(){
    return(
        <div className={styles.main}>
            <div className={styles.cadastroContainer}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.titleCadastro}>
                    Cadastre-se na <span className={styles.span}>BeeTech</span>
                    </h1>
                    <h2 className={styles.subtitleCadastro}>
                    Preencha os dados corretamente para criar uma conta na plataforma:
                    </h2>
                </div>
                <input type="text" id='name' placeholder='Insira seu nome completo'  className={styles.input}/>
                <input type="email" id='email' placeholder='Insira seu e-mail' className={styles.input}/>
                <input type="password" id='password' placeholder='Insira sua senha' className={styles.input}/>
                <input type="password" id='password' placeholder='Confirme sua senha' className={styles.input}/>
                <div className={styles.options}>
                <p className={styles.textOptions}>
                    Você é um:
                </p>
                <p className={styles.textOptions}> <input type="radio" name="typeAccount" id="typeAccount" value='Apicultor' /> Apicultor</p>
                <p className={styles.textOptions}> <input type="radio" name="typeAccount" id="typeAccount" value='Agricultor' /> Agricultor</p>

                </div>
                <div className={styles.footerContainer}>
                <input type="button" value="Cadastrar" className={styles.btn} />
                <Link className={styles.link} href={'/Login'}>Já possui conta? Entre aqui</Link>
                </div>
            </div>
        </div>
    )
} 