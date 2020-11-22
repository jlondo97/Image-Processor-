import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DisplayImage from '../components/DisplayImage';
import ImageProcess from '../components/ImageProcess';

configure({ adapter: new Adapter() });

describe('DisplayImage SuitTest', () => {
  test('render DisplayImage', () => {
    const component = renderer.create(
      <DisplayImage
        image="https://cumbrepuebloscop20.org/wp-content/uploads/2018/09/Oso-Pardo-1.jpg"
        width={1140}
        height={654}
      />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('ImageProcess SuitTest', () => {
  test('convertSize is sucessfully ', () => {
    const component = shallow(
      <ImageProcess />,
    );
    const initialState = {
      image: 'https://cumbrepuebloscop20.org/wp-content/uploads/2018/09/Oso-Pardo-1.jpg',
      isToggleOn: true,
      width: 1140,
      height: 654,
      imageprocess: null,
      process: false,
    };
    component.setState(initialState);
    const expectWidth = 1123;
    const expectHeigth = 644;
    component.instance().convertSize();

    expect(parseInt(component.state('width'), 10)).toEqual(expectWidth);
    expect(parseInt(component.state('height'), 10)).toEqual(expectHeigth);
  });
});
