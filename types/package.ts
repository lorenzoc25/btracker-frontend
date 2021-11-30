export interface History {
  status: string;
  location: string;
  timestamp: number;
  message : string;
}

export enum Status {
  LabelCreated = 'Label Created',
  InTransit = 'In Transit',
  Accepted = 'Accepted',
  Delivered = 'Delivered',
}

export interface Package {
  tracking: string;
  carrier: string;
  name: string;
  history: History[];
  status: Status;
}
