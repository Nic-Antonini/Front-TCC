"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";  // Importando para capturar os parâmetros da URL
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { ArrowLeftCircle } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { Libraries } from "@react-google-maps/api";
import { jwtDecode } from "jwt-decode";  // Para decodificar o token

interface ProfileProps {
  coverImage: string;
  profileImage: string;
  name: string;
  description: string;
  nameApiary: string;
  availability: number;
  especiesSelecionadas: number[];
  lat: number;
  lng: number;
}

interface Especie {
  Espe_Id: number;
  Espe_Nome: string;
}

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "15px",
};

const libraries: Libraries = ["places"];

export default function Profile() {
  const { userId } = useParams(); // Captura o userId da URL
  const userIdString = Array.isArray(userId) ? userId[0] : userId;
  const [profileData, setProfileData] = useState<ProfileProps | null>(null);
  const [selectedEspecies, setSelectedEspecies] = useState<Especie[]>([]);
  const [location, setLocation] = useState({ lat: -15.7942, lng: -47.8822 });
  const [error, setError] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false); // Estado para o checkbox
  const [connectionId, setConnectionId] = useState<number | null>(null); // Armazena o ID da conexão
  const mapRef = useRef<google.maps.Map | null>(null);

  const token = localStorage.getItem("token");
  const loggedUserId = token ? (jwtDecode(token) as any).userId : null;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!userIdString || !loggedUserId) return;

        // Fetch profile data
        const profileResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/${userIdString}`
        );
        const data = profileResponse.data.dados;
        setProfileData({
          name: data.Usu_NomeCompleto,
          description: data.Apic_Biografia || "Descrição não fornecida",
          profileImage: data.profileImage || "/default-profile.png",
          coverImage: data.profileCover || "/default-cover.png",
          nameApiary: data.nameApiary || "Apiário não especificado",
          availability: data.availability || 0,
          lat: data.lat || -15.7942,
          lng: data.lng || -47.8822,
          especiesSelecionadas: data.especiesSelecionadas || [],
        });
        setLocation({
          lat: parseFloat(data.lat) || -15.7942,
          lng: parseFloat(data.lng) || -47.8822,
        });

        // Check connection
        const connectionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/conexao`,
          {
            params: { Usu_Id_segue: loggedUserId, Usu_Id_seguindo: userIdString },
          }
        );

        if (connectionResponse.data.sucesso && connectionResponse.data.dados) {
          setIsChecked(true);
          setConnectionId(connectionResponse.data.dados.Con_Id);
        }

        // Fetch species
        const especiesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/especie`
        );
        const allEspecies: Especie[] = especiesResponse.data.dados || [];
        const filteredEspecies = allEspecies.filter((especie) =>
          data.especiesSelecionadas.includes(especie.Espe_Id)
        );
        setSelectedEspecies(filteredEspecies);
      } catch (error) {
        console.error("Erro ao carregar os dados do perfil público:", error);
        setError("Erro ao carregar os dados do perfil público.");
      }
    };

    fetchProfileData();
  }, [userIdString, loggedUserId]);

  const handleCheckboxChange = async () => {
    try {
      if (!loggedUserId || !userIdString) return;

      if (!isChecked) {
        // Adicionar conexão
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/conexao`, {
          Usu_Id_segue: loggedUserId,
          Usu_Id_seguindo: parseInt(userIdString),
        });
        setConnectionId(response.data.dados);
        setIsChecked(true);
      } else if (connectionId) {
        // Remover conexão
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/conexao/${connectionId}`);
        setConnectionId(null);
        setIsChecked(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar a conexão:", error);
    }
  };

  
  const handleSendMessage = async () => {
    try {
      // 1. Verificar se o Apicultor existe com o userIdString
      const apicResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/apicultor/${userIdString}`)   // Passando Usu_Id para pegar Apic_Id do Apicultor
  
      if (!apicResponse.data.dados) {
        alert("Apicultor não encontrado.");
        return;
      }
      const Apic_Id = apicResponse.data.dados.Apic_Id;  // Recupera o Apic_Id
  
      // 2. Verificar se o Agricultor existe com o loggedUserId
      const agriResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/agricultor/${loggedUserId}`);
  
      if (!agriResponse.data.dados) {
        alert("Agricultor não encontrado.");
        return;
      }
      const Agri_Id = agriResponse.data.dados.Agri_Id;  // Recupera o Agri_Id
  
      // 3. Formatar a data corretamente
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
      // 4. Verificar se já existe uma conversa
      const chatResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/chat`, {
        params: { Agri_Id: Agri_Id, Apic_Id: Apic_Id },
      });
  
      if (chatResponse.data.dados.length > 0) {
        // Se já existir uma conversa, redireciona para o chat
        const existingChat = chatResponse.data.dados[0];
        window.location.href = `/Homepage/Chat?chatId=${existingChat.Chat_Id}`;
      } else {
        // 5. Se não houver conversa, criar um novo chat
        const newChatResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/chat`, {
          Chat_Mensagem: "Início da conversa",
          Chat_Visto: false,
          Apic_Id: Apic_Id,  // Apicultor
          Agri_Id: Agri_Id,  // Agricultor
          Chat_Ativo: 1,
          Chat_Dta_Hora: currentDate,  // Data no formato correto
        });
  
        // 6. Redireciona para o novo chat
        window.location.href = `/Homepage/Chat?chatId=${newChatResponse.data.dados}`;
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar a mensagem.");
    }
  };
  

  if (!profileData) return <p>Carregando...</p>;

  return (
    <div className={styles.main}>
      {/* FOTO DE CAPA */}
      <div className={styles.cover}>
        <div className={styles.imageContainer}>
          <Image
            width={1200}
            height={300}
            src={profileData.coverImage}
            alt="Foto de capa do usuário"
            className={styles.img}
          />
        </div>
      </div>

      {/* FOTO DE PERFIL + O NOME DE PERFIL */}
      <div className={styles.profile}>
        <div className={styles.imageContainerProfile}>
          <Image
            width={200}
            height={200}
            src={profileData.profileImage}
            alt="Foto de perfil do usuário"
            className={styles.img}
          />
        </div>
        <p className={styles.nameProfile}>{profileData.name}</p>
        <label className={styles.container}>
          <input
            className={styles.input}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <svg
            className={styles.svg}
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g>
                <path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521 c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506 c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625 c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191 s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586 s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path>
              </g>
            </g>
          </svg>
        </label>
        <button className={styles.chatBtn} onClick={handleSendMessage}>
          Enviar mensagem
        </button>
      </div>

      <div className={styles.more}>
        <section className={styles.section1}>
          <div className={styles.descArea}>
            <p className={styles.descTitle}>Descrição</p>
            <p className={styles.description}>{profileData.description}</p>
          </div>
          <div className={styles.speciesArea}>
            <h1 className={styles.titleSpecies}>Espécies</h1>
            <div className={styles.species}>
              {selectedEspecies.map((especie) => (
                <div key={especie.Espe_Id} className={styles.specie}>
                  <p>{especie.Espe_Nome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className={styles.farm}>
          <h1 className={styles.titleFarm}>Apiário</h1>
          <p className={styles.nameFarm}>Nome do apiário: {profileData.nameApiary}</p>
          <p className={styles.hecFarm}>Colmeias disponíveis: {profileData.availability}</p>

          <div className={styles.map}>
            {/* Div onde o mapa será renderizado */}
            <LoadScript
              googleMapsApiKey={"AIzaSyCmwSFKGgAId-Qegv1-EMff3WFG4Y0mokI"}
              libraries={libraries}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={15}
                mapTypeId="hybrid"
                onLoad={(map) => {
                  mapRef.current = map;
                }}
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
      <Link href={"/Homepage"}>
        <ArrowLeftCircle size={35} color="#fff" className={styles.backBtn} />
      </Link>
    </div>
  );
}
