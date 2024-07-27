"use client";
import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Box from './component/page';

export default function faq(){
    const [imagemSrc, setImagemSrc] = useState('/toggleNavbar.svg');
    const [linksVisiveis, setLinksVisiveis] = useState(false); 
    const [boxOpen, setBoxOpen] = useState(false);

    const handleClick = () => {
        if (imagemSrc === '/toggleNavbar.svg') {
          setImagemSrc('/toggleNavbar2.svg'); 
          setLinksVisiveis(true); 
        } else {
          setImagemSrc('/toggleNavbar.svg');
          setLinksVisiveis(false); 
        }
      };
    return(
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
        </header>
        <div className={styles.section}>
            <h1 className={styles.title}>FAQ (Dúvidas Frequentes)</h1>
            <div className={styles.FAQ}>
              <Box/>
            </div>
        </div>
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
    )
}