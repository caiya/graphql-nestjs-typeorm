import { Component, forwardRef, Inject } from "@nestjs/common";
import { Cat } from "../cats/interfaces/cat.interface";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from "./users.entity";
import { CatsService } from "../cats/cats.service";
import { CatEntity } from "../cats/cats.entity";

@Component()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  create(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOneById(uid: number): Promise<UserEntity> {
    return this.userRepository.findOneById(uid);
  }

  updateOneById(uid: number, user: UserEntity) {
    user = Object.setPrototypeOf(user, {});
    return this.userRepository.updateById(uid, user);
    // const qb = this.userRepository.createQueryBuilder('user');
    // return qb.update(UserEntity).setParameters(user).where("user.id = :id", { id: uid }).execute();
  }

  delOneById(uid: number) {
    return this.userRepository.deleteById(uid);
  }
}