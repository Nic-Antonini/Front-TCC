"use client";
import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import Sidebar from "./Components/sidebar/page";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface User {
  userId: string;
  userName: string;
  userPhoto: string;
  userProfile: string;
}

export default function Homepage() {
  const [randomUsers, setRandomUsers] = useState<User[]>([]);
  const [nearbyUsers, setNearbyUsers] = useState<User[]>([]);
  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);
  const [userType, setUserType] = useState<number | null>(null);
  const [myProfileLink, setMyProfileLink] = useState<string | null>(null);
  const [myPhoto, setMyPhoto] = useState<string>("/default-profile.png");

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Decodificar token
        const decodedToken: any = jwtDecode(token);
        const { userId, userType } = decodedToken;

        setUserType(userType);
        setMyProfileLink(userType === 1 ? "/beekeeper/profile" : "/Farmer/profile");

        // Buscar informações do usuário logado
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/${userId}`);
        const userData = userResponse.data.dados;
        setMyPhoto(userData.profileImage);

        // Função para determinar rotas de usuários recomendados com base no tipo do usuário logado
        const getUserProfileLink = (recommendedUserId: string) =>
          userType === 1
            ? `/Farmer/publicProfile/${recommendedUserId}`
            : `/beekeeper/publicProfile/${recommendedUserId}`;

        // Buscar usuários recomendados
        const randomResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/recomendados/${userId}`
        );
        setRandomUsers(
          randomResponse.data.dados.map((user: any) => ({
            userId: user.Usu_Id,
            userName: user.Usu_NomeCompleto,
            userPhoto: user.profileImage, // URL completa da API
            userProfile: getUserProfileLink(user.Usu_Id),
          }))
        );

        // Buscar usuários próximos
        const nearbyResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/proximos/${userId}`
        );
        setNearbyUsers(
          nearbyResponse.data.dados.map((user: any) => ({
            userId: user.Usu_Id,
            userName: user.Usu_NomeCompleto,
            userPhoto: user.profileImage,
            userProfile: getUserProfileLink(user.Usu_Id),
          }))
        );

        // Buscar usuários favoritados
        const favoritesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/favoritos/${userId}`
        );
        setFavoriteUsers(
          favoritesResponse.data.dados.map((user: any) => ({
            userId: user.Usu_Id,
            userName: user.Usu_NomeCompleto,
            userPhoto: user.profileImage,
            userProfile: getUserProfileLink(user.Usu_Id),
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const renderCarousel = (users: User[]) => (
    <Carousel responsive={responsive} className={style.profiles}>
      {users.map((user, index) => (
        <div className={style.profile} key={index}>
          <Link href={user.userProfile}>
            <Image
              src={user.userPhoto || "/default-profile.png"}
              alt={user.userName}
              width={215}
              height={215}
              className={style.profileImg}
            />
          </Link>
        </div>
      ))}
    </Carousel>
  );

  return (
    <div className={style.allPage}>
      <div className={style.secondDiv}>
        <Sidebar />
        <main className={style.main}>
          <div className={`${style.myProfileDiv}`}>
            {myProfileLink && (
              <Link href={myProfileLink}>
                <Image
                  alt="Meu Perfil"
                  src={myPhoto}
                  className={`${style.myProfile} ${userType === 1 ? style.apicultorProfile : style.agricultorProfile}`}
                  width={50}
                  height={50}
                  priority
                />
              </Link>
            )}
          </div>
          <div className={style.sections}>
            <section className={style.sec1}>
              <h1 className={style.secTitle}>Usuários que talvez você se interesse:</h1>
              {renderCarousel(randomUsers)}
            </section>
            <section className={style.sec1}>
              <h1 className={style.secTitle}>Usuários mais próximos de você:</h1>
              {renderCarousel(nearbyUsers)}
            </section>
            <section className={style.sec1}>
              <h1 className={style.secTitle}>Usuários favoritados:</h1>
              {renderCarousel(favoriteUsers)}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
