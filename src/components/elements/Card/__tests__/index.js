/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Card from '../Card';

describe('src/components/elements/Card', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Card />);
    expect(tree).toMatchSnapshot();
  });
});
