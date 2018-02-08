import { Module,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsService } from './cats.service';
import { CatsResolvers } from './cats.resolvers';
import { CatEntity } from './cats.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity]), forwardRef(() => UsersModule)],
  components: [CatsService, CatsResolvers],
  exports: [CatsService]
})
export class CatsModule {}
