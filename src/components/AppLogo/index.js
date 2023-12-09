import ProptTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'
const AppLogo = ({
  logoClass
}) => {
  return (
    <div className={classNames(styles.logo, logoClass)}>
      <span>Dev Store</span>
    </div>
  )
}

AppLogo.propTypes={
  logoClass: ProptTypes.string
}
export default AppLogo