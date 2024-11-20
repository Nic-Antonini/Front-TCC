'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Sidebar from '../components/sidebar/page';
import Farmer from '../../../Farmer/editProfile/page';
import Beekeeper from '../../../beekeeper/editProfile/page';



export default function EditProfile() {
    return (
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <Sidebar/>
                {/* 
                se o usuário for do tipo 1 = <Beekeeper/>
                se for do tipo 2 = <Farmer/>
                 */}
            </div>
        </div>
    );
}
