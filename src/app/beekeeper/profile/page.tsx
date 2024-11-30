"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { ArrowLeftCircle } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Libraries } from "@react-google-maps/api";

interface ProfileProps {
  name: string;
  description: string;
  nameApiary: string;
  availability: number;
  profileImage: string;
  profileCover: string;
  lat: number | null;
  lng: number | null;
  especiesSelecionados: number[];
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

export default function Profile({
  profileCover,
  profileImage,
  name,
  description,
  nameApiary,
  availability,
  lat,
  lng,
  especiesSelecionados,
}: ProfileProps) {
  const [userData, setUserData] = useState<ProfileProps | null>(null);
  const [location, setLocation] = useState({ lat: lat || -15.7942, lng: lng || -47.8822 });
  const [selectedEspecies, setSelectedEspecies] = useState<Especie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado.");

        const decoded: any = jwtDecode(token);
        const userId = decoded.userId;

        // Busca os dados do usuário no back-end
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = response.data.dados;

        // Atualiza os dados do usuário
        setUserData({
          name: data.Usu_NomeCompleto,
          description: data.Apic_Biografia || "Descrição não fornecida",
          profileImage: data.profileImage || "/default-profile.png",
          profileCover: data.profileCover || "/default-cover.png",
          nameApiary: data.nameApiary || "Apiário não especificado",
          availability: data.availability || 0,
          lat: data.lat || -15.7942,
          lng: data.lng || -47.8822,
          especiesSelecionados: data.especiesSelecionadas || [],
        });

        // Atualiza a localização para o mapa
        setLocation({
          lat: parseFloat(data.lat) || -15.7942,
          lng: parseFloat(data.lng) || -47.8822,
        });

        // Busca todas as espécies disponíveis
        const especiesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/especie`
        );
        const allEspecies: Especie[] = especiesResponse.data.dados || [];

        // Filtra apenas as espécies selecionadas
        const filteredEspecies = allEspecies.filter((especie) =>
          data.especiesSelecionadas.includes(especie.Espe_Id)
        );
        setSelectedEspecies(filteredEspecies);
      } catch (err) {
        console.error("Erro ao carregar os dados do usuário:", err);
        setError("Erro ao carregar os dados do usuário.");
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.main}>
      {/* FOTO DE CAPA */}
      <div className={styles.cover}>
        <div className={styles.imageContainer}>
          <Image
            width={1200}
            height={300}
            src={userData.profileCover}
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
            src={userData.profileImage}
            alt="Foto do perfil do usuário"
            className={styles.img}
          />
        </div>
        <p className={styles.nameProfile}>{userData.name}</p>
      </div>

      <div className={styles.more}>
        <section className={styles.section1}>
          <div className={styles.descArea}>
            <p className={styles.descTitle}>Descrição</p>
            <p className={styles.description}>{userData.description}</p>
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
          <p className={styles.nameFarm}>Nome do apiário: {userData.nameApiary}</p>
          <p className={styles.hecFarm}>Colmeias disponíveis: {userData.availability}</p>

          <div className={styles.map}>
            {/* Div onde o mapa será renderizado */}
            <LoadScript
              googleMapsApiKey={"AIzaSyCmwSFKGgAId-Qegv1-EMff3WFG4Y0mokI"}
              libraries={libraries}
            >
              <div id="map" className={styles.map}>
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
              </div>
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
