"use client";
import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {
  const [imagemSrc, setImagemSrc] = useState('/toggleNavbar.svg'); // Define o caminho da imagem inicial
  const [linksVisiveis, setLinksVisiveis] = useState(false); // Estado para controlar a visibilidade dos links

  const handleClick = () => {
    // Verifica o caminho atual da imagem e alterna para o próximo caminho
    if (imagemSrc === '/toggleNavbar.svg') {
      setImagemSrc('/toggleNavbar2.svg'); // Substitua 'outraImagem.svg' pelo caminho da outra imagem desejada
      setLinksVisiveis(true); // Mostra os links quando a outra imagem é exibida
    } else {
      setImagemSrc('/toggleNavbar.svg'); // Volta para o caminho original se já estiver na outra imagem
      setLinksVisiveis(false); // Oculta os links quando a imagem original é exibida
    }
  };
  return (
    <main className={styles.main}>
      
        <header className={styles.header}>
          <div className={styles.container}>
          <Image src="/logo.svg"
            alt="Logo do sistema BeeTech"
            width={190}
            height={90}
            priority
            className={styles.logo}
          />

          <nav className={styles.nav}>
            <a href="/" className={styles.navLink}>Como Funciona</a>
            <a href="/" className={styles.navLink}>Contato</a>
            <Link href={"/"} className={styles.navLink}>FAQ</Link>
            <a href="/" className={styles.navLink}>Sobre Nós</a>
            <Link href={"/"} className={styles.navLink}>Entrar</Link>
            <Link href={"/"}><button className={styles.navBtn}>Cadastrar</button></Link>
          </nav>

          <div className={styles.toggleNavbar}>
      <button className={styles.menu} onClick={handleClick}>
        <Image 
          src={imagemSrc}
          alt="Botão para abrir o menu"
          width={48}
          height={48}
          priority
        />
      </button>
      {linksVisiveis && ( // Renderiza os links apenas se linksVisiveis for verdadeiro
        <>
          <a href="/" className={styles.navLink1}>Como Funciona</a>
          <a href="/" className={styles.navLink1}>Contato</a>
          <Link href={"/"} className={styles.navLink1}>FAQ</Link>
          <a href="/" className={styles.navLink1}>Sobre Nós</a>
          <Link href={"/"} className={styles.navLink1}>Entrar</Link>
          <Link href={"/"}><button className={styles.navBtn1}>Cadastrar</button></Link>
        </>
      )}
    </div>

          </div>
        <section className={styles.desc}>
          <div className={styles.textArea}>
            <h1 className={styles.textDesc}>
              Unindo <span className={styles.span}> Criadores de Abelhas </span>
              e <span className={styles.span}> Produtores Rurais </span>
              Rumo a um Futuro <span className={styles.span}> Sustentável </span>
              e <span className={styles.span}>Tecnológico</span>.
            </h1>
          </div>

            <Image src="/descImg.svg"
            alt="Ilustração de um apicultor e um agricultor unidos"
            width={281}
            height={345}
            priority
            className={styles.descImg}/>
        </section>
      </header>



    </main>
  );
}
