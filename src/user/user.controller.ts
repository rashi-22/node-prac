import { Controller, Get, Body, Post, Res, Req , BadRequestException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express"

@Controller('api/users')
export class UserController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    @Post("signUp")
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        try{
            const hashPassword = await bcrypt.hash(password.toString(), 12);
            const user =  await this.userService.registerUser({
                name,
                email,
                password: hashPassword
            })
            delete user.password

            return user
        }catch(ex){
            throw new BadRequestException(ex.message)
        }
        
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ){
        try{
            const user = await this.userService.findOne({email})

            if(!user){
                throw new BadRequestException("Invalid User")
            }
            
            if(!await bcrypt.compare(password, user.password)){
                throw new BadRequestException("Invalid User")
            }

            const jwt = await this.jwtService.signAsync({id: user.id})

            response.cookie('jwt', jwt, {httpOnly: true})
            return {
                message : 'success'
            }
        }catch(ex){
            throw new BadRequestException(ex.message)
        }
        
    }

    @Get('me')
    async getMyProfile( 
        @Req() request: Request
    ) {
        try{
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if(!data){
                throw new UnauthorizedException() 
            }
            const user = await this.userService.findOne({id: data.id})
            const {password, ...result} = user;
            return result;
        }catch(e){
            throw new UnauthorizedException()
        }
        
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response){
        
        response.clearCookie('jwt')
        return {
            message: "success"
        }
    }
}