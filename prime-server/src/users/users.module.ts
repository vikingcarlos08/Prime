import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { Users } from "./users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}