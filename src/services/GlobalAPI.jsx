import axios from "axios"

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText/'

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.photos'
    }
}

export const GetPlacesDetails = (query) => axios.post(BASE_URL, query, config)