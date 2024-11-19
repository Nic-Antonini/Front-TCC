

//CHAT.TSX

'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import SideBar from './Components/sideBar/page';
import { SendHorizonal, Paperclip } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Message {
    text: string;
    sender: 'user' | 'other';
}

interface CurrentChat {
    chatId: string;
    userName: string;
    imageAddress: string;
}

export default function Chat() {
    const [message, setMessage] = useState('');
    const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && currentChat) {
            const mockApiResponse = async () => {
                return new Promise<{ fileUrl: string }>((resolve) => {
                    setTimeout(() => {
                        resolve({ fileUrl: URL.createObjectURL(file) }); // Criação da URL do arquivo
                    }, 1000); // Simula tempo de resposta da API
                });
            };

            try {
                const data = await mockApiResponse();

                // Adiciona a mensagem com o arquivo enviado
                setChatMessages((prevMessages) => ({
                    ...prevMessages,
                    [currentChat.chatId]: [
                        ...prevMessages[currentChat.chatId],
                        { text: `Enviou um arquivo: ${data.fileUrl}`, sender: 'user' },
                    ],
                }));
            } catch (error) {
                console.error('Erro:', error);
            }

            event.target.value = ''; // Reseta o input de arquivo
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const [chatMessages, setChatMessages] = useState<{ [key: string]: Message[] }>({
        'nome_do_apicultor_1': [],
        'nome_do_apicultor_2': [],
    });

    const handleSendMessage = () => {
        if (message.trim() && currentChat) {
            setChatMessages({
                ...chatMessages,
                [currentChat.chatId]: [
                    ...chatMessages[currentChat.chatId],
                    { text: message, sender: 'user' },
                ],
            });
            setMessage('');

            setTimeout(() => {
                setChatMessages((prevMessages) => ({
                    ...prevMessages,
                    [currentChat.chatId]: [
                        ...prevMessages[currentChat.chatId],
                        { text: 'Esta é uma resposta automática.', sender: 'other' },
                    ],
                }));
            }, 2000);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (currentChat && chatMessages[currentChat.chatId]) {
            scrollToBottom();
        }
    }, [chatMessages, currentChat]);

    return (
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <SideBar setCurrentChat={(chatId, userName, imageAddress) =>
                    setCurrentChat({ chatId, userName, imageAddress })
                } />

                <main className={styles.main}>
                    <div className={styles.chatContainer}>

                    {currentChat && (
                        <div className={styles.chatHeader}>
                            <div className={styles.userInfo}>
                                <Image
                                    src={currentChat.imageAddress}
                                    alt={`Foto de perfil de ${currentChat.userName}`}
                                    height={48}
                                    width={48}
                                    className={styles.profileImg}
                                />
                                <p className={styles.userName}>{currentChat.userName}</p>
                            </div>
                            <Link href={`/Beekeeper/publicProfile/${currentChat.chatId}`} className={styles.profileLink}>
                                ver perfil
                            </Link>
                        </div>
                    )}

                        <div className={styles.messages}>
                            {currentChat ? (
                                chatMessages[currentChat.chatId].map((msg, index) => (
                                    <div
                                        key={index}
                                        className={msg.sender === 'user' ? styles.sentMessage : styles.receivedMessage}
                                    >
                                        {msg.text.includes('Enviou um arquivo:') ? (
                                            <div>
                                                {msg.text.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                                    <img
                                                        src={msg.text.replace('Enviou um arquivo: ', '')}
                                                        alt="Anexo"
                                                        className={styles.chatImage}
                                                        style={{ maxWidth: '100%', maxHeight: '200px' }} 
                                                    />
                                                ) : (
                                                    <a
                                                        href={msg.text.replace('Enviou um arquivo: ', '')}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.fileLink}
                                                    >
                                                     Visualizar Anexo
                                                    </a>
                                                )}
                                            </div>
                                        ) : (
                                            <p>{msg.text}</p>
                                        )}
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
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                            <input
                                type="text"
                                placeholder="Digite sua mensagem..."
                                className={styles.messageInput}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
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
