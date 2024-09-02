"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../Components/sidebar/page";
import ProfileSearched1 from "../Components/profileSearched1/page";
import ProfileSearched2 from "../Components/profileSearched2/page";
import Filter1 from "../Components/filter1/page";
import Filter2 from "../Components/filter2/page";
import { Search } from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function searchArea() {
  return (
    <div className={styles.allPage}>
      <div className={styles.secondDiv}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.myProfileDiv}>
            <Link href={"/MeuPerfil"}>
              <Image
                alt="Meu Perfil"
                src="/AgriProfile.svg"
                className={styles.myProfile}
                width={50}
                height={50}
                priority
              />
            </Link>
          </div>
          <div className={styles.divDivider}>
            <div className={styles.searchArea}>
              <div className={styles.bar}>
                <input
                  type="text"
                  name="searchBar"
                  id="searchBar"
                  className={styles.searchBar}
                  placeholder="Pesquisar..."
                />
                <Search strokeWidth={3} className={styles.iconSearch} />
              </div>
              <ProfileSearched1
                profilePhoto="/beekeeper.svg"
                name="Laís Teixeira"
                location="Tupã, São Paulo."
                availability={28}
                species="Africana; Europeia."
              />
                <ProfileSearched2
                profilePhoto="/farmer.svg"
                name="Nicolas Pablo Antonini Dos Santos"
                location="Bastos, São Paulo."
                hectares={32}
                cultivation="Abacate; Amendoim; Café; Milho."
                pesticides={true}
                />

            </div>
              <Filter2/>
          </div>
        </main>
      </div>
    </div>
  );
}
