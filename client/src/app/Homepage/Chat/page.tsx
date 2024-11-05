'use client'
import styles from './page.module.css';
import SideBar from './Components/page';

export default function Chat(){
    return(
        <div className={styles.allPage}>
            
            <div className={styles.secondDiv}>
                <SideBar/>
                <main className={styles.main}>

                </main>
            </div>
        </div>
    )
}