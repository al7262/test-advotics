/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CalendarDaily from '../CalendarDaily';

describe('src/components/elements/CalendarDaily', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CalendarDaily />);
    expect(tree).toMatchSnapshot();
  });
});
