'use client'
import React, { useState } from "react";
import style from "./page.module.css";
import Sidebar from "./Components/sidebar/page";
import Image from "next/image";
import Link from "next/link";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Homepage() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

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
                <Slider className={style.list} {...settings}>
                <div className={style.profile}>

                </div>
                <div className={style.profile}>

</div>
<div className={style.profile}>

</div>
<div className={style.profile}>

</div>

<div className={style.profile}>

</div>
<div className={style.profile}>

</div>
<div className={style.profile}>

</div>
<div className={style.profile}>

</div>
<div className={style.profile}>

</div>
<div className={style.profile}>

</div>
<div className={style.profile}>

</div>


                </Slider>
              </div>
            </section>
            <section className={style.sec}>
              <h1 className={style.secTitle}>
                Apicultores mais próximos de você:
              </h1>
              <div className={style.profiles}>
             
              </div>
            </section>
            <section className={style.sec}>
              <h1 className={style.secTitle}>
                Apicultores favoritados:
              </h1>
              <div className={style.profiles}>
                
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
