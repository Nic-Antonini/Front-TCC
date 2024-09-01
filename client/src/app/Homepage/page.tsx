'use client'
import React from "react";
import style from "./page.module.css";
import Sidebar from "./Components/sidebar/page";
import Image from "next/image";
import Link from "next/link";
import EmblaCarousel from "./Components/carouselProfiles/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

export default function Homepage() {

    const OPTIONS: EmblaOptionsType = {
        align: 'start',
        dragFree: true,
        loop: true,
        slidesToScroll: 'auto',
        duration: 60
      }
      const SLIDE_COUNT = 20
      const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div className={style.allPage}>
      <div className={style.secondDiv}>
        <Sidebar />
        <main className={style.main}>
          <div className={style.myProfileDiv}>
            <Link href={"/MeuPerfil"}>
              <Image
                alt="Meu Perfil"
                src="/AgriProfile.svg"
                className={style.myProfile}
                width={50}
                height={50}
                priority
              />
            </Link>
          </div>
          <div className={style.sections}>
            <section className={style.sec1}>
              <h1 className={style.secTitle}>
                Apicultores que talvez você se interesse:
              </h1>
              <div className={style.profiles}>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
              </div>
            </section>
            <section className={style.sec}>
              <h1 className={style.secTitle}>
                Apicultores mais próximos de você:
              </h1>
              <div className={style.profiles}>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
              </div>
            </section>
            <section className={style.sec}>
              <h1 className={style.secTitle}>
                Apicultores favoritados:
              </h1>
              <div className={style.profiles}>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
