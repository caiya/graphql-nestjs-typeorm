import { Component, Inject, forwardRef } from '@nestjs/common';
import { CatEntity } from './cats.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Component()
export class CatsService {

  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
  ) { }

  create(cat: CatEntity): Promise<CatEntity> {
    return this.catRepository.save(cat);
  }

  findAll(): Promise<CatEntity[]> {
    return this.catRepository.find();
  }

  findOneById(id: number): Promise<CatEntity> {
    return this.catRepository.findOneById(id);
  }

  findCatsByUserId(id: number): Promise<CatEntity[]> {
    return this.catRepository.find({
      userId: id
    })
  }
}
