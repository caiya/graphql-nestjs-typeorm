import { Inject, forwardRef } from '@nestjs/common';
import { Query, Mutation, Resolver, ResolveProperty } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { Cat } from "../cats/interfaces/cat.interface";
import { CatsService } from "../cats/cats.service";
import { UserEntity } from "./users.entity";
import { CatEntity } from "../cats/cats.entity";


@Resolver('User')
export class UsersResolvers {

  constructor(
    @Inject(forwardRef(() => CatsService))
    private readonly catsService: CatsService,
    private readonly usersService: UsersService,
  ) { };

  @Query('users')
  async getUsers(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @ResolveProperty('cats')
  async getCats(user): Promise<CatEntity[]> {
    return await this.catsService.findCatsByUserId(user.id);
  }

  @Query('user')
  async getUser(obj, args, context, info): Promise<UserEntity> {
    const {id} = args;
    return await this.usersService.findOneById(id);
  }

  @Query('getCatsByUserId')
  async getCatsByUserId(obj, args, context, info): Promise<Cat[]> {
    const {id} = args;
    return await this.catsService.findCatsByUserId(id);
  }

  @Mutation('createUser')
  async create(obj, args: { user: UserEntity }, context, info): Promise<UserEntity> {
    return this.usersService.create(args.user);
  }

  @Mutation('updateUser')
  async updateUser(obj, args: { id: number, user: UserEntity }, context, info): Promise<any>{
    return await this.usersService.updateOneById(args.id, args.user);
  }

  @Mutation('delUser')
  async delUser(obj, args: { id: number}, context, info): Promise<any>{
    return await this.usersService.delOneById(args.id);
  }
}