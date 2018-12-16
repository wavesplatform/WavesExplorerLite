import axios from 'axios';

export const thirdPartyApi = (antiSpamUrl) => ({
    antispamList: () => axios.get(antiSpamUrl)
});
