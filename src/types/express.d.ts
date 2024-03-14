declare namespace Express {
  type IUser = import('../models/User').IUser
  interface User extends IUser {}
}
