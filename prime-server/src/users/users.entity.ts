import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;
    @Column ({length: 2048 })
    username: string;
    @Column ({length: 2048 })
    password: string;
    @Column ({length: 2048 })
    firstName: string;
    @Column ({length: 2048 })
    lastName: string;
}