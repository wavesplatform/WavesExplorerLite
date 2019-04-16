import axios from 'axios';

export const thirdPartyApi = (antiSpamUrl, decompilerUrl) => ({
    antispamList: () => axios.get(antiSpamUrl),
    decompileScript: (scriptBase64) => axios.post(decompilerUrl, scriptBase64)
});
