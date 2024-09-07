import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '../components/sidebar/page'
import Farmer from '../../../farmer/editProfile/page'

export default function editProfile(){
    return(
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <Sidebar />
                <Farmer name='Nome do agricultor' description='Informações sobre o agricultor...'/>
            </div>
        </div>
    )
}