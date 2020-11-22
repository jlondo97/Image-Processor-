/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import DisplayImage from './DisplayImage';

const DECIMAL_BASE = 10;
const INITIAL_WIDTH = 796;
const INITIAL_HEIGHT = 1123;

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
      containerWidth: INITIAL_WIDTH,
      containerHeigth: INITIAL_HEIGHT,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
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
        this.setState({
          height,
          width,
          process: false,
        });
      };

      img.src = src;

      this.setState({
        image: src,
      });
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
    const { image, containerHeigth, containerWidth } = this.state;
    const imageprocess = new Image();
    let { width, height } = this.state;
    let maxHeight = containerHeigth;
    let maxWidth = containerWidth;
    let ratio = 0;

    imageprocess.src = image;

    if (this.orientation === 'Horizontal') {
      maxWidth = containerHeigth;
      maxHeight = containerWidth;
      this.setState({
        containerHeigth: INITIAL_WIDTH,
        containerWidth: INITIAL_HEIGHT,
      });
    }

    if (this.orientation === 'Vertical') {
      maxWidth = INITIAL_WIDTH;
      maxHeight = INITIAL_HEIGHT;
      this.setState({
        containerHeigth: INITIAL_HEIGHT,
        containerWidth: INITIAL_WIDTH,
      });
    }
    // eslint-disable-next-line no-debugger
    // debugger;
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

    this.setState({
      width,
      height,
      process: true,
      isToggleOn: true,
      // containerHeigth: maxHeight,
      // containerWidth: maxWidth,
      imageprocess: imageprocess.src,
    });
  }

  render() {
    return (
      <div className="container text-white">
        <div className="input-group">
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={this.onImageChange} />
            <label className="custom-file-label" htmlFor="inputGroupFile04">Sube tu imagen</label>
          </div>
          <div className=" outline-secondary">
            <button className="btn btn-light" onClick={this.handleClick} type="button" id="inputGroupFileAddon04">
              {this.state.isToggleOn ? 'Procesar' : 'Procesando'}
            </button>
          </div>
        </div>
        <div className="card-body" id="div1">
          {this.imagesize}
          <DisplayImage
            image={this.imageprocess}
            width={this.state.width}
            height={this.state.height}
            containerHeight={this.state.containerHeigth}
            containerWidth={this.state.containerWidth}
          />

        </div>

      </div>
    );
  }
}

export default ImageProcess;
