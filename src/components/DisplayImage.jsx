/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function DisplayImage({
  image,
  width,
  height,

}) {
  return (
    <div>
      <div
        className="card mb-3"
        style={{
          margin: 0,
          padding: 0,
          width: 796,
          height: 1123,
          marginLeft: 69,
        }}
      >
        <div
          className="card-body"
          style={{
            margin: 0,
            padding: 0,
            width: 796,
            height: 1123,
          }}
        >

          <img src={image} style={{ width, height }} className="rounded" alt="" />
        </div>
      </div>
    </div>

  );
}

DisplayImage.propTypes = {
  image: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,

};

DisplayImage.defaultProps = {
  image: null,
  width: 0,
  height: 0,
};
export default DisplayImage;
