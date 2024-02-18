import PropTypes from 'prop-types';

const AppPackageInfo = ({ info, className }) => {
  const packageInfo = info?.ipaInfo || info?.apkInfo || {};
  return (
    <div className={className}>
      {packageInfo.version && (
        <p>
          Version Name: <span>{packageInfo.version}</span>{' '}
        </p>
      )}
      {packageInfo.package && (
        <p>
          Pagkage Name: <span>{packageInfo.package}</span>
        </p>
      )}
      {packageInfo.minSdkVersion && (
        <p>
          Minimum SDK Version: <span>{packageInfo.minSdkVersion}</span>
        </p>
      )}
      {packageInfo.targetSdkVersion && (
        <p>
          Target SDK Version: <span>{packageInfo.targetSdkVersion}</span>
        </p>
      )}
      {packageInfo.identifier && (
        <p>
          Bundle Identifier: <span>{packageInfo.identifier}</span>
        </p>
      )}
      {packageInfo.minOSVersion && (
        <p>
          Minimum OS Version: <span>{packageInfo.minOSVersion}</span>
        </p>
      )}
    </div>
  );
};

AppPackageInfo.propTypes = {
  info: PropTypes.object,
  className: PropTypes.string,
};

export default AppPackageInfo;
