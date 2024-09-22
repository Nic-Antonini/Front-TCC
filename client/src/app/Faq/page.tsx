"use client";
import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Accordion from './component/page';

export default function faq(){
    const [imagemSrc, setImagemSrc] = useState('/toggleNavbar.svg');
    const [linksVisiveis, setLinksVisiveis] = useState(false); 

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
          <Link href={'/'}>
              <Image src="/logo.svg"
                alt="Logo do sistema BeeTech"
                width={170}
                height={70}
                priority
                className={styles.logo}
              />
          </Link>
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
        </header>
        <div className={styles.section}>
            <h1 className={styles.title}>FAQ (Dúvidas Frequentes)</h1>
            <div className={styles.FAQ}>
              <Accordion title={"Como posso me registrar na plataforma BeeTech?"}
              answer={'Para se registrar, clique no botão "Cadastrar" no canto superior direito da página inicial e preencha o formulário com suas informações pessoais e profissionais.'}/>
              <Accordion title={"Quem pode usar a BeeTech?"}
              answer={"A BeeTech é destinada tanto a apicultores que oferecem serviços de polinização quanto a agricultores que necessitam desses serviços."}/>
              <Accordion title={"Como funciona o sistema de pesquisa na BeeTech?"}
              answer={"O sistema permite que usuários filtrem suas buscas com base em critérios como proximidade geográfica e disponibilidade das espécies de abelhas necessárias para polinização."} />
              <Accordion title={"A BeeTech é responsável pelos preços das negociações?"}
              answer={"Não, a BeeTech não assume responsabilidade pelos preços estabelecidos nas negociações. Essas questões são de inteira responsabilidade dos usuários envolvidos na transação."}/>
              <Accordion title={"A BeeTech processa pagamentos entre usuários?"}
              answer={"Não, o processamento de pagamentos deve ser acordado e realizado diretamente entre os usuários."}/>
              <Accordion title={"O que devo fazer se encontrar um problema técnico na plataforma?"}
              answer={"Se você encontrar um problema técnico, entre em contato com o suporte técnico da BeeTech através do formulário de contato disponível no site."}/>
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