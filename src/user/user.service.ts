import { Injectable } from "@nestjs/common"
import  { InjectRepository } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { Repository } from "typeorm"
import { RegisterUserDto } from "./dto/register-user.dto"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async registerUser(user: RegisterUserDto): Promise<User> {
        return this.userRepository.save(user)
    }

    async findOne(condition: any): Promise<User>{
        return this.userRepository.findOneBy(condition);
    }
}