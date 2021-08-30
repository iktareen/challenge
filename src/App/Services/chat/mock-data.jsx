import moment from 'moment';

export const dateFormat = 'DD MMM YYYY HH:mm';

export const currentUser = {
  id: 4,
  userName: 'imran',
  userEmail: 'imran@test.com',
}

export const mockedChatData = [
  {
    id: 1,
    message: 'Great resource, thanks',
    timeCreated: moment( new Date('2018/03/10 14:07:03'), dateFormat ),
    user: {
      id: 1,
      userName: 'Ninja',
      userEmail: 'ninja@test.com',
    },
  },
  {
    id: 2,
    message: 'Thankss!!',
    timeCreated: moment( new Date('2018/03/10 14:05:03'), dateFormat ),
    user: {
      id: 2,
      userName: 'I am mister brilliant',
      userEmail: 'abc@test.com',
    },
  },
  {
    id: 3,
    message: 'Thanks Peter',
    timeCreated: moment( new Date('2018/03/10 14:06:03'), dateFormat ),
    user: {
      id: 3,
      userName: 'master57',
      userEmail: 'master@test.com',
    },
  },
];