import Link from "next/link";
import { Search } from "lucide-react";
import styles from './page.module.css'

export default function filter2(){
    return(
    <div className={styles.searchFilter}>
        <div className={styles.main}>
            <h1 className={styles.title}>
                Filtros de pesquisa
            </h1>

            <p className={styles.filter}>Cultivos</p>
            <hr className={styles.division} />
            <div className={styles.cultures}>
                <div className={styles.culture}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        cultivo 1
                    </p>
                </div>
                <div className={styles.culture}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        cultivo 2
                    </p>
                </div>
                <div className={styles.culture}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        cultivo 3
                    </p>
                </div>
                <div className={styles.culture}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        cultivo 4
                    </p>
                </div>
                <div className={styles.culture}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        cultivo 5
                    </p>
                </div>
                <div className={styles.culture}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        cultivo 6
                    </p>
                </div>
                <div className={styles.culture}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <p>
                        cultivo 7
                    </p>
                </div>
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