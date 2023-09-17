import { BadRequestException, Controller, Get } from "@nestjs/common";
import { JokeService } from "./joke.service";

@Controller('api')
export class JokeController {

    constructor(private jokeService: JokeService){}

    @Get('random-joke')
    async getRandomJoke(): Promise<{joke: String}>{
        try{
            return this.jokeService.getRandomJoke()
        }catch(ex){
            throw new BadRequestException(ex.message)
        }
    }
}