import { Injectable } from '@nestjs/common';
import { TransferDTO } from 'src/business/dtos';
import {
  DataRangeModel,
  PaginationModel,
  TransferModel,
} from '../../../data/models';
import { TransferEntity } from '../../../data/persistence/entities';
import {
  AccountRepository,
  TransferRepository,
} from '../../../data/persistence/repositories';
@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountRepository: AccountRepository,
  ) {}
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: TransferDTO): TransferModel {
    const newTransfer = new TransferEntity();
    newTransfer.inCome = this.accountRepository.findOneById(transfer.inComeId);
    newTransfer.outCome = this.accountRepository.findOneById(
      transfer.outComeId,
    );
    newTransfer.amount = Number(transfer.amount);
    newTransfer.reason = transfer.reason;
    newTransfer.dateTime = Number(transfer.dateTime);

    return this.transferRepository.register(newTransfer);
  }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    if (dataRange) {
      const array = this.transferRepository
        .findOutcomeByDataRange(
          accountId,
          dataRange.startDate ?? 0,
          dataRange.endDate ?? Date.now(),
        )
        .filter(
          (item) =>
            item.outCome.id === accountId &&
            item.amount > (dataRange.startAmount ?? 0) &&
            item.amount < (dataRange.endAmount ?? Number.MAX_SAFE_INTEGER),
        );
      return array.slice(
        pagination.length * pagination.page,
        pagination.length * pagination.page + pagination.length,
      );
    }
    return [];
  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryIn(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    if (dataRange) {
      const array = this.transferRepository
        .findIncomeByDataRange(
          accountId,
          dataRange.startDate ?? 0,
          dataRange.endDate ?? Date.now(),
        )
        .filter(
          (item) =>
            item.inCome.id === accountId &&
            item.amount > (dataRange.startAmount ?? 0) &&
            item.amount < (dataRange.endAmount ?? Number.MAX_SAFE_INTEGER),
        );
      return array.slice(
        pagination.length * pagination.page,
        pagination.length * pagination.page + pagination.length,
      );
    }
    return [];
  }

  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    if (dataRange) {
      const newArray = this.transferRepository.findByDataRange(
        dataRange.startDate ?? 0,
        dataRange.endDate ?? Date.now(),
      );
      const array = newArray.filter(
        (item) =>
          (item.inCome.id === accountId || item.outCome.id === accountId) &&
          (item.amount >= Number(dataRange.startAmount) ?? 0) &&
          (item.amount <= Number(dataRange.endAmount) ?? Number.MAX_VALUE),
      );
      return array.slice(
        pagination.length * pagination.page,
        pagination.length * pagination.page + pagination.length,
      );
    }
    const start = pagination.length * pagination.page;
    const end = start + Number(pagination.length);
    const array = this.transferRepository
      .findAll()
      .filter(
        (item) => item.inCome.id === accountId || item.outCome.id === accountId,
      )
      .slice(start, end);
    return array;
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId);
  }

  selectTransfer(transferId: string): TransferEntity {
    return this.transferRepository.findOneById(transferId);
  }
}
