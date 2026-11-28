import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../src/components/table/table';

const rows = [
  { month: 'October', income: '3,200', spent: '1,200', saved: '2,000' },
  { month: 'November', income: '3,200', spent: '980', saved: '2,220' },
  { month: 'December', income: '3,400', spent: '1,640', saved: '1,760' },
];

const meta = {
  title: 'Components/Table',
  component: Table,
  args: { label: 'Monthly savings' },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Monthly savings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead numeric>Income</TableHead>
          <TableHead numeric>Spent</TableHead>
          <TableHead numeric>Saved</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.month}>
            <TableHead scope="row" className="font-normal">
              {row.month}
            </TableHead>
            <TableCell numeric>{row.income}</TableCell>
            <TableCell numeric>{row.spent}</TableCell>
            <TableCell numeric>{row.saved}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/** Wider than the screen: the table scrolls inside its frame and the first column stays in place. */
export const ScrollsSideways: Story = {
  render: (args) => (
    <Table {...args} className="min-w-[44rem]">
      <TableCaption>Monthly savings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead sticky>Month</TableHead>
          {['Income', 'Rent', 'Food', 'Travel', 'Other', 'Saved'].map((name) => (
            <TableHead key={name} numeric>
              {name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.month}>
            <TableHead scope="row" sticky className="font-normal">
              {row.month}
            </TableHead>
            {[row.income, '800', '240', '60', '100', row.saved].map((value, i) => (
              <TableCell key={i} numeric>
                {value}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
