import { Package, History, Status } from '../types/package';
const hist :History = {
  status : 'delievered',
  location: 'Los Angeles',
  timestamp: 1145141919810,
};

const p : Package = {
  tracking : '114514',
  name : 'First Package',
  carrier: '顺丰快递',
  history: hist,
  status : Status.Delivered,
};

const p2 : Package = {
  tracking : '1919810',
  name : 'Second Package',
  carrier: 'USPS',
  history: hist,
  status : Status.OutOfDelivery,
};

export const PackageList = [p, p2];
