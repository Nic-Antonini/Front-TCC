"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeftCircleIcon } from "lucide-react";
import ProfileChat from "../profileChat/page";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface SideBarProps {
  setCurrentChat: (chat: CurrentChat | null) => void;
  onProfileChatClick: (chatId: string) => void; // Passando o callback para atualizar a URL
}

interface CurrentChat {
  chatId: string;
  userName: string;
  imageAddress: string;
  userId: string;
  Apic_Id?: string;
  Agri_Id?: string;
}

export default function SideBar({ setCurrentChat, onProfileChatClick }: SideBarProps) {
  const [chatList, setChatList] = useState<CurrentChat[]>([]);
  const token = localStorage.getItem("token");
  const loggedUserId = token ? (jwtDecode(token) as any).userId : null;

  useEffect(() => {
    const userData = async () => {
      if (!loggedUserId) return;

      try {
        const chatResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/chat/usuario/${loggedUserId}`
        );

        const chats = chatResponse.data.dados || [];

        const chatData: CurrentChat[] = chats.map((chat: any) => ({
          chatId: chat.Chat_Id,
          userName: chat.NomeOutroUsuario,
          imageAddress: chat.FotoOutroUsuario,
          userId: chat.UserIdOutroUsuario,
          Apic_Id: chat.Apic_Id,
          Agri_Id: chat.Agri_Id,
        }));

        setChatList(chatData);
      } catch (error) {
        console.error("Erro ao carregar os dados dos chats:", error);
      }
    };

    userData();
  }, [loggedUserId]);

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navBar}>
        <Link href={"/Homepage"} className={styles.backBtn}>
          <ArrowLeftCircleIcon color="#231F17" size={33} />
        </Link>
        <div className={styles.divInput}>
          <input type="text" className={styles.searchInput} />
          <Search strokeWidth={3} color="#fff" />
        </div>
      </nav>
      <p className={styles.titleSecNavBar}>Conversas</p>
      <hr className={styles.division} />
      <nav className={styles.secondNavBar}>
        {chatList.map((chat) => (
          <ProfileChat
            key={chat.chatId}
            imageAddress={chat.imageAddress}
            userName={chat.userName}
            chatId={chat.chatId}
            userId={chat.userId}
            setCurrentChat={setCurrentChat}
            Apic_Id={chat.Apic_Id}
            Agri_Id={chat.Agri_Id}
            onProfileChatClick={onProfileChatClick} // Passando o callback para atualizar a URL
          />
        ))}
      </nav>
    </aside>
  );
}
