import Link from "next/link";
import { Search } from "lucide-react";
import styles from './page.module.css'

export default function filter1({}){
    return(
        <>
            <h1 className={styles.title}>
                Filtros de pesquisa
            </h1>

            <p className={styles.beeSpecies}>Espécies de abelha</p>

            <div className={styles.specie}>
                <input type="checkbox" />
                <p>
                    espécie 1
                </p>
            </div>
            <div className={styles.specie}>
                <input type="checkbox" />
                <p>
                    espécie 2
                </p>
            </div>
            <div className={styles.specie}>
                <input type="checkbox" />
                <p>
                    espécie 3
                </p>
            </div>

            <p>Disponibilidade de caixas</p>
            <input type="text" className={styles.input} />

            <p>
                
            </p>
        </>
    )
}