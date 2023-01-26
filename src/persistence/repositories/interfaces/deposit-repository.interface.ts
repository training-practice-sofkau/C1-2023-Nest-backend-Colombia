import { DepositEntity } from 'src/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface DepositREpositoryInterface
  extends BaseRepositoryInterface<DepositEntity> {
  findByAccountId(accoundId: string): Array<DepositEntity>;
  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Array<DepositEntity>;
}