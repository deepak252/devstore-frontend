import PropTypes from 'prop-types';

const AppInfo = ({ info, className }) => {
  const appInfo = info?.ipaInfo || info?.apkInfo || {};
  return (
    <div className={className}>
      {appInfo.version && (
        <p>
          Version Name: <span>{appInfo.version}</span>{' '}
        </p>
      )}
      {appInfo.package && (
        <p>
          Pagkage Name: <span>{appInfo.package}</span>
        </p>
      )}
      {appInfo.minSdkVersion && (
        <p>
          Minimum SDK Version: <span>{appInfo.minSdkVersion}</span>
        </p>
      )}
      {appInfo.targetSdkVersion && (
        <p>
          Target SDK Version: <span>{appInfo.targetSdkVersion}</span>
        </p>
      )}
      {appInfo.identifier && (
        <p>
          Bundle Identifier: <span>{appInfo.identifier}</span>
        </p>
      )}
      {appInfo.minOSVersion && (
        <p>
          Minimum OS Version: <span>{appInfo.minOSVersion}</span>
        </p>
      )}
    </div>
  );
};

AppInfo.propTypes = {
  info: PropTypes.object,
  className: PropTypes.string,
};

export default AppInfo;
