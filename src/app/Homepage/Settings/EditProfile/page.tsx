'use client'
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Sidebar from '../components/sidebar/page';
import Farmer from '../../../Farmer/editProfile/page';
import Beekeeper from '../../../beekeeper/editProfile/page';
import { jwtDecode } from 'jwt-decode'; // Biblioteca para decodificar o token
import axios from 'axios';

interface UserData {
  name: string;
  description: string;
  profileImage: string;
  profileCover: string;
  userType: number; // 1 = Apicultor, 2 = Agricultor
  nameApiary: string;
  nameFarm: string;
  hectares: number;
  availability: number;
  lat: number;
  lng: number;
  city: string;
  state: string;
  cultivosSelecionados: number[]; // IDs dos cultivos selecionados
  especiesSelecionadas: number[]; // IDs das espécies selecionadas
}

export default function EditProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Usuário não autenticado.');
            }

            // Decodificar o token JWT para obter o Usu_Id
            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.userId; // ID do usuário logado

            // Buscar dados do usuário do back-end
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { 
                Usu_NomeCompleto, 
                Usu_Tipo, 
                Apic_Biografia, 
                Apic_Foto_Perfil, 
                Apic_Foto_Capa, 
                Agri_Biografia, 
                Agri_Foto_Perfil, 
                Agri_Foto_Capa, 
                cultivosSelecionados, 
                especiesSelecionadas, 
                nameFarm, 
                hectares, 
                nameApiary, 
                availability, 
                lat, 
                lng, 
                city, 
                state 
            } = response.data.dados;

            // Garantir que lat e lng sejam números válidos
            const validLat = parseFloat(lat);
            const validLng = parseFloat(lng);
            const validHec = parseFloat(hectares)

            // Verifica se as coordenadas são válidas
            if (isNaN(validLat) || isNaN(validLng)) {
                throw new Error('Coordenadas inválidas');
            }

            console.log('Latitude:', validLat, 'Longitude:', validLng);
            console.log(cultivosSelecionados)
            // Atualizando os dados do usuário
            setUserData({
                name: Usu_NomeCompleto,
                description: Usu_Tipo === 1 ? Apic_Biografia : Agri_Biografia,
                profileImage: Usu_Tipo === 1 ? Apic_Foto_Perfil : Agri_Foto_Perfil,
                profileCover: Usu_Tipo === 1 ? Apic_Foto_Capa : Agri_Foto_Capa,
                userType: Usu_Tipo,
                lat: validLat,
                lng: validLng,
                city: city || 'Desconhecido',  // Usando 'Desconhecido' caso a cidade não venha
                state: state || 'Desconhecido', // Usando 'Desconhecido' caso o estado não venha
                cultivosSelecionados,
                especiesSelecionadas,
                nameFarm,
                hectares: validHec,
                nameApiary,
                availability
            });
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
              lat={userData.lat}
              lng={userData.lng}
              city={userData.city}
              state={userData.state}
              especiesSelecionadas={userData.especiesSelecionadas}
              nameApiary={userData.nameApiary}
              availability={userData.availability}
            />
          ) : (
            <Farmer
              name={userData.name}
              description={userData.description}
              profileImage={userData.profileImage}
              profileCover={userData.profileCover}
              lat={userData.lat}
              lng={userData.lng}
              city={userData.city}
              state={userData.state}
              cultivosSelecionados={userData.cultivosSelecionados}
              nameFarm={userData.nameFarm}
              hectares={userData.hectares}
            />
          )
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}
