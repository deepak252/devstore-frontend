import { useState } from 'react'
import Loader from '../../components/Loader'
import styles from './index.module.scss'
import Modal from '../../components/Modal'
import ModalWrapper from '../../components/Modal/ModalWrapper'
import OutlinedButton from '../../components/Buttons/OutlinedButton'
import FlatButton from '../../components/Buttons/FlatButton'
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className={styles.apps__container}>
      {/* <Loader /> */}
      {/* <LoaderModal isVisible={true}/> */}
      {/* <Modal 
        isOpen={isModalOpen}
        content={<Loader />}
        onClose={()=>setIsModalOpen(false)}
      /> */}

      

      <Modal
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        className={styles.modal}
        closeOnOutsideClick={true}
        showCloseButton={true}
        header={
          <div className={styles.modal__header}>
            <h3>
              Title
            </h3>
          </div>
        }
        footer={
          <>
            <OutlinedButton text={'Cancel'}/>
            <FlatButton text={'Save'}/>
          </>
        }
      >
        <div className={styles.modal__content}>
          hsdf
        </div>
      </Modal>

      {/* {
        isModalOpen && <ModalWrapper
          isOpen={isModalOpen}
          onClose={()=>setIsModalOpen(false)}
          closeOnOutsideClick={true}
        ><Loader /></ModalWrapper>
      } */}
        

    </div>
  )
}

export default Home