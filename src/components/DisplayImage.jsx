/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function DisplayImage({
  image,
  width,
  height,
  containerWidth,
  containerHeight,

}) {
  return (
    <div>
      <div
        className="card mb-3"
        id="HojaCarta"
        style={{
          margin: 0,
          padding: 0,
          width: containerWidth,
          height: containerHeight,
        }}
      >

        <img src={image} style={{ width, height }} className="rounded" alt="" />
      </div>
    </div>

  );
}

DisplayImage.propTypes = {
  image: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  containerHeight: PropTypes.number,
  containerWidth: PropTypes.number,

};

DisplayImage.defaultProps = {
  image: null,
  width: 0,
  height: 0,
  containerWidth: 796,
  containerHeight: 1123,
};
export default DisplayImage;
