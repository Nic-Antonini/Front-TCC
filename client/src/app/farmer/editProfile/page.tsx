'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import {Upload} from 'lucide-react';
import { useState, ChangeEvent } from "react";
type ImageType = 'profile' | 'cover';

export default function editProfile(){
 
    const [profileImage, setProfileImage] = useState<string>('/default-profile.png'); // Imagem padrão
    const [coverImage, setCoverImage] = useState<string>('/default-cover.png');
  
    const handleDrop = (
      acceptedFiles: File[],
      type: ImageType
    ) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const result = reader.result as string;
        if (type === 'profile') setProfileImage(result);
        else if (type === 'cover') setCoverImage(result);
      };
  
      reader.readAsDataURL(file);
    };

    return(
        <main className={styles.main}>
            <div className={styles.cover}>
                <Dropzone onDrop={(files: File[], _: FileRejection[], __: DropEvent) => handleDrop(files, 'cover')}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.imageContainer}>
                        <input {...getInputProps()} />
                        <Image src={coverImage} alt="Cover Image" layout="fill" />
                        <Upload color="#ffffff" strokeWidth={2.25} className={styles.uploadIcon}/>
                        </div>
                    )}
                </Dropzone>
            </div>
        </main>
    )
}