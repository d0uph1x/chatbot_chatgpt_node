import {Configuration, OpenAIApi} from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const { OPENAI_API_KEY } = process.env;
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY
})


const openai = new OpenAIApi(configuration);

export default openai;