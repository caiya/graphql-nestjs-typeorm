import { Component, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { Query, Mutation, Resolver, DelegateProperty, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { CatsService } from './cats.service';
import { CatsGuard } from './cats.guard';
import { CatEntity } from './cats.entity';
import { ResolveProperty } from '@nestjs/graphql/decorators/resolvers.decorators';
import { UsersService } from '../users/users.service';

const pubsub = new PubSub();

@Resolver('Cat')
export class CatsResolvers {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly catsService: CatsService,
  ) { }

  @Query('cats')
  // @UseGuards(CatsGuard)
  async getCats() {
    return await this.catsService.findAll();
  }

  @Query('cat')
  async findOneById(obj, args, context, info): Promise<CatEntity> {
    const { id } = args;
    return await this.catsService.findOneById(+id);
  }

  @ResolveProperty('user')
  async findUser(cat) {
    // return await this.catsService.findUserById(cat.userId);
    return await this.usersService.findOneById(cat.userId);
  }

  @Mutation('createCat')
  async create(obj, args: { cat: CatEntity }, context, info): Promise<CatEntity> {
    const createdCat = await this.catsService.create(args.cat);
    pubsub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Subscription('catCreated')
  catCreated() {
    return {
      subscribe: () => pubsub.asyncIterator('catCreated'),
    };
  }
}
