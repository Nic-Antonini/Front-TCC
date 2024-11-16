
// ProfileChat.tsx
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface ProfileChatProps {
    imageAddress: string;
    userName: string;
    chatId: string;
    setCurrentChat: (chatId: string) => void;
}

export default function ProfileChat({ imageAddress, userName, chatId, setCurrentChat }: ProfileChatProps) {
    return (
        <div className={styles.a}>
            <div className={styles.profileContainer} onClick={() => setCurrentChat(chatId)}>
                <Image src={imageAddress} alt='Foto de perfil do usuário' height={46} width={46} className={styles.profileImg} />
                <p className={styles.userName}>{userName}</p>
            </div>
            <hr className={styles.division}/>
        </div>
    );
}

