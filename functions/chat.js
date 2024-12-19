const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        const { message } = JSON.parse(event.body);

        // OpenAI API call
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer YOUR_OPENAI_API_KEY`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `User: ${message}\nAI:`,
                max_tokens: 150
            })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: data.choices[0].text.trim() })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong' })
        };
    }
};
