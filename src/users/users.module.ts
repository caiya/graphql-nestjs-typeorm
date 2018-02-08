import { Module,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolvers } from './users.resolvers';
import { CatsService } from '../cats/cats.service';
import { CatsModule } from '../cats/cats.module';
import { UserEntity } from './users.entity';

@Module({
  imports: [forwardRef(() => CatsModule), TypeOrmModule.forFeature([UserEntity])],
  components: [UsersService, UsersResolvers],
  exports: [UsersService]
})
export class UsersModule { }
