import { Package } from './package';

export default interface User {
  email: string,
  username: string,
  password: string,
  packageList: Package[],
}