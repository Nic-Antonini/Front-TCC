'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import { Upload, Check} from 'lucide-react';
import { useState } from "react";

type ImageType = 'profile' | 'cover';

interface ProfileProps {
    name: string;
    description: string;
    nameFarm: string;
    location: string;
    hectares: number;
}


export default function EditProfile({name, description, nameFarm, location, hectares}: ProfileProps) {
    const [profileImage, setProfileImage] = useState<string>('/agriProfile.svg'); // Imagem padrão do profile
    const [coverImage, setCoverImage] = useState<string>('/default-cover.png'); // Imagem padrão do cover
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para armazenar a mensagem de erro

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
                            <Image src={profileImage} alt="Profile Image" layout="fill" className={styles.imgProfile}/>
                            <Upload color="#ffffff" strokeWidth={2.25} className={styles.uploadIconProfile} />
                        </div>
                    )}
                </Dropzone>
                <input type="text" name="name" className={styles.nameProfile} placeholder={name}/> 
            </div>
            <div className={styles.more}>
                <section className={styles.section1}>
                    <div className={styles.descArea}>
                        <p className={styles.descTitle}>Descrição</p>
                        <textarea name="description" id="description" className={styles.description}>{description}</textarea>
                    </div>
                    <div className={styles.culturesArea}>
                        <h1 className={styles.titleCultures}>
                            Cultivos
                        </h1>
                        <div className={styles.cultures}>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox} />
                                <p>
                                    cultivo 1
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 2
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 3
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 4
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 5
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 6
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 7
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 8
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 9
                                </p>
                            </div>                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 10
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 11
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 12
                                </p>
                            </div>
                            <div className={styles.culture}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p>
                                    cultivo 13
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={styles.farm}>
                    <h1 className={styles.titleFarm}>Propriedade</h1>
                    <p className={styles.nameFarm}>Nome da propriedade: {nameFarm}</p>
                    <p className={styles.hecFarm}>Hectares de plantação: {hectares}</p>
                </div>
            </div>
            <Check size={25} color="#fff" className={styles.confirmProfile}/>
        </main>
    );
}
