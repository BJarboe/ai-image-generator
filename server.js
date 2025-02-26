import * as dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';

let i = 0;

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) =>  {
    console.log(`Handling request ${i}..`);
    const prompt = req.body.prompt;

    const aiResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: "standard",
    });

    const image = aiResponse.data[0].url
    res.send({ image });
});

app.listen(8080, () => console.log('Make art on http://localhost:8080/dream'));