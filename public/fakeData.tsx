import { Package, History, Status } from '../types/package';

const h1 :History = {
  status: 'Delievered',
  location: 'Los Angeles',
  message: 'Left at the front door♂.',
  timestamp: 1145141919810,
};

const h2 :History = {
  status: 'In Transit',
  location: 'Santa Barbra',
  message: 'Arrived at local facility',
  timestamp: 1145040619810,
};

const p : Package = {
  tracking: '114514',
  name: 'First Package',
  carrier: '顺丰快递',
  history: [h1, h2],
  status: Status.Delivered,
};

const p2 : Package = {
  tracking: '1919810',
  name: 'Second Package',
  carrier: 'USPS',
  history: [h1],
  status: Status.OutOfDelivery,
};

export const PackageList = [p, p2];
