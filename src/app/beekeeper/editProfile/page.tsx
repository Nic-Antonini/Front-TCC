'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import axios from "axios";
import { Upload, Check } from 'lucide-react';

type ImageType = 'profile' | 'cover';

interface ProfileProps {
    name: string;
    description: string;
    nameApiary: string;
    availability: number;
}

interface Especie {
    Espe_Id: number;
    Espe_Nome: string;
}

export default function EditProfile({ name, description, nameApiary, availability }: ProfileProps) {
    const [profileImage, setProfileImage] = useState<string>('/apiProfile.svg'); // Imagem padrão do profile
    const [coverImage, setCoverImage] = useState<string>('/default-cover.png'); // Imagem padrão do cover
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para armazenar a mensagem de erro
    const [especies, setEspecies] = useState<Especie[]>([]);

    const handleDrop = (acceptedFiles: File[], type: ImageType) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result as string;
            if (type === 'profile') setProfileImage(result);
            else if (type === 'cover') setCoverImage(result);
        };

        reader.readAsDataURL(file);
        setErrorMessage(null); // Limpar a mensagem de erro se o upload for bem-sucedido
    };

    const handleRejection = (fileRejections: FileRejection[]) => {
        const rejectedFile = fileRejections[0]?.file;
        if (rejectedFile) {
            setErrorMessage(`O formato ${rejectedFile.type} não é suportado. Por favor, use apenas arquivos PNG, JPEG ou JPG.`);
        }
    };

    // Fetch espécies da API
    useEffect(() => {
        const fetchEspecies = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/especie`);
                setEspecies(response.data.dados); // Assuma que o JSON tem uma propriedade "dados"
            } catch (error) {
                console.error('Erro ao buscar especies:', error);
            }
        };

        fetchEspecies();
    }, []);

    return (
        <main className={styles.main}>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>} {/* Mostrar mensagem de erro se houver */}

            <div className={styles.cover}>
                <Dropzone
                    onDrop={(files: File[], fileRejections: FileRejection[], event: DropEvent) => {
                        handleDrop(files, 'cover');
                        handleRejection(fileRejections);
                    }}
                    accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpeg', '.jpg'],
                    }}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.imageContainer}>
                            <input {...getInputProps()} />
                            <Image src={coverImage} alt="Cover Image" layout="fill" className={styles.imgProfile} />
                            <Upload color="#ffffff" strokeWidth={2.25} className={styles.uploadIcon} />
                        </div>
                    )}
                </Dropzone>
            </div>

            <div className={styles.profile}>
                <Dropzone
                    onDrop={(files: File[], fileRejections: FileRejection[], event: DropEvent) => {
                        handleDrop(files, 'profile');
                        handleRejection(fileRejections);
                    }}
                    accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpeg', '.jpg'],
                    }}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.imageContainerProfile}>
                            <input {...getInputProps()} />
                            <Image src={profileImage} alt="Profile Image" layout="fill" className={styles.imgProfile} />
                            <Upload color="#ffffff" strokeWidth={2.25} className={styles.uploadIconProfile} />
                        </div>
                    )}
                </Dropzone>
                <input type="text" name="name" className={styles.nameProfile} placeholder={name} />
            </div>
            <div className={styles.more}>
                <section className={styles.section1}>
                    <div className={styles.descArea}>
                        <p className={styles.descTitle}>Descrição</p>
                        <textarea name="description" id="description" className={styles.description}>{description}</textarea>
                    </div>
                    <div className={styles.speciesArea}>
                        <h1 className={styles.titleSpecies}>
                            Espécies
                        </h1>
                        <div className={styles.species}>
                            {especies.map((especie) => (
                                <div key={especie.Espe_Id} className={styles.specie}>
                                    <input type="checkbox" className={styles.checkbox} />
                                    <p>{especie.Espe_Nome}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <div className={styles.farm}>
                    <h1 className={styles.titleFarm}>Apiário</h1>
                    <p className={styles.nameFarm}>Nome do apiário: 
                        <input type="text" name="nameFarm" className={styles.nameFarmEdit} placeholder={nameApiary}/> 
                    </p>
                    <p className={styles.hecFarm}>Colméias disponíveis: 
                        <input type="number" name="hecFarm" className={styles.hecFarmEdit} placeholder={JSON.stringify(availability)}/>
                    </p>

                    <div className={styles.map}>
                        {/* Campo de busca para o endereço */}
                        <div id="search-box">
                            <input type="text" className={styles.searchInput} id="address" placeholder="Digite o endereço ou localização aproximada" />
                            <button id="search-btn" className={styles.searchBtn}>Buscar</button>
                        </div>

                        {/* Div onde o mapa será renderizado */}
                        <div id="map" className={styles.map}></div>
                    </div>
                </div>
            </div>
            <Check size={25} color="#fff" className={styles.confirmProfile}/>
        </main>
    );
}
