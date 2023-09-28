import mockData from "../mocks/data"

const API = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=af9d873988bc46b5a7cd70a59c79972e'

export default async function useFetch(hardcodeado: Boolean, id: number) {
    var result = null
    if (hardcodeado) result = mockData  
    try {
        const response = await fetch(API)
        if (!response.ok) throw new Error('Error en la llamada a la API')
        result = await response.json() as Promise<APIResponse>
    } catch (error) {
        console.error(error)
    }
    if (id) {
        let APIInfo = `https://api.spoonacular.com/recipes/${id}/information?apiKey=af9d873988bc46b5a7cd70a59c79972e`
        try {
            const response = await fetch(APIInfo);
            if (!response.ok) throw new Error('Error en la llamada a la API');
            const data = await response.json();
    
            // Extraer los campos que necesitas
            const { id, title, image, summary } = data;
    
            // Crear un objeto con los campos extraídos
            const result = {
                id,
                title,
                image,
                summary
            };
    
            return result;
        } catch (error) {
            console.error(error);
        }
    
        return
    }
        
    
    return result.results
}

export interface APIResponse {
    results:      Result[];
    offset:       number;
    number:       number;
    totalResults: number;
}

export interface Result {
    id:        number;
    title:     string;
    image:     string;
    imageType: ImageType;
}

export enum ImageType {
    Jpg = "jpg",
}
