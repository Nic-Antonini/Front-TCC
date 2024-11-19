'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import styles from './page.module.css';
import axios from "axios";

interface Especie {
    Espe_Id: number;
    Espe_Nome: string;
}


export default function filter1({}){

    const [especies, setEspecies] = useState<Especie[]>([]);

    useEffect(() => {
        const fetchEspecies = async () => {
            try {
                console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/especie`); // Para confirmar a URL
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/especie`);
                setEspecies(response.data.dados); // Assuma que o JSON tem uma propriedade "dados"
            } catch (error) {
                console.error('Erro ao buscar especie:', error);
            }
        };

        fetchEspecies();
    }, []);

    return(
    <div className={styles.searchFilter}>
        <div className={styles.main}>
            <h1 className={styles.title}>
                Filtros de pesquisa
            </h1>

            <p className={styles.filter}>Espécies de abelha</p>
            <hr className={styles.division} />
            <div className={styles.species}>
            {especies.map((especie) => (
                <div key={especie.Espe_Id} className={styles.specie}>
                    <input type="checkbox" className={styles.checkbox} />
                    <p>{especie.Espe_Nome}</p>
                </div>
            ))}
            </div>

            <p className={styles.filter}>Disponibilidade de caixas</p>
            <hr className={styles.division} />
            <input type="number" className={styles.input} min={1} />

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