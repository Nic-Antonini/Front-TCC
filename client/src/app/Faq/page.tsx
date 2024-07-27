"use client";
import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

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
              <div className={styles.questionArea}>
              <div className={styles.boxButton}>
                <p className={styles.question}>
                Como posso me registrar na plataforma BeeTech?
                </p>
                <span className={styles.more}>
                  +
                </span>
                
              </div>
                <div className={styles.answerArea}>
                  <p className={styles.answer}>
                  Para se registrar, clique no botão "Registrar" no canto superior direito da página inicial e preencha o formulário com suas informações pessoais e profissionais.
                  </p>
                </div>
              </div>
              <div className={styles.questionArea}>
              <div className={styles.boxButton}>
                <p className={styles.question}>
                Quem pode usar a BeeTech?
                </p>
                <span className={styles.more}>
                  +
                </span>
              </div>
                <div className={styles.answerArea}>
                  <p className={styles.answer}>
                  A BeeTech é destinada tanto a apicultores que oferecem serviços de polinização quanto a agricultores que necessitam desses serviços.
                  </p>
                </div>
              </div>
              <div className={styles.questionArea}>
              <div className={styles.boxButton}>
                <p className={styles.question}>
                Como funciona o sistema de pesquisa na BeeTech?
                </p>
                <span className={styles.more}>
                  +
                </span>
              </div>
                <div className={styles.answerArea}>
                  <p className={styles.answer}>
                  O sistema permite que usuários filtrem suas buscas com base em critérios como proximidade geográfica e disponibilidade das espécies de abelhas necessárias para polinização.
                  </p>
                </div>
              </div>
              <div className={styles.questionArea}>
              <div className={styles.boxButton}>
                <p className={styles.question}>
                A BeeTech é responsável pelos preços das negociações?
                </p>
                <span className={styles.more}>
                  +
                </span>
                </div>
                <div className={styles.answerArea}>
                  <p className={styles.answer}>
                  Não, a BeeTech não assume responsabilidade pelos preços estabelecidos nas negociações. Essas questões são de inteira responsabilidade dos usuários envolvidos na transação.

                  </p>
                </div>
              </div>
              <div className={styles.questionArea}>
                <div className={styles.boxButton}>
                  <p className={styles.question}>
                  A BeeTech processa pagamentos entre usuários?
                  </p>
                  <span className={styles.more}>
                    +
                  </span>
                </div>
                <div className={styles.answerArea}>
                  <p className={styles.answer}>
                  Não, o processamento de pagamentos deve ser acordado e realizado diretamente entre os usuários.
                  </p>
                </div>
              </div>
              
              <div className={styles.questionArea}>
              <div className={styles.boxButton}>
                <p className={styles.question}>
                O que devo fazer se encontrar um problema técnico na plataforma?
                </p>
                <span className={styles.more}>
                  +
                </span>
                </div>
                <div className={styles.answerArea}>
                  <p className={styles.answer}>
                  e você encontrar um problema técnico, entre em contato com o suporte técnico da BeeTech através do formulário de contato disponível no site.
                  </p>
                </div>
              </div>
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