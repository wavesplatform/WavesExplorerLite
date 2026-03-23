import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import BlockRef from '../../components/BlockRef';
import Dictionary from '../../components/Dictionary';
import {FinalizationInfo} from './FinalizationInfo.view';
import {withRouter} from '../../withRouter';

const REFRESH_INTERVAL_MS = 15000;

class FinalizationInfoPage extends React.Component {
    requestId = 0;

    heightInputDebounce = null;

    interval = null;

    state = {
        height: null,
        heightInput: '',
        nonCurrentRefreshDone: false,
        generators: [],
        votingHeight: null,
        finalizedHeightAt: null,
        votingDetails: null,
        rowClassByIndex: {},
        headerInfo: {
            currentHeight: null,
            lastFinalizedHeight: null,
            currentPeriodStart: null,
            nextPeriodStart: null,
            finalizationNotActivated: false
        }
    };

    componentWillUnmount() {
        if (this.heightInputDebounce) {
            clearTimeout(this.heightInputDebounce);
            this.heightInputDebounce = null;
        }

        this.removeRefreshInterval();
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.networkId !== prevProps.params.networkId
            || this.props.location.search !== prevProps.location.search) {
            this.removeRefreshInterval();
            this.fetchData().then(this.setRefreshInterval);
        }
    }

    getRequestedHeightFromQuery = () => {
        const params = new URLSearchParams(this.props.location.search || '');
        const value = params.get('height');
        if (!value) {
            return null;
        }

        const parsed = Number.parseInt(value, 10);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
    };

    renderEllipsisValue = (value) => {
        if (!value) {
            return '-';
        }

        return <span className="ellipsis" title={value}>{value}</span>;
    };

    fetchData = () => {
        const {networkId} = this.props.params;
        const finalizationService = ServiceFactory
            .forNetwork(networkId)
            .finalizationService();

        return finalizationService.loadHeaderInfo().then((headerInfo) => {
            if (headerInfo.finalizationNotActivated) {
                this.setState({headerInfo, heightInput: ''});
                return;
            }

            return finalizationService.loadGeneratorsAtCurrentHeight().then(({height}) => {
                const requestedHeight = this.getRequestedHeightFromQuery();
                const selectedHeight = requestedHeight || height;

                const nonCurrentRefreshDone = !(Number.isFinite(headerInfo.currentHeight)
                    && selectedHeight === headerInfo.currentHeight);

                this.setState({headerInfo, heightInput: String(selectedHeight), nonCurrentRefreshDone}, () => {
                    this.loadFinalizationAt(selectedHeight);
                });
            });
        });
    };

    initialFetch = () => this.fetchData().then(this.setRefreshInterval);

    refreshHeaderInfo = () => {
        const {networkId} = this.props.params;

        return ServiceFactory
            .forNetwork(networkId)
            .finalizationService()
            .loadHeaderInfo()
            .then((headerInfo) => {
                if (headerInfo.finalizationNotActivated) {
                    this.setState({headerInfo, nonCurrentRefreshDone: false});
                    return;
                }

                const wasCurrentHeight = Number.isFinite(this.state.height)
                    && Number.isFinite(this.state.headerInfo.currentHeight)
                    && this.state.height === this.state.headerInfo.currentHeight;
                const isNowCurrentHeight = Number.isFinite(this.state.height)
                    && Number.isFinite(headerInfo.currentHeight)
                    && this.state.height === headerInfo.currentHeight;
                const shouldRefreshNonCurrent = !this.state.nonCurrentRefreshDone
                    && wasCurrentHeight
                    && !isNowCurrentHeight;

                if (!shouldRefreshNonCurrent) {
                    this.setState({headerInfo});
                    return;
                }

                this.setState({headerInfo, nonCurrentRefreshDone: true}, () => {
                    this.loadFinalizationAt(this.state.height);
                });
            });
    };

    setRefreshInterval = () => {
        if (this.interval) {
            return;
        }

        this.interval = setInterval(() => {
            this.refreshHeaderInfo().catch(() => {
            });
        }, REFRESH_INTERVAL_MS);
    };

    removeRefreshInterval = () => {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    loadFinalizationAt = (height) => {
        const {networkId} = this.props.params;
        const requestId = ++this.requestId;

        return ServiceFactory
            .forNetwork(networkId)
            .finalizationService()
            .loadFinalizationVotingInfoAt(height)
            .then(({generators, votingHeight, finalizedHeightAt, endorserIndexes, blockGenerator, votingDetails}) => {
                if (requestId !== this.requestId) {
                    return;
                }

                const rowClassByIndex = {};
                endorserIndexes.forEach(index => {
                    rowClassByIndex[index] = 'endorsed';
                });
                generators.forEach((item, index) => {
                    if (blockGenerator && item.address === blockGenerator) {
                        rowClassByIndex[index] = 'miner';
                    }

                    if (item.conflictHeight) {
                        rowClassByIndex[index] = 'conflict-endorser';
                    }
                });

                this.setState({
                    height,
                    generators,
                    votingHeight,
                    finalizedHeightAt,
                    votingDetails,
                    rowClassByIndex
                });
            })
            .catch(() => {
                if (requestId !== this.requestId) {
                    return;
                }

                this.setState({
                    height,
                    generators: [],
                    votingHeight: null,
                    finalizedHeightAt: null,
                    votingDetails: null,
                    rowClassByIndex: {}
                });
            });
    };

    handleHeightInputChange = (e) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        this.setState({heightInput: value});

        if (this.heightInputDebounce) {
            clearTimeout(this.heightInputDebounce);
        }

        if (!value) {
            return;
        }

        const height = Number.parseInt(value, 10);
        if (!Number.isFinite(height) || height < 1) {
            return;
        }

        this.heightInputDebounce = setTimeout(() => {
            const nonCurrentRefreshDone = !(Number.isFinite(this.state.headerInfo.currentHeight)
                && height === this.state.headerInfo.currentHeight);
            this.setState({nonCurrentRefreshDone}, () => {
                this.loadFinalizationAt(height);
            });
        }, 500);
    };

    render() {
        const {headerInfo, height, votingHeight, finalizedHeightAt, rowClassByIndex, votingDetails} = this.state;
        const shouldShowFinalizationUnavailable = headerInfo.finalizationNotActivated;
        const shouldShowVotingHeight = Number.isFinite(height) && Number.isFinite(headerInfo.currentHeight)
            && height === headerInfo.currentHeight;
        const votingInfoRows = [];
        if (shouldShowVotingHeight) {
            votingInfoRows.push({
                label: 'Voting to Finalize Height',
                value: Number.isFinite(votingHeight)
                    ? <BlockRef height={votingHeight} className="no-accent"/>
                    : '-'
            });
            votingInfoRows.push({
                label: 'Finalized Height',
                value: votingDetails && Number.isFinite(votingDetails.finalizedHeight)
                    ? <BlockRef height={votingDetails.finalizedHeight} className="no-accent"/>
                    : '-'
            });
        } else {
            votingInfoRows.push({
                label: `Finalized Height`,
                value: Number.isFinite(finalizedHeightAt) ? finalizedHeightAt : '-'
            });
        }
        votingInfoRows.push({
            label: 'Aggregated Endorsement Signature',
            value: this.renderEllipsisValue(votingDetails && votingDetails.aggregatedEndorsementSignature)
        });

        if (votingDetails && Array.isArray(votingDetails.conflictEndorsements) && votingDetails.conflictEndorsements.length > 0) {
            votingInfoRows.push({
                label: 'Conflict Endorsement 1 Finalized Block Id',
                value: this.renderEllipsisValue(votingDetails.conflictEndorsements[0].finalizedBlockId)
            });
            votingInfoRows.push({
                label: 'Conflict Endorsement 1 Finalized Height',
                value: Number.isFinite(votingDetails.conflictEndorsements[0].finalizedHeight)
                    ? votingDetails.conflictEndorsements[0].finalizedHeight
                    : '-'
            });
            votingInfoRows.push({
                label: 'Conflict Endorsement 1 Signature',
                value: this.renderEllipsisValue(votingDetails.conflictEndorsements[0].signature)
            });
        }

        const votingInfoItems = {
            default: votingInfoRows
        };

        if (votingDetails && Array.isArray(votingDetails.conflictEndorsements) && votingDetails.conflictEndorsements.length > 1) {
            votingDetails.conflictEndorsements.slice(1).forEach((endorsement, i) => {
                const order = i + 2;
                votingInfoItems.default.push({
                    label: `Conflict Endorsement ${order} Finalized Block Id`,
                    value: this.renderEllipsisValue(endorsement.finalizedBlockId)
                });
                votingInfoItems.default.push({
                    label: `Conflict Endorsement ${order} Finalized Height`,
                    value: Number.isFinite(endorsement.finalizedHeight) ? endorsement.finalizedHeight : '-'
                });
                votingInfoItems.default.push({
                    label: `Conflict Endorsement ${order} Signature`,
                    value: this.renderEllipsisValue(endorsement.signature)
                });
            });
        }

        return (
            <div className="loaderWrapper">
                <Loader fetchData={this.initialFetch} errorTitle="Failed to load finalization info">
                    {shouldShowFinalizationUnavailable ? (
                        <Error title="Block Finalization feature is not activated yet."/>
                    ) : (
                        <div className="content card">
                            <div className="info-box">
                                <div className="grid grid-wrap">
                                    <div className="column-sm-6">
                                        <div className="line"><label>Current height:</label></div>
                                        <div className="line">
                                            {Number.isFinite(headerInfo.currentHeight)
                                                ? <BlockRef height={headerInfo.currentHeight} className="no-accent"/>
                                                : '-'}
                                        </div>
                                    </div>
                                    <div className="column-sm-6">
                                        <div className="line"><label>Last Finalized height:</label></div>
                                        <div className="line">
                                            {Number.isFinite(headerInfo.lastFinalizedHeight)
                                                ? <BlockRef height={headerInfo.lastFinalizedHeight}
                                                            className="no-accent"/>
                                                : '-'}
                                        </div>
                                    </div>
                                    <div className="column-sm-6">
                                        <div className="line"><label>Current Period start:</label></div>
                                        <div className="line">
                                            {Number.isFinite(headerInfo.currentPeriodStart)
                                                ?
                                                <BlockRef height={headerInfo.currentPeriodStart} className="no-accent"/>
                                                : '-'}
                                        </div>
                                    </div>
                                    <div className="column-sm-6">
                                        <div className="line"><label>Next Period start:</label></div>
                                        <div className="line">
                                            {Number.isFinite(headerInfo.nextPeriodStart)
                                                ? headerInfo.nextPeriodStart
                                                : '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="headline finalization-controls">
                                <span className="title medium">Finalization Voting Info At</span>
                                <input
                                    id="finalization-height"
                                    type="text"
                                    inputMode="numeric"
                                    value={this.state.heightInput}
                                    onChange={this.handleHeightInputChange}
                                />
                            </div>
                            <div className="finalization-meta">
                                <Dictionary items={votingInfoItems}/>
                            </div>
                            <FinalizationInfo
                                generators={this.state.generators}
                                queryHeight={height}
                                rowClassByIndex={rowClassByIndex}
                            />
                            <div className="finalization-legend">
                                <span className="legend-item miner">Miner</span>
                                <span className="legend-item endorsed">Valid Block Endorser</span>
                                <span className="legend-item conflict-endorser">Conflict Block Endorser</span>
                            </div>
                        </div>
                    )}
                </Loader>
            </div>
        );
    }
}

export const RoutedFinalizationInfoPage = withRouter(FinalizationInfoPage);
