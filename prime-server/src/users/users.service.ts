import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>){}

    async getUser(userID: number): Promise<Users>{
        return this.usersRepository.findOne(userID);
    }

    async getAllUser(): Promise<Users[]>{
        return this.usersRepository.find();
    }

    async CreateUser(userObj: UserDTO): Promise<Users>{
        const user = new Users();
        console.log(userObj)
        user.username = userObj[0].username;
        user.password = userObj[0].password;
        user.firstName = userObj[0].firstName;
        user.lastName = userObj[0].lastName;
        console.log(user)
        return this.usersRepository.save(user);
    }
}