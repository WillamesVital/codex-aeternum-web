
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function listModels() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
        console.error('Error: GOOGLE_GENERATIVE_AI_API_KEY not found in environment variables.');
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        console.log('Fetching available models...');
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${await response.text()}`);
        }

        const data = await response.json();
        console.log('Available Generative Models:');
        if (data.models) {
            data.models
                .filter((m: any) => m.supportedGenerationMethods.includes('generateContent'))
                .forEach((model: any) => {
                    console.log(model.name.replace('models/', ''));
                });
        } else {
            console.log('No models found in response.');
            console.log(JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error('Error fetching models:', error);
    }
}

listModels();
