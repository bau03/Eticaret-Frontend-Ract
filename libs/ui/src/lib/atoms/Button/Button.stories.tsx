import React from 'react';
import { Button } from './Button';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import styled from 'styled-components';

export default {
  title: 'Atoms/Button',
};

const button = (args) => (
  <Button disabled={boolean('Disabled', false)} onClick={action('onClicked')} {...args}>
    {text('Label', 'Test Button')}
  </Button>
);

export const Primary = button.bind({});
Primary.args = {
  variant: 'primary',
  style: {width: '500px'}
};
export const Success = button.bind({});
Success.args = {
  variant: 'success',
};
