import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { ArrowLeftCircle } from "lucide-react";

interface profileProps{
    coverImage: string;
    profileImage: string;
    userName: string;
    userDesc: string;
    nameApiary: string;
    numHives: number;
}

export default function publicProfile({coverImage, profileImage, userName, userDesc, nameApiary, numHives}: profileProps){

    userName = 'Laís Teixeira de Freitas'

    return(
        <div className={styles.main}>

            {/* FOTO DE CAPA */}
            <div className={styles.cover}>
                <div className={styles.imageContainer}>
                    <Image
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
                    src={profileImage}
                    alt="Foto de capa do usuário"
                    layout="full"
                    className={styles.img}
                    />
                </div>
                <p className={styles.nameProfile}>{userName}</p>
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
                    <h1 className={styles.titleFarm}>Apiário</h1>
                    <p className={styles.nameFarm}>Nome do apiário: {nameApiary}
                    </p>
                    <p className={styles.hecFarm}>Colméias disponíveis: {JSON.stringify(numHives)}
                    </p>

                    <div className={styles.map}>
                              {/* Campo de busca para o endereço */}
                    <div id="search-box">
                        <input type="text" className={styles.searchInput} id="address" placeholder="Digite o endereço ou localização aproximada" />
                        <button id="search-btn" className={styles.searchBtn}>Buscar</button>
                    </div>

                    {/* Div onde o mapa será renderizado */}
                    <div id="map" className={styles.map}>
                        
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}