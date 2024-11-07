import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface props{
    imageAddress: string;
}

export default function profileChat({imageAddress}: props){
    return(
        <div className={styles.profileContainer}>
            <Image src={imageAddress} alt='Foto de perfil do usuário' height={55} width={55} />
        </div>
    )
}