import { Module } from "@nestjs/common";
import { UserController } from "./user.controller"; 
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root123',
        database: 'user-profile',
        entities: [User],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '1d'}
      })
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {
   
}