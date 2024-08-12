import React from "react";
import style from "./page.module.css";
import Sidebar from './Components/page'

export default function Homepage() {
    return(
        <div className={style.allPage}>
            <div className={style.secondDiv}>
                <Sidebar/>
                <main className={style.main}>
                main
                </main>
            </div>
        </div>
    )
}