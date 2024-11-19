'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    accountType: string;
}

export default function Cadastro() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: ''
    });
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificando se as senhas coincidem
        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            // Enviando os dados de cadastro para a API usando Axios
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios`, {
                Usu_NomeCompleto: formData.name,
                Usu_Email: formData.email,
                Usu_Senha: formData.password,
                Usu_Tipo: formData.accountType === 'Apicultor' ? 1 : 2, // Apicultor = 1, Agricultor = 2
            });

            // Se o cadastro for bem-sucedido
            alert("Cadastro realizado com sucesso!");
            // Redireciona para o login ou outra página
            router.push('/Login');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Erro ao cadastrar. Tente novamente!');
        }
    };

    return (
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
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        id="name"
                        placeholder="Insira seu nome completo"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Insira seu e-mail"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Insira sua senha"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirme sua senha"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <div className={styles.options}>
                        <p className={styles.textOptions}>Você é um:</p>
                        <label className={styles.textOptions}>
                            <input
                                type="radio"
                                name="typeAccount"
                                value="Apicultor"
                                checked={formData.accountType === 'Apicultor'}
                                onChange={() => setFormData({ ...formData, accountType: 'Apicultor' })}
                            /> Apicultor
                        </label>
                        <label className={styles.textOptions}>
                            <input
                                type="radio"
                                name="typeAccount"
                                value="Agricultor"
                                checked={formData.accountType === 'Agricultor'}
                                onChange={() => setFormData({ ...formData, accountType: 'Agricultor' })}
                            /> Agricultor
                        </label>
                    </div>
                    <div className={styles.footerContainer}>
                        <button type="submit" className={styles.btn}>Cadastrar</button>
                        <Link className={styles.link} href="/Login">Já possui conta? Entre aqui</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
