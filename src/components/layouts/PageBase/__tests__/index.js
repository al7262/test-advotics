/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PageBase from '../PageBase';

describe('src/components/layout/PageBase', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageBase />);
    expect(tree).toMatchSnapshot();
  });
});
