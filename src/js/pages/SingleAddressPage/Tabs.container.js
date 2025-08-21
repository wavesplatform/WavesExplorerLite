import React from 'react';
import PropTypes from 'prop-types';
import {Navigate} from 'react-router';

import {TabHeader} from './TabHeader.view';
import {RoutedOpenDappButtonContainer} from './OpenDappButton.container';
import {withRouter} from "../../withRouter";

class TabsView extends React.Component {
    static propTypes = {
        activeTab: PropTypes.string,
        basePath: PropTypes.string.isRequired
    };

    static defaultProps = {
        activeTab: undefined
    };

    render() {
        const {activeTab, basePath} = this.props;

        if (!activeTab)
            return null;

        const Component = this.props.children.find(child => child.props.id === activeTab).props.component;

        return (
            <React.Fragment>
                <div className="page-navigation">
                    {this.props.children.map(child => {
                        return <TabHeader key={child.props.id}
                                          id={child.props.id}
                                          basePath={basePath}
                                          isActive={activeTab === child.props.id}
                                          title={child.props.title}
                        />
                    })}
                    <RoutedOpenDappButtonContainer />
                </div>
                <Component />
            </React.Fragment>
        );
    }
}

class TabsContainer extends React.Component {
    static propTypes = {
        defaultTab: PropTypes.string.isRequired,
        basePath: PropTypes.string.isRequired,
        activeTab: PropTypes.string
    };

    static defaultProps = {
        activeTab: undefined
    };

    componentDidMount() {
        const availableTabIds = this.props.children.map(child => child.props.id);

        const activeTab = this.props.params.tab;

        if (!activeTab || !availableTabIds.includes(activeTab)) {
            this.setState({activeTabFound: false});
        }
    }

    render() {
        const {defaultTab, basePath, activeTab} = this.props;
        const availableTabIds = this.props.children.map(child => child.props.id);

        if (!activeTab || !availableTabIds.includes(activeTab)) {
            return <Navigate to={`${basePath}/${defaultTab}`} />;
        }

        return (
            <TabsView basePath={basePath} activeTab={activeTab}>
                {this.props.children}
            </TabsView>
        );
    }
}

export const RoutedTabsContainer = withRouter(TabsContainer);
