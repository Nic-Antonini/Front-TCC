"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // Para atualizar a URL
import styles from "./page.module.css";
import SideBar from "./Components/sideBar/page";
import { SendHorizonal, Paperclip } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface Message {
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

interface CurrentChat {
  chatId: string;
  userName: string;
  imageAddress: string;
  userId: string;
  Apic_Id?: string;
  Agri_Id?: string;
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter(); // Usando o router para atualizar a URL
  const searchParams = useSearchParams();
  const chatIdFromUrl = searchParams.get("chatId");

  const token = localStorage.getItem("token");
  const loggedUserId = token ? (jwtDecode(token) as any).userId : null;

  // Função para carregar mensagens do chat
  const loadMessages = async (chatId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chat/messages/${chatId}`
      );
      setChatMessages(
        response.data.dados.map((msg: any) => ({
          text: msg.Chat_Mensagem,
          sender: msg.sender === "user" ? "user" : "other",
          timestamp: msg.Chat_Dta_Hora,
        }))
      );
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  // Atualizar `currentChat` e carregar mensagens ao mudar `chatIdFromUrl`
  useEffect(() => {
    if (chatIdFromUrl) {
      const fetchChatDetails = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/chat/detalhes/${chatIdFromUrl}`
          );
          const chatData = response.data.dados;

          setCurrentChat({
            chatId: chatData.Chat_Id,
            userName: chatData.NomeOutroUsuario,
            imageAddress: chatData.FotoOutroUsuario,
            userId: chatData.UserIdOutroUsuario,
            Apic_Id: chatData.Apic_Id,
            Agri_Id: chatData.Agri_Id,
          });

          await loadMessages(chatIdFromUrl);
        } catch (error) {
          console.error("Erro ao carregar detalhes do chat:", error);
        }
      };

      fetchChatDetails();
    }
  }, [chatIdFromUrl]);

  // Função para enviar mensagem
  const handleSendMessage = async () => {
    if (message.trim() && currentChat) {
      try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        const newMessage = {
          Chat_Mensagem: message,
          Chat_Visto: false,
          Chat_Dta_Hora: formattedDate,
          Apic_Id: 1,  // ID do apicultor
          Agri_Id: 1,  // ID do agricultor
          Chat_Ativo: 1
        };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/chat`, newMessage);

        // Atualizar localmente as mensagens
        setChatMessages((prev) => [
          ...prev,
          { text: message, sender: "user", timestamp: formattedDate },
        ]);
        setMessage("");  // Limpar o campo de mensagem

        // Salvar mensagens no localStorage para persistência
        localStorage.setItem("chatMessages", JSON.stringify(chatMessages));

      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    }
  };
  // Scroll automático para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Atualizar a URL ao clicar no ProfileChat
  const handleProfileChatClick = (chatId: string) => {
    router.push(`/Homepage/Chat?chatId=${chatId}`); // Atualiza a URL para Homepage/Chat?chatId=xxx
  };

  return (
    <div className={styles.allPage}>
      <div className={styles.secondDiv}>
        <SideBar setCurrentChat={setCurrentChat} onProfileChatClick={handleProfileChatClick} />

        <main className={styles.main}>
          <div className={styles.chatContainer}>
            {currentChat && (
              <div className={styles.chatHeader}>
                <div className={styles.userInfo}>
                  <Image
                    src={currentChat.imageAddress }
                    alt={`Foto de perfil de ${currentChat.userName}`}
                    height={48}
                    width={48}
                    className={styles.profileImg}
                  />
                  <p className={styles.userName}>{currentChat.userName}</p>
                </div>
                <Link
                  href={`/beekeeper/publicProfile/2`}
                  className={styles.profileLink}
                >
                  Ver perfil
                </Link>
              </div>
            )}

            <div className={styles.messages}>
              {chatMessages.length > 0 ? (
                chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.sender === "user" ? styles.sentMessage : styles.receivedMessage
                    }
                  >
                    <p>{msg.text}</p> {/* Removido a data */}
                  </div>
                ))
              ) : (
                <p className={styles.placeholder}>Selecione uma conversa para começar</p>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputContainer}>
              <button
                className={styles.attachButton}
                onClick={() => fileInputRef.current?.click()}
                disabled={!currentChat}
              >
                <Paperclip color="#F7C04A" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className={styles.messageInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!currentChat}
              />
              <button
                className={styles.sendButton}
                onClick={handleSendMessage}
                disabled={!currentChat}
              >
                <SendHorizonal color="#F7C04A" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
