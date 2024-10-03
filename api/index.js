import axios from "axios";

const API_KEY = '46311094-4aad7021d01adf86283f1923d'

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`

const formatUrl = (params) => {
    let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true"

    if (!params) return url;
    let paramsKeys = Object.keys(params);
    paramsKeys.map(key => {
        let value = key == 'q' ? encodeURIComponent(params[key]) : params[key];

        url += `&${key}=${value}`
    });


    return url;
}

export const apiCall = async (params) => {
    try {
        const response = await axios.get(formatUrl(params))
        const { data } = response
        return { success: true, data }

    } catch (error) {
        console.log("Got Error", error);
        return { success: false, msg: error.message }
    }

}