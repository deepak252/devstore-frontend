import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Attachment from '../../../components/Attachment';
import Loader from '../../../components/Loader';
import { ReactComponent as CheckCircleIcon } from '../../../assets/icons/CheckCircle.svg';
import { ReactComponent as ErrorCircleIcon } from '../../../assets/icons/ErrorCircle.svg';
import { getFileSizeMb } from '../../../utils/fileUtil';
import { ATTACHMENT_TYPE } from '../../../constants';

const AttachmentAppTile = ({ attachmentFile, onRemove, className }) => {
  const uploadAppProgress = useSelector(
    (state) => state.apps?.uploadAppProgress
  );
  const uploadAppError = useSelector((state) => state.apps?.uploadAppError);
  const isUploadingApp = useSelector((state) => state.apps?.isUploadingApp);
  const getUploadProgress = () => {
    if (!uploadAppProgress) {
      return '';
    }
    return ` | ${uploadAppProgress?.percent} %`;
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
          ) : uploadAppError ? (
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
