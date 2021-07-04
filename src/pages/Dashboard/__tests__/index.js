/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Dashboard from '../Dashboard';

useSelector.mockImplementation((fn) => {
  fn({});
  return ({ bestSelling: [], topCompetitor: [] });
});

describe('src/pages/Dashboard', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Dashboard />);
    expect(tree).toMatchSnapshot();
  });
});
