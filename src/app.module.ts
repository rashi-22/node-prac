import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JokeModule } from './joke/joke.module';
import { AuthMiddleware } from './middleware/auth';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    }),
    UserModule,
    JokeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware)
    .forRoutes(
      {path:"api/users/me", method: RequestMethod.GET},
      {path:'api/random-joke',method: RequestMethod.GET}
    )
  }
}
