export async function fetchAPI(endpoint) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`
            },
        })
        const json = await res.json()
        return json.data
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

export function getImage(endpoint) {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${endpoint}`
}