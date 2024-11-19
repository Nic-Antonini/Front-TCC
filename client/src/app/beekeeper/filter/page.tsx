'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import styles from './page.module.css'
import axios from "axios";

interface Cultivo {
    Cult_Id: number;
    Cult_Nome: string;
}

export default function filter2(){

    const [cultivos, setCultivos] = useState<Cultivo[]>([]);

    useEffect(() => {
        const fetchCultivos = async () => {
            try {
                console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/cultivo`); // Para confirmar a URL
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/cultivo`);
                setCultivos(response.data.dados); // Assuma que o JSON tem uma propriedade "dados"
            } catch (error) {
                console.error('Erro ao buscar cultivos:', error);
            }
        };

        fetchCultivos();
    }, []);

    return(
    <div className={styles.searchFilter}>
        <div className={styles.main}>
            <h1 className={styles.title}>
                Filtros de pesquisa
            </h1>

            <p className={styles.filter}>Cultivos</p>
            <hr className={styles.division} />
            <div className={styles.cultures}>
            {cultivos.map((cultivo) => (
                <div key={cultivo.Cult_Id} className={styles.culture}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>{cultivo.Cult_Nome}</p>
                </div>
            ))}
            </div>


            <p className={styles.filter}>Localização</p>

            <hr className={styles.division} />

            <div className={styles.inputLocal}>

                <input type="text" className={styles.i}/>
                <Search size={16} color="#ffffff" strokeWidth={2.25} />

            </div>
            <div className={styles.areaButton}>

                <button  className={styles.save}>
                    Salvar
                </button>

            </div>
        </div>
    </div>

    )
}