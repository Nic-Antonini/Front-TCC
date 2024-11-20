'use client';

import { useState } from "react";
import Image from "next/image";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import axios from "axios";
import { Upload, Check } from 'lucide-react';
import styles from "./page.module.css";
import { jwtDecode } from 'jwt-decode';

type ImageType = 'profile' | 'cover';

interface ProfileProps {
    name: string;
    description: string;
    profileImage: string;
    profileCover: string;
}

export default function EditProfile({ name, description, profileImage, profileCover }: ProfileProps) {
    const [currentName, setCurrentName] = useState<string>(name);
    const [currentDescription, setCurrentDescription] = useState<string>(description);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleDrop = (acceptedFiles: File[], type: ImageType) => {
        const file = acceptedFiles[0];
        if (type === 'profile') {
            setProfileImageFile(file);
        } else if (type === 'cover') {
            setCoverImageFile(file);
        }
        setErrorMessage(null); // Limpa mensagens de erro se houver
    };

    const handleRejection = (fileRejections: FileRejection[]) => {
        const rejectedFile = fileRejections[0]?.file;
        if (rejectedFile) {
            setErrorMessage(`O formato ${rejectedFile.type} não é suportado. Por favor, use PNG, JPEG ou JPG.`);
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', currentName);
            formData.append('description', currentDescription);
            
            // Adiciona as imagens, se houver
            if (profileImageFile) formData.append('profileImage', profileImageFile);
            if (coverImageFile) formData.append('coverImage', coverImageFile);
    
            const token = localStorage.getItem('token'); // Recupera o token JWT do localStorage
            if (!token) {
                throw new Error('Usuário não autenticado.');
            }
    
            // Aqui vamos buscar o Agri_Id do token ou passar de alguma outra forma
            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.userId;
    
            // Enviar o PATCH com o Agri_Id que você pegou do token ou contexto
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/agricultor/${userId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            alert('Perfil atualizado com sucesso!');
        } catch (error: any) {
            console.error('Erro ao atualizar o perfil:', error);
            setErrorMessage('Erro ao atualizar o perfil. Tente novamente.');
        }
    };
    

    return (
        <main className={styles.main}>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

            <div className={styles.cover}>
                <Dropzone
                    onDrop={(files, fileRejections) => {
                        handleDrop(files, 'cover');
                        handleRejection(fileRejections);
                    }}
                    accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpeg', '.jpg'],
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.imageContainer}>
                            <input {...getInputProps()} />
                            <Image
                                src={coverImageFile
                                    ? URL.createObjectURL(coverImageFile) 
                                    : `${process.env.NEXT_PUBLIC_BASE_URL}/upload/profileCover/${profileCover}`} // Caminho correto para o servidor back-end
                                alt="Cover"
                                fill
                                className={styles.imgProfile}
                            />
                            <Upload color="#ffffff" strokeWidth={2.25} className={styles.uploadIcon} />
                        </div>
                    )}
                </Dropzone>
            </div>

            <div className={styles.profile}>
                <Dropzone
                    onDrop={(files, fileRejections) => {
                        handleDrop(files, 'profile');
                        handleRejection(fileRejections);
                    }}
                    accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpeg', '.jpg'],
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.imageContainerProfile}>
                            <input {...getInputProps()} />
                            <Image
                                src={profileImageFile 
                                    ? URL.createObjectURL(profileImageFile) 
                                    : `${process.env.NEXT_PUBLIC_BASE_URL}/upload/profileImage/${profileImage}`} // Caminho correto para o servidor back-end
                                alt="Profile"
                                fill
                                className={styles.imgProfile}
                            />
                            <Upload color="#ffffff" strokeWidth={2.25} className={styles.uploadIconProfile} />
                        </div>
                    )}
                </Dropzone>
                <input
                    type="text"
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                    className={styles.nameProfile}
                    placeholder="Nome"
                />
            </div>

            <div className={styles.more}>
                <section className={styles.section1}>
                    <div className={styles.descArea}>
                        <p className={styles.descTitle}>Descrição</p>
                        <textarea
                            value={currentDescription}
                            onChange={(e) => setCurrentDescription(e.target.value)}
                            className={styles.description}
                        />
                    </div>
                </section>
            </div>

            <Check
                size={25}
                color="#fff"
                className={styles.confirmProfile}
                onClick={handleSubmit}
            />
        </main>
    );
}
