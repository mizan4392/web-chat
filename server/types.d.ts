import { User } from 'src/user/entities/user.entity';

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
