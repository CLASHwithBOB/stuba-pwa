import { USER_STATUS } from 'src/enums/user-status';

export const STATUSES = Object.freeze({
  [USER_STATUS.ONLINE]: { color: 'green-14', label: 'Online' },
  [USER_STATUS.DND]: { color: 'red-14', label: 'Do Not Disturb' },
  [USER_STATUS.OFFLINE]: { color: 'grey-6', label: 'Offline' },
});
