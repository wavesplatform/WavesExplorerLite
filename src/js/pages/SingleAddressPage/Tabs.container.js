import React from 'react';
import PropTypes from 'prop-types';

import {TabHeader} from './TabHeader.view';

export class Tabs extends React.Component {
    static propTypes = {
        selectedIndex: PropTypes.number,
        onTabActivate: PropTypes.func.isRequired
    };

    static defaultProps = {
        selectedIndex: 0
    };

    handleTabActivate = (selectedIndex) => {
        this.props.onTabActivate(selectedIndex);
    };

    render() {
        const {selectedIndex} = this.props;

        return (
            <React.Fragment>
                <div className="page-navigation">
                    {this.props.children.map((child, index) => {
                        return <TabHeader key={index}
                                          index={index}
                                          isActive={selectedIndex === index}
                                          title={child.props.title}
                                          onActivate={this.handleTabActivate}/>
                    })}
                </div>
                {this.props.children[selectedIndex]}
            </React.Fragment>
        );
    }
}
