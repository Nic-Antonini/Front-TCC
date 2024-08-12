import React from "react";
import style from "./page.module.css"
import {House} from "lucide-react"

export default function Sidebar(){
    return(
        <aside className={style.sidebar}>
            <House />
        </aside>
    )
}