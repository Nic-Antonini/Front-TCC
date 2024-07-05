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
        duration: 1, x: 0, opacity: 1
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
      start: "top 500px",
      end: "bottom 700px"
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
        start: "top 500px",
        end: "bottom 700px",

      }
    })
    return () =>{
        gsap.killTweensOf([`.${styles.apiary}`, `.${styles.titleAboutUs}`])
    }
    }, [])

    useLayoutEffect(() => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.to(`.${styles.imgHand}`, {
        duration: 1, x: 0, opacity: 1, scrollTrigger:{
          trigger: `.${styles.subSec1}`,
          start: "top 600px",
          end: "bottom 700px",
        }
      })
      return () =>{
        gsap.killTweensOf([`.${styles.imgHand}`])
    }
    })

    useLayoutEffect(() => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.to(`.${styles.imgMatch}`, {
        duration: 1, x: 0, opacity: 1, scrollTrigger:{
          trigger: `.${styles.subSec3}`,
          start: "top 500px",
          end: "bottom 700px",
        }
      })
      return () =>{
        gsap.killTweensOf([`.${styles.imgHand}`])
    }
    })

    useLayoutEffect(() => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.to(`.${styles.imgSmartphone}`, {
        duration: 1, x: 0, opacity: 1, scrollTrigger:{
          trigger: `.${styles.subSec2}`,
          start: "top 600px",
          end: "bottom 700px",
        }
      })
      return () =>{
        gsap.killTweensOf([`.${styles.imgSmartphone}`])
    }
    })

    useLayoutEffect(() => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.to(`.${styles.bee}`, {
        duration: 1, x: 0, opacity: 1, scrollTrigger:{
          trigger: `.${styles.formContact}`,
          start: "top 600px",
          end: "bottom 700px",
        }
      })
      return () =>{
        gsap.killTweensOf([`.${styles.bee}`])
    }
    })

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Image src="/logo.svg"
            alt="Logo do sistema BeeTech"
            width={170}
            height={70}
            priority
            className={styles.logo}
          />

          <nav className={styles.nav}>
            <a href="/#SobreNós" className={styles.navLink}>Sobre Nós</a>
            <a href="/#ComoFunciona" className={styles.navLink}>Como Funciona?</a>
            <a href="/#Contato" className={styles.navLink}>Contato</a>
            <Link href={"/Faq"} className={styles.navLink}>FAQ</Link>
            <Link href={"/Login"} className={styles.navLink}>Entrar</Link>
            <Link href={"/Cadastro"}><button className={styles.navBtn}>Cadastrar</button></Link>
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
                <a href="/#ComoFunciona" className={styles.navLink1}>Como Funciona</a>
                <a href="/#Contato" className={styles.navLink1}>Contato</a>
                <Link href={"/Faq"} className={styles.navLink1}>FAQ</Link>
                <a href="/#SobreNós" className={styles.navLink1}>Sobre Nós</a>
                <Link href={"/Login"} className={styles.navLink1}>Entrar</Link>
                <Link href={"/Cadastro"}><button className={styles.navBtn1}>Cadastrar</button></Link>
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
            width={280}
            height={330}
            priority
            className={styles.descImg}/>
        </div>
      </header>
      <section  className={styles.containerAboutUs}>
        <Image  src={"/apiary.svg"}
        width={340}
        height={450}
        alt='Desenho de uma colméia'
        className={styles.apiary}
        />
        <div id='SobreNós' className={styles.textAboutUs}>
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
        <h1 className={styles.titleHow}>Como funciona?</h1>
        <div className={styles.subSec1}>
          <div className={styles.textAreaSec}>
              <h1 className={styles.titleSecR}>Crie sua Conta!</h1>
              <p className={styles.textSecR}>
                  Cadastre-se na nossa plataforma como apicultor ou agricultor preenchendo seus dados de forma rápida e fácil.
              </p>
            </div>
            <Image alt='Cadastro' src='/hand.svg' height={600} width={500} className={styles.imgHand} />
        </div>
        <div className={styles.subSec2}>
            <Image alt='Busca' src='/smartphone.svg' height={350} width={200} className={styles.imgSmartphone}/>
            <div className={styles.textAreaSec}>
              <h1 className={styles.titleSec}>Encontre Parceiros Ideais</h1>
              <p className={styles.textSec}>
                  Utilize nossos filtros de busca para encontrar o apicultor ou agricultor perfeito para suas necessidades.
              </p>
            </div>
        </div>
        <div className={styles.subSec3}>
            <div className={styles.textAreaSec}>
              <h1 className={styles.titleSecR}>Negocie com Facilidade</h1>
              <p className={styles.textSecR}>
                  Após encontrar o parceiro ideal, entre em contato para negociar e fechar negócios de maneira simples e direta.
              </p>
            </div>
            <Image alt='Negociação' src='/match.svg' height={490} width={250} className={styles.imgMatch}/>
        </div>
      </section>

      <section id='Contato' className={styles.contactContainer}>
        <h1 className={styles.titleContact}>Contato</h1>
        <div className={styles.contactArea}>
            <Image
              alt='Abelhas voando em volta de uma colmeia'
              height={620}
              width={410}
              src={"/bee.svg"}
              className={styles.bee}
            />
            <div className={styles.formContact}>
              <h2 className={styles.formTitle}>Entre em contato conosco, preenchendo os dados corretamente:</h2>
              <input type="text" id='name' name='name' placeholder='Insira seu nome completo' className={styles.formInput}/>
              <input type="email" id='email' name='email' placeholder='Insira seu e-mail'className={styles.formInput}/>
              <input type="text" id='subject' name='subject' placeholder='Insira o título do assunto a ser tratado' className={styles.formInput}/>
              <input type="text" id='message' name='message'placeholder='Insira sua mensagem'className={styles.formTextInput}/>
              <center>
              <input type="button" value="Enviar" className={styles.formBtn} />
              </center>
            </div>
        </div>
      </section>
      <footer className={styles.footer}>
      <Image src="/logo.svg"
            alt="Logo do sistema BeeTech"
            width={160}
            height={60}
            priority
            className={styles.logoFooter}
          />

        <p className={styles.rightsFooter}>© 2024 APSP  -  Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}