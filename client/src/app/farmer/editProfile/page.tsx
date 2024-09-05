'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import { Upload } from 'lucide-react';
import { useState } from "react";

type ImageType = 'profile' | 'cover';

export default function EditProfile() {
    const [profileImage, setProfileImage] = useState<string>('/agriProfile.svg'); // Imagem padrão do perfil
    const [coverImage, setCoverImage] = useState<string>('/default-cover.png'); // Imagem padrão do cover
  
    const handleDrop = (acceptedFiles: File[], type: ImageType) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const result = reader.result as string;
        if (type === 'profile') setProfileImage(result);
        else if (type === 'cover') setCoverImage(result);
      };
  
      reader.readAsDataURL(file);
    };

    return (
        <main className={styles.main}>
            <div className={styles.cover}>
                <Dropzone onDrop={(files: File[], _: FileRejection[], __: DropEvent) => handleDrop(files, 'cover')}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.imageContainer}>
                            <input {...getInputProps()} accept="image/*"/>
                            <Image src={coverImage} alt="Cover Image" layout="fill" className={styles.imgProfile} />
                                <Upload color="#ffffff" strokeWidth={2.25} className={styles.uploadIcon} />
                        </div>
                    )}
                </Dropzone>
            </div>
            <div className={styles.profile}>
                <Dropzone onDrop={(files: File[], _: FileRejection[], __: DropEvent) => handleDrop(files, 'profile')}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className={styles.imageContainerProfile}>
                    <input {...getInputProps()} accept="image/*" />
                    <Image src={profileImage} alt="Profile Image" layout="fill" className={styles.imgProfile}/>
                    <Upload color="#ffffff" strokeWidth={2.25} className={styles.uploadIconProfile} />
                    </div>
                )}
                </Dropzone>
            </div>
        </main>
    );
}
