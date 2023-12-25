import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '../Buttons/IconButton';
import { ReactComponent as CloseIcon } from '../../assets/icons/Close.svg';
import { ReactComponent as AttachmentImageIcon } from '../../assets/icons/AttachmentImage.svg';
import { ReactComponent as AttachmentVideoIcon } from '../../assets/icons/AttachmentVideo.svg';
import { ReactComponent as AttachmentDocIcon } from '../../assets/icons/AttachmentDoc.svg';
import { ATTACHMENT_TYPE } from '../../constants';
import styles from './index.module.scss';

const Attachment = ({
  title,
  subtitle,
  leading,
  trailing,
  type,
  onClick,
  onClose,
  className,
}) => {
  const containerClassnames = classNames(styles.container, className, {
    'c-pointer': onClick,
  });
  const AttachmentIcon = () => {
    if (leading) {
      return leading;
    }
    switch (type) {
      case ATTACHMENT_TYPE.IMAGE:
        return <AttachmentImageIcon className={styles.container__content__icon} />;
      case ATTACHMENT_TYPE.VIDEO:
        return <AttachmentVideoIcon className={styles.container__content__icon} />;
      case ATTACHMENT_TYPE.DOCUMENT:
        return <AttachmentDocIcon className={styles.container__content__icon} />;
      default:
        return;
    }
  };
  return (
    <div onClick={onClick} className={containerClassnames}>
      <div className={styles.container__content}>
        <div style={{display: 'flex'}}>
          {<AttachmentIcon />}
        </div>
        <div className={classNames(styles.container__content__info)}>
          <p className={styles.container__content__info__title}>{title}</p>
          <p className={styles.container__content__info__subtitle}>{subtitle}</p>
        </div>
        {trailing}
      </div>
      {onClose && (
        <IconButton
          onClick={onClose}
          icon={<CloseIcon className='size-20' />}
        />
      )}
    </div>
  );
};

Attachment.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  leading: PropTypes.any,
  trailing: PropTypes.any,
  type: PropTypes.any,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};

Attachment.defaultProps = {
  showText: true,
};
export default Attachment;
