/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PeriodSelection from '../PeriodSelection';

describe('src/components/elements/PeriodSelection', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PeriodSelection />);
    expect(tree).toMatchSnapshot();
  });
});
