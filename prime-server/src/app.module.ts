import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { UserModule } from "./users/users.module";
import { Users } from './users/users.entity';

@Module({
  imports: [TypeOrmModule.forRoot({}), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
