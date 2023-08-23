export const apiPostRequest = async (endpoint, data, headerProperties) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headerProperties
            },
            body: JSON.stringify(data)
        })
        const res = await response.json()
        return res
    } catch (error) {
        throw (error)
    }
}