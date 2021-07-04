/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Chart from '../Chart';

describe('src/components/elements/Chart', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Chart />);
    expect(tree).toMatchSnapshot();
  });
});
