import { Injectable } from '@nestjs/common';
import { DataRangeModel } from 'src/data/models/dataRange.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { AccountEntity, DepositEntity } from 'src/data/persistence';
import { DepositRepository } from 'src/data/persistence/repositories/deposit.repository';
import { NewDepositDTO } from 'src/presentation/dtos/new-deposit-dto';

@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositRepository) {}

  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: NewDepositDTO): DepositEntity {
    const newAccount = new AccountEntity();
    newAccount.id = deposit.account;

    const newDeposit = new DepositEntity();
    newDeposit.amount = deposit.amount;
    newDeposit.dateTime = deposit.dateTime;

    return this.depositRepository.register(newDeposit);
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId);
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(
    accountId: string,
    { limit, offset }: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {
    return this.depositRepository.findByAccountIdAndPagination(
      accountId,
      limit,
      offset,
    );
  }
}
