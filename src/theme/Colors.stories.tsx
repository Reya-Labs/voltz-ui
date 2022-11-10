import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import colors from './colors';
import { BaseColors } from './types';

const ColorTile: React.FunctionComponent<{ name: string; value: string }> = ({ name, value }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid gainsboro',
      padding: 8,
    }}
  >
    <span>{name}</span>
    <span>{value}</span>
    <div style={{ width: 36, height: 36, backgroundColor: value, borderRadius: '50%' }} />
  </div>
);

export default {
  title: 'Foundation/Colors',
  component: ColorTile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ColorTile>;

const AllColorsTemplate: ComponentStory<typeof React.Fragment> = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: Array.from({ length: 9 })
        .map((_) => '1fr')
        .join(' '),
      gap: 4,
      background: 'white',
      zIndex: 1,
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      overflowY: 'scroll',
    }}
  >
    {Object.keys(colors)
      .sort()
      .map((c) => (
        <ColorTile key={`colors.${c}`} name={`colors.${c}`} value={colors[c as BaseColors]} />
      ))}
  </div>
);

export const Colors = AllColorsTemplate.bind({});
Colors.args = {};
