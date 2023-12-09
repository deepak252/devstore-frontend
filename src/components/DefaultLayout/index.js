import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import styles from './index.module.scss'
const DefaultLayout = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default DefaultLayout