import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';
import { AccountRepository, CustomerRepository } from 'src/persistence/repositories';
import { NewCustomerDTO } from 'src/dtos/new-customer.dto';
import { DocumentTypeEntity } from 'src/persistence/entities/document-type.entity';
@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository : CustomerRepository,
    private readonly accountRepository: AccountRepository,
    ) {}

    findAll(): CustomerEntity[] {
      return this.customerRepository.findAll();
    }
    newCustomer(customer: NewCustomerDTO): CustomerEntity {
      const documentType = new DocumentTypeEntity();
      documentType.id = customer.documentTypeId;
  
      const newCustomer = new CustomerEntity();
      newCustomer.documentType = documentType;
      newCustomer.document = customer.document;
      newCustomer.fullName = customer.fullName;
      newCustomer.email = customer.email;
      newCustomer.phone = customer.phone;
      newCustomer.password = customer.password;
  
      return this.customerRepository.register(newCustomer);
    }
    
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId);
  
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: CustomerModel): CustomerEntity {
    return this.updatedCustomer(id, customer);
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    const account = this.accountRepository.findByCustomer(id);
    if (account) {
      throw new BadRequestException('El usuario tiene cuenta asociada');
    } else {
      const customer = this.customerRepository.findOneById(id);
      if (customer.deletedAt === undefined) {
        this.customerRepository.delete(id, true);
        return false;
      } else {
        this.customerRepository.delete(id, false);
        return true;
    }
  }
}
}