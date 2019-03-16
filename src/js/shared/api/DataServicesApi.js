import axios from 'axios';

export const dataServicesApi = (baseUrl) => {
    const get = (url, config) => axios.get(baseUrl + url, config);

    return {
        aliases: {
            address: (alias) => get('/aliases/' + encodeURI(alias))
        }
    };
};
