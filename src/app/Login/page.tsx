'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/login`, {
                email,
                password
            });

            const { token } = response.data;
            // Armazena o token JWT no localStorage
            localStorage.setItem('token', token);

            // Redireciona para o dashboard ou outra página
            router.push('/Homepage');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Email ou senha incorretos.');
        }
    };

    return (
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
                <input
                    type="email"
                    placeholder="Insira seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Insira sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <div className={styles.extra}>
                    <p className={styles.text}>
                        <input
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                            className={styles.check}
                        /> Manter-me conectado
                    </p>
                </div>
                <button onClick={handleLogin} className={styles.btn}>Entrar</button>
                <Link href="/Cadastro" className={styles.link}>
                    Não possui conta? Cadastre-se
                </Link>
            </div>
        </div>
    );
}
