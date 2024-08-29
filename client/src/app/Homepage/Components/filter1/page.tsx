import Link from "next/link";
import { Search } from "lucide-react";
import styles from './page.module.css'

export default function filter1({}){
    return(
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
                        espécie 3
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
                        espécie 3
                    </p>
                </div>
                <div className={styles.specie}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        espécie 3
                    </p>
                </div>
            </div>

            <p className={styles.filter}>Disponibilidade de caixas</p>
            <hr className={styles.division} />
            <input type="number" className={styles.input} />

            <p className={styles.filter}>Localização</p>
            <hr className={styles.division} />
            <div>
                <input type="text" />
                <Search/>
            </div>
        </div>
    )
}