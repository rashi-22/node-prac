import { Injectable, NotFoundException } from "@nestjs/common"
import axios from "axios"

@Injectable()
export class JokeService {
    
    async getRandomJoke(): Promise<{joke: String}> {
        const joke = await axios({
            method: "get",
            url: "https://api.chucknorris.io/jokes/random"
        })
        
        if(!joke){
            throw new NotFoundException("Joke Not Found!")
        }
        return {joke: joke.data.value}
    }
}