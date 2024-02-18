import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Attachment from '../../../components/Attachment';
import Loader from '../../../components/Loader';
import { ReactComponent as CheckCircleIcon } from '../../../assets/icons/CheckCircle.svg';
import { ReactComponent as ErrorCircleIcon } from '../../../assets/icons/ErrorCircle.svg';
import { getFileSizeMb } from '../../../utils/fileUtil';
import { ATTACHMENT_TYPE } from '../../../constants';

const AttachmentAppTile = ({ attachmentFile, onRemove, className }) => {
  const uploadProgress = useSelector(
    (state) => state.apps?.appPackage?.progress
  );
  const uploadError = useSelector((state) => state.apps?.appPackage?.error);
  const isUploadingApp = useSelector(
    (state) => state.apps?.appPackage?.isLoading
  );
  const getUploadProgress = () => {
    if (!uploadProgress) {
      return '';
    }
    return ` | ${uploadProgress?.percent} %`;
  };
  return (
    <Attachment
      title={attachmentFile.name}
      subtitle={`${getFileSizeMb(
        attachmentFile.size
      )} MB ${getUploadProgress()}`}
      trailing={
        <div className='mr-8' style={{ display: 'flex' }}>
          {isUploadingApp ? (
            <Loader size='16px' borderWidth='4px' />
          ) : uploadError ? (
            <ErrorCircleIcon className='size-24' />
          ) : (
            <CheckCircleIcon className='size-24' />
          )}
        </div>
      }
      type={ATTACHMENT_TYPE.VIDEO}
      onClose={onRemove}
      className={className}
    />
  );
};

AttachmentAppTile.propTypes = {
  attachmentFile: PropTypes.any,
  onRemove: PropTypes.func,
  className: PropTypes.string,
};
export default AttachmentAppTile;
