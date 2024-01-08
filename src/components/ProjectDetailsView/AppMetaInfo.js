import PropTypes from 'prop-types';

const AppMetaInfo = ({ info, className }) => {
  
  return (
    <div className={className}>
      {info.version && (
        <p>
          Version Name: <span>{info.version}</span>{' '}
        </p>
      )}
      {info.package && (
        <p>
          Pagkage Name: <span>{info.package}</span>
        </p>
      )}
      {info.minSdkVersion && (
        <p>
          Minimum SDK Version: <span>{info.minSdkVersion}</span>
        </p>
      )}
      {info.targetSdkVersion && (
        <p>
          Target SDK Version: <span>{info.targetSdkVersion}</span>
        </p>
      )}
      {info.identifier && (
        <p>
          Bundle Identifier: <span>{info.identifier}</span>
        </p>
      )}
      {info.minOSVersion && (
        <p>
          Minimum OS Version: <span>{info.minOSVersion}</span>
        </p>
      )}
    </div>
  );
};

AppMetaInfo.propTypes = {
  info: PropTypes.object,
  className: PropTypes.string,
};

AppMetaInfo.defaultProps = {
  info: {}
};

export default AppMetaInfo;
