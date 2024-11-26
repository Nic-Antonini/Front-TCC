//EDIT PROFILE
'use client';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Para decodificar o JWT
import Sidebar from '../components/sidebar/page';
import Farmer from '../../../Farmer/editProfile/page';
import Beekeeper from '../../../beekeeper/editProfile/page';
import styles from './page.module.css';

export default function EditProfile() {
    const [userType, setUserType] = useState<number | null>(null);
    const [userData, setUserData] = useState<any>(null); // Armazenando dados do usuário (nome, descrição, etc.)

    useEffect(() => {
        // Verifica se o token JWT está armazenado no localStorage
        const token = localStorage.getItem('token');

        if (token) {
            // Decodifica o token para extrair as informações do usuário
            const decodedToken: any = jwtDecode(token);
            setUserType(decodedToken.userType); // Armazena o tipo de usuário (1 = Apicultor, 2 = Agricultor)

            // Se o token contiver dados adicionais sobre o usuário, armazene-os
            // Aqui você pode armazenar os dados do usuário que vêm do backend, caso o back envie no payload
            setUserData(decodedToken);  // Supondo que o decodedToken contenha todos os dados necessários do usuário
        }
    }, []);

    // Certifique-se de que os dados do usuário estão disponíveis antes de renderizar os componentes
    if (!userData) {
        return <div className={styles.loader}>carregando...</div>; // Caso o usuário não esteja logado ou os dados não tenham sido carregados
    }

    return (
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <Sidebar />
                {/* Passando as props corretamente para os componentes de Apicultor ou Agricultor */}
                {userType === 1 ? (
                    <Beekeeper 
                        name={userData.name}
                        description={userData.description}
                        nameApiary={userData.nameApiary}
                        availability={userData.availability}
                    />
                ) : (
                    <Farmer 
                        name={userData.name}
                        description={userData.description}
                        nameFarm={userData.nameFarm}
                        hectares={userData.hectares}
                    />
                )}
            </div>
        </div>
    );
}


{/* <div className={styles.loader}>carregando...</div> */}