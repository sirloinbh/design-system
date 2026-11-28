import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  DescriptionItem,
  DescriptionList,
} from '../../src/components/description-list/description-list';

const meta = {
  title: 'Components/DescriptionList',
  component: DescriptionList,
  args: { 'aria-label': 'Body measurements' },
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionItem label="Weight">72.5 kg</DescriptionItem>
      <DescriptionItem label="Body fat">18.2%</DescriptionItem>
      <DescriptionItem label="Waist">80 cm</DescriptionItem>
      <DescriptionItem label="Blood pressure">118/76 mmHg</DescriptionItem>
      <DescriptionItem label="Resting heart rate">58 bpm</DescriptionItem>
      <DescriptionItem label="Sleep">7h 20m</DescriptionItem>
    </DescriptionList>
  ),
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OneColumn: Story = { args: { columns: 1 } };

export const TwoColumns: Story = { args: { columns: 2 } };

export const ThreeColumns: Story = { args: { columns: 3 } };
