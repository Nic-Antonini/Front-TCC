// src/types.ts
export interface UserData {
    name: string;
    description: string;
    profileImage: string;
    profileCover: string;
    userType: number; // 1 = Apicultor, 2 = Agricultor
    nameApiary: string;
    nameFarm: string;
    hectares: number;
    availability: number;
    lat: number;
    lng: number;
    city: string;
    state: string;
    cultivosSelecionados: number[];
    especiesSelecionadas: number[];
  }
  