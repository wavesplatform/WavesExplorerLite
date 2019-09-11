import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect, withRouter} from 'react-router';

import {TabHeader} from './TabHeader.view';

class TabsView extends React.Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        basePath: PropTypes.string.isRequired
    };

    render() {
        const {activeTab, basePath} = this.props;

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
                </div>
                <Switch>
                    {this.props.children.map(child => {
                        return <Route key={child.props.id}
                                      path={`${basePath}/${child.props.id}`}
                                      component={child.props.component} />
                    })}
                </Switch>
            </React.Fragment>
        );
    }
}

export class Tabs extends React.Component {
    static propTypes = {
        defaultTab: PropTypes.string.isRequired,
        basePath: PropTypes.string.isRequired
    };

    state = {
        activeTabFound: true
    };

    componentDidMount() {
        const availableTabIds = this.props.children.map(child => child.props.id);

        const activeTab = this.props.match.params.tab;
        if (!activeTab || !availableTabIds.includes(activeTab)) {
            this.setState({activeTabFound: false});
        }
    }

    render() {
        const {defaultTab, basePath} = this.props;

        if (!this.state.activeTabFound) {
            //TODO: redirect if current tab is not set
            console.log('Active tab has not been found');

            return null;
        }

        const activeTab = this.props.match.params.tab;

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
                </div>
                <Switch>
                    {this.props.children.map(child => {
                        return <Route key={child.props.id}
                                      path={`${basePath}/${child.props.id}`}
                                      render={child.props.render} />
                    })}
                </Switch>
            </React.Fragment>
        );
    }
}

export const RoutedTabs = withRouter(Tabs);
