"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../Components/sidebar/page";
import ProfileSearched1 from "../../Farmer/profileSearched/page";
import ProfileSearched2 from "../../beekeeper/profileSearched/page";
import { Search } from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

interface props {
  myProfile: string;
  myPhoto: string;
  myUserType: string;
}

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
                src="/farmer.svg"
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
