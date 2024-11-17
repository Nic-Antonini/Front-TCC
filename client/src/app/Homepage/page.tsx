'use client'
import React, { useState } from "react";
import style from "./page.module.css";
import Sidebar from "./Components/sidebar/page";
import Image from "next/image";
import Link from "next/link";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface props {
  myProfile: string;
  myPhoto: string;
  myUserType: string;
  favUsers?: string[];
  favUsersPhoto?: string[];
}

export default function Homepage({ myProfile, myPhoto, myUserType, favUsers = [], favUsersPhoto = [] }: props) {
  const colors = {
    beekeeper: '#F9BD1C',
    farmer: '#51754C',
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Mock data caso favUsers ou favUsersPhoto não sejam passados
  const mockFavUsers = favUsers.length > 0 ? favUsers : ['user1', 'user2', 'user3'];
  const mockFavUsersPhoto = favUsersPhoto.length > 0 ? favUsersPhoto : ['/path/to/photo1.jpg', '/path/to/photo2.jpg', '/path/to/photo3.jpg'];

  return (
    <div className={style.allPage}>
      <div className={style.secondDiv}>
        <Sidebar />
        <main className={style.main}>
          <div className={style.myProfileDiv}>
            <Link href={myProfile || "#"}>
              <Image
                alt="Meu Perfil"
                src={myPhoto || '/default-profile.png'} // fallback para foto de perfil
                className={style.myProfile}
                width={50}
                height={50}
                priority
                style={{ backgroundColor: colors[myUserType as keyof typeof colors] }}
              />
            </Link>
          </div>
          <div className={style.sections}>
            <section className={style.sec1}>
              <h1 className={style.secTitle}>Usuários que talvez você se interesse:</h1>
              <Carousel responsive={responsive} className={style.profiles}>
                {mockFavUsers.map((user, index) => {
                  const userProfile = `/user/${user}`;
                  const userPhoto = mockFavUsersPhoto[index];

                  // Verificar se o link e a foto estão definidos
                  return (
                    <div className={style.profile} key={index}>
                      {/* Verifique se userProfile é uma string válida */}
                      <Link href={userProfile || "#"}> 
                        <Image
                          src={userPhoto || '/default-profile.png'} // fallback para foto do usuário
                          alt="Perfil Recomendado"
                          width={215}
                          height={215}
                        />
                      </Link>
                    </div>
                  );
                })}
              </Carousel>
            </section>
            <section className={style.sec1}>
              <h1 className={style.secTitle}>Usuários mais próximos de você:</h1>
              <div className={style.profiles}>
                <Carousel responsive={responsive} className={style.profiles}>
                  {mockFavUsers.map((user, index) => {
                    const userProfile = `/user/${user}`;
                    const userPhoto = mockFavUsersPhoto[index];

                    return (
                      <div className={style.profile} key={index}>
                        <Link href={userProfile || "#"}> 
                          <Image
                            src={userPhoto || '/default-profile.png'}
                            alt="Perfil Recomendado"
                            width={215}
                            height={215}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </section>
            <section className={style.sec1}>
              <h1 className={style.secTitle}>Usuários favoritados:</h1>
              <div className={style.profiles}>
                <Carousel responsive={responsive} className={style.profiles}>
                  {mockFavUsers.map((user, index) => {
                    const userProfile = `/user/${user}`;
                    const userPhoto = mockFavUsersPhoto[index];

                    return (
                      <div className={style.profile} key={index}>
                        <Link href={userProfile || "#"}> 
                          <Image
                            src={userPhoto || '/default-profile.png'}
                            alt="Perfil Recomendado"
                            width={215}
                            height={215}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
