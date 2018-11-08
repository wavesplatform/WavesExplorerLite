import React from 'react';
import PropTypes from 'prop-types';

class TabHeader extends React.PureComponent {
    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        onActivate: PropTypes.func.isRequired
    };

    handleClick = (e) => {
        e.preventDefault();

        this.props.onActivate(this.props.index);
    };

    render() {
        let className = 'page-link bold';
        if (this.props.isActive)
            className += ' disabled';

        return (
            <span className={className}>
            {this.props.isActive ?
                this.props.title :
                <a className="no-style" href="#" onClick={this.handleClick}>{this.props.title}</a>}
            </span>
        );
    }
}

export default class Tabs extends React.Component {
    static propTypes = {
        selectedIndex: PropTypes.number,
        onTabActivate: PropTypes.func.isRequired
    };

    static defaultProps = {
        selectedIndex: 0
    };

    state = {
        selectedIndex: this.props.selectedIndex
    };

    handleTabActivate = (selectedIndex) => {
        this.setState({selectedIndex});
        this.props.onTabActivate(selectedIndex);
    };

    render() {
        return (
            <React.Fragment>
                <div className="page-navigation">
                    {this.props.children.map((child, index) => {
                        return <TabHeader key={index}
                                          index={index}
                                          isActive={this.state.selectedIndex === index}
                                          title={child.props.title}
                                          onActivate={this.handleTabActivate}/>
                    })}
                </div>
                {this.props.children[this.state.selectedIndex]}
            </React.Fragment>
        );
    }
}
