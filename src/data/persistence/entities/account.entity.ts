import { v4 as uuid  } from "uuid";
import { AccountModel } from "src/data/models";
import { CustomerEntity } from "./customer.entity";
import { AccountTypeEntity } from "./account-type.entity";

export class AccountEntity implements AccountModel {
    id = uuid();
    customer: CustomerEntity;
    accountType: AccountTypeEntity;
    balance: number;
    state = true;
    deletedAt?: Date | number;   
}