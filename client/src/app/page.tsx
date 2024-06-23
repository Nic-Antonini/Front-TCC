"use client";
import React, {useState, useEffect,useLayoutEffect} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const [imagemSrc, setImagemSrc] = useState('/toggleNavbar.svg');
  const [linksVisiveis, setLinksVisiveis] = useState(false); 

  useLayoutEffect(() => {
    const descImgElement = document.querySelector(`.${styles.descImg}`);
    if (descImgElement) {
      gsap.to(descImgElement, {
        duration: 1, x: 0, opacity: 1, 
      });
      return () =>{
        gsap.killTweensOf(`.${styles.descImg}`)
    }
    }
  }, []);

  useLayoutEffect(() => {
    const textAreaElement = document.querySelector(`.${styles.textArea}`);
    if (textAreaElement) {
      gsap.to(textAreaElement, {
        duration: 2, opacity: 1
      });
      return () =>{
        gsap.killTweensOf(`.${styles.textArea}`)
    }
    }
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
  
  useLayoutEffect(() =>{
  gsap.registerPlugin(ScrollTrigger)
  gsap.to(`.${styles.apiary}`, {
    right: 0, 
    duration: 1,
    scrollTrigger: {
      trigger: `.${styles.containerAboutUs}`,
      start: "top 400px",
      end: "bottom 500px",
      scrub: true
    }
  })
  return () =>{
      gsap.killTweensOf(`.${styles.apiary}`)
  }
  }, [])

  useLayoutEffect(() =>{
    gsap.registerPlugin(ScrollTrigger)
    gsap.to([`.${styles.aboutUs}`, `.${styles.titleAboutUs}`], {
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: `.${styles.containerAboutUs}`,
        start: "top 400px",
        end: "bottom 500px",
        scrub: true
      }
    })
    return () =>{
        gsap.killTweensOf([`.${styles.apiary}`, `.${styles.titleAboutUs}`])
    }
    }, [])

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
            <a href="/#ComoFunciona" className={styles.navLink}>Como Funciona</a>
            <a href="/" className={styles.navLink}>Contato</a>
            <Link href={"/"} className={styles.navLink}>FAQ</Link>
            <a href="/#SobreNós" className={styles.navLink}>Sobre Nós</a>
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

        <div className={styles.desc}>
          <div className={styles.textArea}>
            <h1 className={styles.textDesc}>
              Unindo <span className={styles.span}> Criadores de Abelhas </span>
              e <span className={styles.span2}> Produtores Rurais </span>
              Rumo a um Futuro <span className={styles.span2}> Sustentável </span>
              e <span className={styles.span}>Tecnológico</span>.
            </h1>
          </div>

          <Image src="/descImg.svg"
            alt="Ilustração de um apicultor e um agricultor unidos"
            width={310}
            height={405}
            priority
            className={styles.descImg}/>
        </div>
      </header>
      <section id='SobreNós' className={styles.containerAboutUs}>
        <Image src={"/apiary.svg"}
        width={370}
        height={480}
        alt='Desenho de uma colméia'
        className={styles.apiary}
        />
        <div className={styles.textAboutUs}>
            <h1 className={styles.titleAboutUs}>
            Sobre nós
            </h1>
            <p className={styles.aboutUs}>
            A BeeTech é uma plataforma inovadora que conecta apicultores e agricultores,
            facilitando a negociação de serviços de polinização. Nosso objetivo é criar
            uma ponte direta entre esses dois públicos, permitindo que encontrem o parceiro
            ideal para suas necessidades específicas. A polinização desempenha um papel
            fundamental na agricultura, e nossa plataforma visa tornar esse processo mais
            acessível e eficiente para todos os envolvidos.
            </p>
        </div>
      </section>
      <section id='ComoFunciona' className={styles.containerHow}>
            h
      </section>
      <section id='Contato'>

      </section>
    </main>
  );
}