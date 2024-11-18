import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '../components/sidebar/page'
import Farmer from '../../../Farmer/editProfile/page'
import Beekeeper from '../../../Beekeeper/editProfile/page'

export default function editProfile(){
    return(
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <Sidebar />
                <Beekeeper name='Nome do agricultor' description='Informações sobre o agricultor...'
                nameApiary='Nome da propriedade' availability={10}  />
            </div>
        </div>
    )
}