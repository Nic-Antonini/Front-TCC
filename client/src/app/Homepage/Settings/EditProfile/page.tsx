import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '../components/sidebar/page'
import Farmer from '../../../farmer/editProfile/page'

export default function settings(){
    return(
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <Sidebar />
                <Farmer />
            </div>
        </div>
    )
}