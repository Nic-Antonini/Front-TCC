"use client";
import React, {useState, useLayoutEffect} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {
  const [imagemSrc, setImagemSrc] = useState('/toggleNavbar.svg');
  const [linksVisiveis, setLinksVisiveis] = useState(false); 

  useLayoutEffect(()=>{
    gsap.to(`.${styles.descImg}`, {
      duration: 1, x: 0, opacity: 1, 
    })
  }, []);

  useLayoutEffect(()=>{
    gsap.to(`.${styles.textArea}`, {
      duration: 2, opacity: 1
    })
  }, []);

  const handleClick = () => {
    if (imagemSrc === '/toggleNavbar.svg') {
      setImagemSrc('/toggleNavbar2.svg'); 
      setLinksVisiveis(true); 
    } else {
      setImagemSrc('/toggleNavbar.svg');
      setLinksVisiveis(false); 
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
      {linksVisiveis && (
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
