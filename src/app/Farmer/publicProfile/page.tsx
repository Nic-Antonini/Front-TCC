"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { ArrowLeftCircle } from "lucide-react";

interface profileProps{
    coverImage: string;
    profileImage: string;
    userName: string;
    userDesc: string;
    nameProperty: string;
    numHec: number;
}

export default function publicProfile({coverImage, profileImage, userName, userDesc, nameProperty, numHec}: profileProps){

    userName = 'Nome do agricultor'
    profileImage = '/farmer.svg'
    coverImage = '/default-cover.png'
    userDesc = 'Descrição......'
    nameProperty = 'Nome da propriedade'
    numHec = 21

    useEffect(() => {
        const initMap = () => {
          // Inicializa o mapa centrado nas coordenadas fornecidas
          const initialLocation = { lat: -21.9385624, lng: -50.5269037 };
          const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
            center: initialLocation,
            zoom: 17.25, // Nível de zoom desejado
          });
    
          const geocoder = new google.maps.Geocoder();
    
          // Coloca um marcador na localização inicial
          const marker = new google.maps.Marker({
            map: map,
            position: initialLocation,
          });
    
          // Evento para buscar a localização quando o botão é clicado
          document.getElementById('search-btn')?.addEventListener('click', () => {
            const address = (document.getElementById('address') as HTMLInputElement).value;
            geocoder.geocode({ address }, (results, status) => {
              if (status === 'OK') {
                map.setCenter(results[0].geometry.location);
    
                // Coloca um marcador no endereço encontrado
                const newMarker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                });
              } else {
                alert('Geocode não foi bem-sucedido: ' + status);
              }
            });
          });
        };
    
        if (typeof window !== 'undefined') {
          // Carregar o script do Google Maps
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAfFGULetLC2YCwaOZsFZSmsm135I5f2jQ&callback=initMap`;
          script.defer = true;
          script.async = true;
          document.head.appendChild(script);
    
          // Define a função global para o callback
          (window as any).initMap = initMap;
        }
      }, []);

    return(
        <div className={styles.main}>

            {/* FOTO DE CAPA */}
            <div className={styles.cover}>
                <div className={styles.imageContainer}>
                    <Image
                    width={1200}
                    height={300}
                    src={coverImage}
                    alt="Foto de capa do usuário"
                    layout="full"
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
                    src={profileImage}
                    alt="Foto de capa do usuário"
                    layout="full"
                    className={styles.img}
                    />
                </div>
                <p className={styles.nameProfile}>{userName}</p>
                <label className={styles.container}>
                    <input className={styles.input} type="checkbox"/>
                    <svg className={styles.svg} height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g></svg>
                </label>
                <button className={styles.chatBtn}><Link href={'/Homepage/Chat'} className={styles.chatLink}>Enviar mensagem</Link></button>
            </div>

            <div className={styles.more}>
            <section className={styles.section1}>
                    <div className={styles.descArea}>
                        <p className={styles.descTitle}>Descrição</p>
                        <p className={styles.description}>{userDesc}</p>
                    </div>
                    <div className={styles.speciesArea}>
                        <h1 className={styles.titleSpecies}>
                            Espécies
                        </h1>
                        <div className={styles.species}>
                            <div className={styles.specie}>
                                <p>
                                    Uruçu
                                </p>
                            </div>
                            <div className={styles.specie}>
                                <p>
                                    Mandaçaia
                                </p>
                            </div>
                            <div className={styles.specie}>
                                <p>
                                    Jataí
                                </p>
                            </div>
                            <div className={styles.specie}>
                                <p>
                                    Manduri
                                </p>
                            </div>
                            <div className={styles.specie}>
                                <p>
                                    Bugia
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={styles.farm}>
                    <h1 className={styles.titleFarm}>Propriedade</h1>
                    <p className={styles.nameFarm}>Nome da propriedade: {nameProperty}
                    </p>
                    <p className={styles.hecFarm}>Hectares de plantação: {JSON.stringify(numHec)}
                    </p>

                    <div className={styles.map}>

                    {/* Div onde o mapa será renderizado */}
                    <div id="map" className={styles.map}>
                        
                    </div>
                    </div>
                </div>
            </div>
            <Link href={'/Homepage'}><ArrowLeftCircle size={35} color="#fff" className={styles.backBtn}/></Link>
        </div>
    )
}