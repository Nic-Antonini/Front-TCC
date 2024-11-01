import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '../components/sidebar/page'
import Farmer from '../../../farmer/editProfile/page'
import Beekeeper from '../../../beekeeper/editProfile/page'

export default function editProfile(){
    return(
        <div className={styles.allPage}>
            <div className={styles.secondDiv}>
                <Sidebar />
                <Beekeeper name='Nome do apicultor' description='Informações sobre o apicultor...'
                nameFarm='Nome do apiário' hectares={10}/>
            </div>
        </div>
    )
}