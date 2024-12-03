"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { ArrowLeftCircle } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { Libraries } from "@react-google-maps/api";
import { useParams } from "next/navigation";
import {jwtDecode} from "jwt-decode"; // Para decodificar o token JWT

interface ProfileProps {
  coverImage: string;
  profileImage: string;
  userName: string;
  userDesc: string;
  nameProperty: string;
  numHec: number;
  lat: number;
  lng: number;
  cultivosSelecionados: number[];
}

interface Cultivo {
  Cult_Id: number;
  Cult_Nome: string;
}

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "15px",
};

const libraries: Libraries = ["places"];

export default function PublicProfile() {
  const { userId } = useParams();
  const userIdString = Array.isArray(userId) ? userId[0] : userId;
  const [profileData, setProfileData] = useState<ProfileProps | null>(null);
  const [selectedCultivos, setSelectedCultivos] = useState<Cultivo[]>([]);
  const [location, setLocation] = useState({ lat: -15.7942, lng: -47.8822 });
  const [error, setError] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [connectionId, setConnectionId] = useState<number | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const token = localStorage.getItem("token");
  const loggedUserId = token ? (jwtDecode(token) as any).userId : null;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!userIdString || !loggedUserId) {
          setError("ID de usuário ou usuário logado não encontrado.");
          return;
        }

        // Fetch profile data
        const profileResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/${userIdString}`
        );

        const data = profileResponse.data.dados;
        setProfileData({
          userName: data.Usu_NomeCompleto,
          userDesc: data.Agri_Biografia || "Descrição não fornecida",
          profileImage: data.profileImage || "/default-profile.png",
          coverImage: data.profileCover || "/default-cover.png",
          nameProperty: data.nameFarm || "Propriedade não especificada",
          numHec: data.hectares || 0,
          lat: data.lat || -15.7942,
          lng: data.lng || -47.8822,
          cultivosSelecionados: data.cultivosSelecionados || [],
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

        // Fetch cultivos
        const cultivosResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/cultivo`
        );
        const allCultivos: Cultivo[] = cultivosResponse.data.dados || [];
        const filteredCultivos = allCultivos.filter((cultivo) =>
          data.cultivosSelecionados.includes(cultivo.Cult_Id)
        );
        setSelectedCultivos(filteredCultivos);
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
        // Add connection
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/conexao`, {
          Usu_Id_segue: loggedUserId,
          Usu_Id_seguindo: parseInt(userIdString),
        });
        setConnectionId(response.data.dados);
        setIsChecked(true);
        alert("Você agora está seguindo este usuário!");
      } else if (connectionId) {
        // Remove connection
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/conexao/${connectionId}`);
        setConnectionId(null);
        setIsChecked(false);
        alert("Você deixou de seguir este usuário.");
      }
    } catch (error) {
      console.error("Erro ao atualizar a conexão:", error);
      alert("Erro ao atualizar a conexão.");
    }
  };

  if (error) return <p>{error}</p>;
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
        <p className={styles.nameProfile}>{profileData.userName}</p>
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
                <path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path>
              </g>
            </g>
          </svg>
        </label>
        <button className={styles.chatBtn}>
          <Link href={"/Homepage/Chat"} className={styles.chatLink}>
            Enviar mensagem
          </Link>
        </button>
      </div>

      <div className={styles.more}>
        <section className={styles.section1}>
          <div className={styles.descArea}>
            <p className={styles.descTitle}>Descrição</p>
            <p className={styles.description}>{profileData.userDesc}</p>
          </div>
          <div className={styles.speciesArea}>
            <h1 className={styles.titleSpecies}>Cultivos</h1>
            <div className={styles.species}>
              {selectedCultivos.map((cultivo) => (
                <div key={cultivo.Cult_Id} className={styles.specie}>
                  <p>{cultivo.Cult_Nome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className={styles.farm}>
          <h1 className={styles.titleFarm}>Propriedade</h1>
          <p className={styles.nameFarm}>
            Nome da propriedade: {profileData.nameProperty}
          </p>
          <p className={styles.hecFarm}>
            Hectares de plantação: {profileData.numHec}
          </p>
          <div className={styles.map}>
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
