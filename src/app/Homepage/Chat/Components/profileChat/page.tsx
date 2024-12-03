import styles from './page.module.css';
import Image from 'next/image';

interface ProfileChatProps {
  imageAddress: string;
  userName: string;
  chatId: string;
  userId: string;
  setCurrentChat: (chat: CurrentChat | null) => void;
  Apic_Id?: string;
  Agri_Id?: string;
  onProfileChatClick: (chatId: string) => void; // Callback para atualizar a URL
}

interface CurrentChat {
  chatId: string;
  userName: string;
  imageAddress: string;
  userId: string;
  Apic_Id?: string;
  Agri_Id?: string;
}

export default function ProfileChat({ imageAddress, userName, chatId, userId, setCurrentChat, Apic_Id, Agri_Id, onProfileChatClick }: ProfileChatProps) {
  const currentChat: CurrentChat = { chatId, userName, imageAddress, userId, Apic_Id, Agri_Id };

  return (
    <div className={styles.a} onClick={() => { 
      setCurrentChat(currentChat); 
      onProfileChatClick(chatId);  // Atualiza a URL
    }}>
      <div className={styles.profileContainer}>
        <Image
          src={imageAddress}
          alt={`Foto de perfil de ${userName}`}
          height={46}
          width={46}
          quality={100}
          className={styles.profileImg}
        />
        <p className={styles.userName}>{userName}</p>
      </div>
      <hr className={styles.division} />
    </div>
  );
}
