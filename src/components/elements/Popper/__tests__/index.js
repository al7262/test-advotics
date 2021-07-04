/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Popper from '../Popper';

describe('src/components/elements/Popper', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Popper />);
    expect(tree).toMatchSnapshot();
  });
});
