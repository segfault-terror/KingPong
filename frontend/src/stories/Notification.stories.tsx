import type { Meta, StoryObj } from '@storybook/react';
import Notification from '../components/Notification';

const NotificationState = {
  notification: [
      {
          type: 'Game' as const,
          sender: {
              name: 'John Doe',
              image: 'https://robohash.org/10',
          },
      },
      {
          type: 'friend' as const,
          sender: {
              name: 'John Doe',
              image: 'https://robohash.org/20',
          },
      },
  ],
};


const meta: Meta<typeof Notification> = {
    component: Notification,
    title: 'Dashboard/Notification',
};
export default meta;

export const Default: StoryObj<typeof Notification> = {
    render: (props) => <Notification {...props} />,
    args: {
		message: () => {return (<div>Akashi invited you to play normal mode</div>)},
		type: 'error',
		sender: 'whoops',
    },
};
