/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import DisplayImage from './DisplayImage';

const DECIMAL_BASE = 10;

class ImageProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: null,
      image: null,
      isToggleOn: true,
      width: null,
      imageprocess: null,
      process: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      ...state,
      isToggleOn: !state.isToggleOn,
    }));
    this.convertSize();
  }

  onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const img = new Image();
      const src = URL.createObjectURL(event.target.files[0]);

      img.onload = () => {
        const { height, width } = img;
        this.setState((state) => ({
          ...state,
          height,
          width,
          process: false,
        }));
      };

      img.src = src;

      this.setState((state) => ({
        ...state,
        image: src,
      }));
    }
  }

  get orientation() {
    let orientation = 'Cuadrado';
    if (this.state.width > this.state.height) {
      orientation = 'Horizontal';
    }
    if (this.state.width < this.state.height) {
      orientation = 'Vertical';
    }
    return orientation;
  }

  get imagesize() {
    const { height, width } = this.state;
    return height && width && ` ${parseInt(width, DECIMAL_BASE)} x ${parseInt(height, DECIMAL_BASE)} , Orientacion ${this.orientation} , Proporcion ${this.proportion}`;
  }

  get proportion() {
    const { height, width } = this.state;
    const gcd = this.aspectRatio(width, height);
    return (`${width / gcd} : ${height / gcd}`);
  }

  get imageprocess() {
    const { process, imageprocess, image } = this.state;
    return process ? imageprocess : image;
  }

  aspectRatio(a, b) {
    return (b === 0) ? a : this.aspectRatio(b, a % b);
  }

  convertSize() {
    const maxWidth = 796;
    const maxHeight = 1123;
    const { image } = this.state;
    let { width, height } = this.state;
    let ratio = 0;
    const imageprocess = new Image();
    imageprocess.src = image;

    if (width > maxWidth) {
      ratio = maxWidth / width;
      height *= ratio; // Reset height to match scaled image
      width *= ratio; // Reset width to match scaled image
    }

    // Check if current height is larger than max
    if (height > maxHeight) {
      ratio = maxHeight / height;
      width *= ratio; // Reset width to match scaled image
      height *= ratio; // Reset height to match scaled image
    }

    this.setState((state) => ({
      ...state,
      width, // parseInt(width, DECIMAL_BASE),
      height, // parseInt(height, DECIMAL_BASE),
      process: true,
      isToggleOn: true,
      imageprocess: imageprocess.src,
    }));
  }

  render() {
    return (
      <div className="container text-white">
        Puedes agregar tu imagen Aqui sera ajustada sin perder su proporcion !!!

        <div className="card-body" id="div1" style={{ backgroundColor: 'black' }}>
          {this.imagesize}
          <DisplayImage
            image={this.imageprocess}
            width={this.state.width}
            height={this.state.height}
          />
          <div className="input-group">
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={this.onImageChange} />
              <label className="custom-file-label" htmlFor="inputGroupFile04">Sube tu imagen</label>
            </div>
            <div className=" outline-secondary">
              <button className="btn btn-outline-secondary" onClick={this.handleClick} type="button" id="inputGroupFileAddon04">
                {this.state.isToggleOn ? 'Procesar' : 'Procesando'}
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default ImageProcess;
