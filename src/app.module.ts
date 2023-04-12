import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { InterestsModule } from './interests/interests.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot(), InterestsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
