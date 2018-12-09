import React from 'react';
import PropTypes from 'prop-types';

const Network = ({title, url, current}) => {
    return current ? (<div className="current">{title}</div>) : (<div><a href={url} target="_blank">{title}</a></div>);
};

const ExplorerShape = PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
});

export default class NetworkSwitch extends React.PureComponent {
    static propTypes = {
        current: ExplorerShape.isRequired,
        peer: ExplorerShape.isRequired
    };

    render() {
        const {current, peer} = this.props;

        return (
            <div>
                <div className="network-switcher">
                    <Network current={true} {...current} />
                    <Network {...peer} />
                </div>
            </div>
        );
    }
}
