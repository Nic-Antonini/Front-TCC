import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface props{
    imageAddress: string,
    userName: string,
    chatLink: string,
}

export default function profileChat({imageAddress, userName, chatLink}: props){
    return(
        <div className={styles.a}>
            <div className={styles.profileContainer}>
                <Link href={chatLink} className={styles.link}>
                    <Image src={imageAddress} alt='Foto de perfil do usuário' height={50} width={50} className={styles.profileImg} />
                    <p className={styles.userName}>{userName}</p>
                </Link>
            </div>
            <hr className={styles.division}/>
        </div>
    )
}