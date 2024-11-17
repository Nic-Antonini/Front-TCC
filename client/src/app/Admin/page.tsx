'use client'
import { useState } from 'react';
import styles from './page.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: 'apicultor' | 'agricultor';  // Tipo de conta
}

const AdminPage = () => {
  const [user, setUser] = useState<User>({
    id: '123',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    password: 'senha123',
    userType: 'apicultor',  // Tipo de conta inicial
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User updated:', user);
    // Aqui você pode fazer a lógica para atualizar o usuário no backend
  };

  return (
    <div className={styles.body}>
        <div className={styles.adminContainer}>
            <h1 className={styles.heading}>Área do administrador</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Senha:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    </div>
                <div className={styles.formGroup}>
                    <label htmlFor="userType" className={styles.label}>Tipo de Conta:</label>
                    <select
                        id="userType"
                        name="userType"
                        value={user.userType}
                        onChange={handleInputChange}
                        className={styles.input}
                    >
                        <option value="apicultor">Apicultor</option>
                        <option value="agricultor">Agricultor</option>
                    </select>
                </div>
                <button type="submit" className={styles.submitButton}>Salvar alterações</button>
            </form>
        </div>
    </div>
  );
};

export default AdminPage;
