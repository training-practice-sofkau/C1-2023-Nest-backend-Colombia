import { AccountModel, TransferModel } from 'src/data/models';
import { v4 as uuid } from 'uuid';

export class TransferEntity implements TransferModel {
  id = uuid();
  outCome: AccountModel;
  inCome: AccountModel;
  amount: string;
  reason: string;
  dateTime: number | Date;
  deletedAt?: number | Date;
}
