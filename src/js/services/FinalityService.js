import {ApiClientService} from './ApiClientService';
import {
    fetchFinalityInfo,
    fetchFinalizedHeight,
    fetchFinalizedHeightAt
} from '@waves/node-api-js/cjs/api-node/finality';

const PERIOD_LENGTH_BY_NETWORK_ID = Object.freeze({
    mainnet: 10000,
    stagenet: 1000,
    testnet: 3000
});
const HEADER_INFO_TTL_MS = 5000;
const GLOBAL_HEADER_INFO_CACHE_KEY = '__WEL_FINALITY_HEADER_INFO__';

const getGlobalHeaderInfoCache = () => {
    if (!globalThis[GLOBAL_HEADER_INFO_CACHE_KEY]) {
        globalThis[GLOBAL_HEADER_INFO_CACHE_KEY] = {};
    }

    return globalThis[GLOBAL_HEADER_INFO_CACHE_KEY];
};

export class FinalityService extends ApiClientService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    loadGeneratorsAt = (height) => {
        return this.getApi().finalityInfo.at(height)
            .then(generators => ({
                height,
                generators: Array.isArray(generators) ? generators : []
            }));
    };

    loadFinalizationVotingInfoAt = async (height) => {
        const api = this.getApi();
        const baseUrl = this.configuration().apiBaseUrl;
        const {generators} = await this.loadGeneratorsAt(height);
        const finalizedHeightAtResponse = await fetchFinalizedHeightAt(baseUrl, height).catch(() => null);
        const header = await api.blocks.headers.at(height).catch(() => null);
        const voting = header && header.finalizationVoting ? header.finalizationVoting : {};

        const endorserIndexes = Array.isArray(voting.endorserIndexes) ? voting.endorserIndexes : [];
        const conflictEndorsements = Array.isArray(voting.conflictEndorsements) ? voting.conflictEndorsements : [];
        const mappedConflictEndorsements = conflictEndorsements.map(item => ({
            finalizedBlockId: item.finalizedBlockId || null,
            finalizedHeight: Number.isFinite(item.finalizedHeight) ? item.finalizedHeight : null,
            signature: item.signature || null
        }));

        return {
            generators,
            votingHeight: generators.length ? Math.max(height - 1, 0) : null,
            finalizedHeightAt: finalizedHeightAtResponse ? finalizedHeightAtResponse.height : null,
            endorserIndexes,
            blockGenerator: header && header.generator ? header.generator : null,
            votingDetails: {
                aggregatedEndorsementSignature: voting.aggregatedEndorsementSignature || null,
                finalizedHeight: Number.isFinite(voting.finalizedHeight) ? voting.finalizedHeight : null,
                conflictEndorsements: mappedConflictEndorsements
            }
        };
    };

    loadGeneratorsAtCurrentHeight = () => {
        const api = this.getApi();

        return api.blocks.height()
            .then(({height}) => this.loadGeneratorsAt(height));
    };

    loadHeaderInfo = async () => {
        const api = this.getApi();
        const configuration = this.configuration();
        const baseUrl = configuration.apiBaseUrl;
        const networkId = configuration.networkId;
        const cache = getGlobalHeaderInfoCache();
        const cached = cache[networkId];
        if (cached && (Date.now() - cached.ts) < HEADER_INFO_TTL_MS) {
            return cached.value;
        }

        const {height: currentHeight} = await api.blocks.height();

        let commitmentPeriodResult;
        try {
            const result = await fetchFinalityInfo(baseUrl);
            commitmentPeriodResult = {ok: true, result};
        } catch (e) {
            commitmentPeriodResult = {ok: false, result: null};
        }

        if (!commitmentPeriodResult.ok) {
            const value = {
                currentHeight,
                lastFinalizedHeight: Math.max(currentHeight - 100, 1),
                currentPeriodStart: null,
                nextPeriodStart: null,
                finalityNotActivated: true
            };

            cache[networkId] = {
                ts: Date.now(),
                value
            };

            return value;
        }

        const finalizedHeader = await fetchFinalizedHeight(baseUrl);
        const commitmentPeriod = commitmentPeriodResult.result;

        const value = {
            currentHeight,
            lastFinalizedHeight: finalizedHeader ? finalizedHeader.height : Math.max(currentHeight - 100, 1),
            currentPeriodStart: commitmentPeriod ? commitmentPeriod.currentGenerationPeriod?.start : null,
            nextPeriodStart: commitmentPeriod ? commitmentPeriod.nextGenerationPeriod?.start : null,
            finalityNotActivated: false
        };

        cache[networkId] = {
            ts: Date.now(),
            value
        };

        return value;
    };
}
