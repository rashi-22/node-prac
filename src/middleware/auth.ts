import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private jwtService: JwtService){}
    async use(request: Request, response: Response, next: NextFunction){
        const cookie = request.cookies['jwt']
        if(!cookie){
            throw new UnauthorizedException()
        }
        const data =  await this.jwtService.verifyAsync(cookie);
        if(!data?.id){
            throw new UnauthorizedException()
        }
        next()
    }
}