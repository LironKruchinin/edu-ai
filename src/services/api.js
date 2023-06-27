
const apiUrl = 'https://api.openai.com/v1/chat/completions'

export async function messageGPT(message) {
    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            body: JSON.stringify({
                'model': 'gpt-3.5-turbo',
                'messages': [
                    {
                        'role': 'system',
                        'content': 'You are a helpful assistant.'
                    },
                    {
                        'role': 'user',
                        'content': message
                    }
                ]
            })
        })
        const data = await res.json()
        const reply = data.choices[0].message.content
        return reply

    } catch (err) {
        throw err
    }
}