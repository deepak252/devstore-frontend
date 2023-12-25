import PropTypes from 'prop-types';
import styles from './index.module.scss';

const MyApps = ({user}) => {
  return (
    <div className = {styles.container}>
      
    </div>
  );
};

MyApps.propTypes = {
  user: PropTypes.object
};
export default MyApps;
