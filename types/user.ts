import { Package } from './Package';

export default interface User {
  email: string,
  username: string,
  password: string,
  packageList: Package[],
}