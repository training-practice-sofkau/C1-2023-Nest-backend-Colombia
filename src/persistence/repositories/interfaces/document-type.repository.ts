import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from 'src/persistence/entities/document-type.entity';

@Injectable()
export class DocumentTypeRepository {
  private readonly database: Array<DocumentTypeEntity>;

  constructor() {
    this.database = new Array<DocumentTypeEntity>();
  }

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }
}