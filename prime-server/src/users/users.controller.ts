import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common";
import { UserService } from "./users.service";
import { Users } from "./users.entity";
import { UserDTO } from "./dto/user.dto";
import { query } from "express";

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get('getUser')
    getOne(@Query() query): Promise <Users>{
        return this.userService.getUser(query);
    }

    @Get()
    getAll(): Promise <Users[]>{
        return this.userService.getAllUser();
    }
    
    @Post()
    createUser(@Body() UserDTO: UserDTO): Promise<Users>{
        return this.userService.CreateUser(UserDTO);
    }

}