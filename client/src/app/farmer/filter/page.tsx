import Link from "next/link";
import { Search } from "lucide-react";
import styles from './page.module.css'

export default function filter1({}){
    return(
    <div className={styles.searchFilter}>
        <div className={styles.main}>
            <h1 className={styles.title}>
                Filtros de pesquisa
            </h1>

            <p className={styles.filter}>Espécies de abelha</p>
            <hr className={styles.division} />
            <div className={styles.species}>
                <div className={styles.specie}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        espécie 1
                    </p>
                </div>
                <div className={styles.specie}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        espécie 2
                    </p>
                </div>
                <div className={styles.specie}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        espécie 3
                    </p>
                </div>
                <div className={styles.specie}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        espécie 4
                    </p>
                </div>
                <div className={styles.specie}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        espécie 5
                    </p>
                </div>
                <div className={styles.specie}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        espécie 6
                    </p>
                </div>
                <div className={styles.specie}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        espécie 7
                    </p>
                </div>
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