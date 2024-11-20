'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Sidebar from '../components/sidebar/page';
import Farmer from '../../../Farmer/editProfile/page';
import Beekeeper from '../../../beekeeper/editProfile/page';
import { jwtDecode } from 'jwt-decode' // Biblioteca para decodificar o token
import axios from 'axios';

interface UserData {
    name: string;
    description: string;
    profileImage: string;
    profileCover: string;
    userType: number; // 1 = Apicultor, 2 = Agricultor
}

export default function EditProfile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        // Função para carregar os dados do usuário logado
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Usuário não autenticado.');
                }

                // Decodificar o token JWT para obter o Usu_Id e Usu_Tipo
                const decodedToken: any = jwtDecode(token);
                const userId = decodedToken.userId; // ID do usuário logado
                const userType = decodedToken.userType; // Tipo de usuário

                // Buscar dados do usuário do back-end
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const { Usu_NomeCompleto, Agri_Biografia, Agri_Foto_Perfil, Agri_Foto_Capa, Apic_Biografia, Apic_Foto_Perfil, Apic_Foto_Capa } =
                    response.data.dados;

                // Definir os dados do usuário com base no tipo
                if (userType === 1) {
                    // Apicultor
                    setUserData({
                        name: Usu_NomeCompleto,
                        description: Apic_Biografia || '',
                        profileImage: Apic_Foto_Perfil,
                        profileCover: Apic_Foto_Capa,
                        userType
                    });
                } else if (userType === 2) {
                    // Agricultor
                    setUserData({
                        name: Usu_NomeCompleto,
                        description: Agri_Biografia || '',
                        profileImage: Agri_Foto_Perfil,
                        profileCover: Agri_Foto_Capa,
                        userType
                    });
                }
            } catch (error: any) {
                console.error('Erro ao carregar os dados do usuário:', error);
                setErrorMessage('Não foi possível carregar os dados do usuário. Tente novamente mais tarde.');
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <Sidebar />
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                {userData ? (
                    userData.userType === 1 ? (
                        <Beekeeper
                            name={userData.name}
                            description={userData.description}
                            profileImage={userData.profileImage}
                            profileCover={userData.profileCover}
                        />
                    ) : (
                        <Farmer
                            name={userData.name}
                            description={userData.description}
                            profileImage={userData.profileImage}
                            profileCover={userData.profileCover}
                        />
                    )
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </div>
    );
}
