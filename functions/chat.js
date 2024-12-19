const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        // Parse the incoming message
        const { message } = JSON.parse(event.body);
        if (!message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Message is required.' }),
            };
        }

        // OpenAI API call
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `User: ${message}\nAI:`,
                max_tokens: 150,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ reply: data.choices[0].text.trim() }),
        };
    } catch (error) {
        console.error('Error:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
