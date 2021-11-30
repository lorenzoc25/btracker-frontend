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

const r1 : History = {
  status: 'Delivered, Front Desk/Reception/Mail Room',
  location: 'LOS ANGELES',
  timestamp: 1637592360000,
};

const r2 : History = {
  status: 'Arrived at Post Office',
  location: 'LOS ANGELES',
  timestamp: 1637581920000,
};

const r3 : History = {
  status: 'Acceptance',
  location: 'LOS ANGELES',
  timestamp: 1637578020000,
};

const r4 : History = {
  status: 'Departed Shipping Partner Facility, USPS Awaiting Item',
  location: 'BUENA PARK',
  timestamp: 1637570040000,
};

const p : Package = {
  tracking: '114514',
  name: 'First Package',
  carrier: '顺丰快递',
  history: [h1, h2, h2, h2, h2],
  status: Status.Delivered,
};

const p2 : Package = {
  tracking: '1919810',
  name: 'Second Package',
  carrier: 'USPS',
  history: [h1],
  status: Status.OutOfDelivery,
};

const rp : Package = {
  tracking: '9361289711007322452059',
  name: 'Package From USPS',
  carrier: 'USPS',
  history: [r1, r2, r3, r4],
  status: Status.Delivered,
};

export const PackageList = [rp, p, p2];
