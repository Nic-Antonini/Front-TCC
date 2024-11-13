// Chat.tsx
'use client'
import { useState } from 'react';
import styles from './page.module.css';
import SideBar from './Components/sideBar/page';
import { SendHorizonal, Paperclip } from "lucide-react";

// Estrutura de dados para armazenar as conversas
interface Message {
    text: string;
    sender: 'user' | 'other';
}

export default function Chat() {
    const [message, setMessage] = useState('');
    const [currentChat, setCurrentChat] = useState<string | null>(null); // Chat atual
    const [chatMessages, setChatMessages] = useState<{ [key: string]: Message[] }>({
        'nome_do_apicultor_1': [],
        'nome_do_apicultor_2': [],
        // Adicione mais contatos conforme necessário
    });

    // Função para lidar com o envio de uma nova mensagem
    const handleSendMessage = () => {
        if (message.trim() && currentChat) {
            setChatMessages({
                ...chatMessages,
                [currentChat]: [...chatMessages[currentChat], { text: message, sender: 'user' }]
            });
            setMessage('');

            // Simula uma resposta automática do "outro usuário" após 2 segundos
            setTimeout(() => {
                setChatMessages(prevMessages => ({
                    ...prevMessages,
                    [currentChat]: [...prevMessages[currentChat], { text: 'Esta é uma resposta automática.', sender: 'other' }]
                }));
            }, 2000);
        }
    };

    // Função para detectar "Enter" no input
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <SideBar setCurrentChat={setCurrentChat} /> {/* Passa a função para selecionar o chat */}
                <main className={styles.main}>
                    <div className={styles.chatContainer}>
                        <div className={styles.messages}>
                            {/* Exibe as mensagens da conversa atual */}
                            {currentChat ? (
                                chatMessages[currentChat].map((msg, index) => (
                                    <div
                                        key={index}
                                        className={msg.sender === 'user' ? styles.sentMessage : styles.receivedMessage}
                                    >
                                        {msg.text}
                                    </div>
                                ))
                            ) : (
                                <p className={styles.placeholder}>Selecione uma conversa para começar</p>
                            )}
                        </div>
                        {/* Input para enviar mensagem */}
                        <div className={styles.inputContainer}>
                        <button className={styles.attachButton} disabled={!currentChat}>
                            <Paperclip color='#F7C04A'/>
                        </button>
                            <input
                                type="text"
                                placeholder="Digite sua mensagem..."
                                className={styles.messageInput}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown} // Envia ao pressionar Enter
                                disabled={!currentChat} // Desabilita o input se nenhuma conversa estiver selecionada
                            />
                            <button className={styles.sendButton} onClick={handleSendMessage} disabled={!currentChat}>
                                <SendHorizonal color='#F7C04A' />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
