/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Header from '../Header';

describe('src/components/elements/Header', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Header />);
    expect(tree).toMatchSnapshot();
  });
});
