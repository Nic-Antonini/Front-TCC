'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Sidebar from '../components/sidebar/page';
import Farmer from '../../../Farmer/editProfile/page';
import Beekeeper from '../../../beekeeper/editProfile/page';
import axios from 'axios';
import { Check } from 'lucide-react';
import { UserData } from '../../../types'; // Importa o tipo compartilhado
import { jwtDecode } from 'jwt-decode';

export default function EditProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Usuário não autenticado.');

        // Decodifica o token para obter o userId
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        // Ajuste na URL para pegar o userId
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data.dados;
        setUserData({
          name: user.Usu_NomeCompleto,
          description: user.Usu_Tipo === 1 ? user.Apic_Biografia : user.Agri_Biografia,
          profileImage: user.Usu_Tipo === 1 ? user.Apic_Foto_Perfil : user.Agri_Foto_Perfil,
          profileCover: user.Usu_Tipo === 1 ? user.Apic_Foto_Capa : user.Agri_Foto_Capa,
          userType: user.Usu_Tipo,
          lat: parseFloat(user.lat),
          lng: parseFloat(user.lng),
          city: user.city || 'Desconhecido',
          state: user.state || 'Desconhecido',
          cultivosSelecionados: user.cultivosSelecionados,
          especiesSelecionadas: user.especiesSelecionadas,
          nameFarm: user.nameFarm,
          hectares: parseFloat(user.hectares),
          nameApiary: user.nameApiary,
          availability: user.availability,
        });
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        setErrorMessage('Não foi possível carregar os dados.');
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      if (!userData) return;
      
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Usuário não autenticado.');
  
      // Decodifica o token para obter o userId
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.userId;

      setIsSaving(true);
      if (!userData) return;
  
      // Dados a serem enviados (sem imagens em base64)
      const payload = {
        name: userData.name,
        description: userData.description,
        profileImage: userData.profileImage, // Já atualizado pelo handleDrop no componente filho
        profileCover: userData.profileCover, // Já atualizado pelo handleDrop no componente filho
        userType: userData.userType,
        lat: userData.lat,
        lng: userData.lng,
        city: userData.city,
        state: userData.state,
        cultivosSelecionados: userData.cultivosSelecionados,
        nameFarm: userData.nameFarm,
        hectares: userData.hectares,
        nameApiary: userData.nameApiary,
        availability: userData.availability,
      };
  
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/${userId}`, // Usando o userId na URL
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.data.sucesso) {
        setSuccessMessage('Alterações salvas com sucesso.');
        alert(successMessage);
      } else {
        throw new Error('Erro ao salvar as alterações.');
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      setErrorMessage('Erro ao salvar as alterações.');
    } finally {
      setIsSaving(false);
    }
  };
  

  const handleUpdateUserData = (updatedFields: Partial<UserData>) => {
    setUserData((prev) => (prev ? { ...prev, ...updatedFields } : prev));
  };  

  return (
    <div className={styles.allPage}>
      <div className={styles.secondDiv}>
        <Sidebar />
        {userData ? (
          userData.userType === 1 ? (
            <Beekeeper {...userData} onUpdate={handleUpdateUserData} />
          ) : (
            <Farmer {...userData} onUpdate={handleUpdateUserData} />
          )
        ) : (
          <p>Carregando...</p>
        )}
        <Check
          onClick={handleSaveChanges}
          size={25}
          color="#fff"
          className={`${styles.confirmProfile} ${
            userData?.userType === 1 ? styles.apicultorButton : styles.agricultorButton
          }`}
        />
      </div>
    </div>
  );
}
