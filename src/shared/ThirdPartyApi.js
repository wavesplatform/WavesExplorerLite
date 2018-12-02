import axios from 'axios';

const ANTISPAM_LIST_URL = 'https://raw.githubusercontent.com/wavesplatform/waves-community/' +
    'master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Waves%20Community.csv';

export default {
    antispamList: () => axios.get(ANTISPAM_LIST_URL)
}
