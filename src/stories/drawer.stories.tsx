import type { Meta, StoryObj } from '@storybook/react';
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerClose 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import React from 'react';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger children="Open" />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle children="Are you sure absolutely sure?" />
          <DrawerDescription children="This action cannot be undone." />
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithSnapPoints: Story = {
  render: (args) => (
    <Drawer {...args} snapPoints={[0.5, 0.8]}>
      <DrawerTrigger children="Open" />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle children="Drawer with Snap Points" />
          <DrawerDescription children="This drawer has multiple snap points" />
        </DrawerHeader>
        <DrawerFooter>
          <Button>Action</Button>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
