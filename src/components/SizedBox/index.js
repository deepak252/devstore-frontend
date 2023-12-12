import PropTypes from 'prop-types';

const SizedBox = ({
  height,
  width,
  style
}) => {
  return (
    <div style={{height: height, width: width, ...style}} />
  )
}

SizedBox.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.object
}

SizedBox.defaultProps = {
  height: '8px',
  width: '8px',
}

export default SizedBox
