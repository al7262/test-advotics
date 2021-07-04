/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Button from '../Button';

describe('src/components/elements/Button', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Button />);
    expect(tree).toMatchSnapshot();
    Button.defaultProps.onClick();
  });

  test('to', () => {
    const result = Button({ ...Button.defaultProps, to: '/abc' });
    expect(result.props.children[0].props.to).toBe('/abc');
  });

  test('loading', () => {
    const props = {
      isLoading: true,
      fixed: true,
      rounded: true,
    };
    const result1 = Button({ ...Button.defaultProps, ...props });
    expect(result1.props.children[1]).toBe('Loading...');
  });

  test('with icon', () => {
    const result = Button({ ...Button.defaultProps, icon: <div /> });
    expect(result.props.children[1].props.children[0].type).toBe('div');
  });
});
