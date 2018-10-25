import React from 'react';
import PropTypes from 'prop-types';

export default class BlockEnumerator extends React.PureComponent {
    static propTypes = {
        height: PropTypes.number.isRequired,
        hasPrev: PropTypes.bool,
        hasNext: PropTypes.bool,
        onNext: PropTypes.func,
        onPrev: PropTypes.func
    };

    static defaultProps = {
        hasPrev: true,
        hasNext: true,
        onNext: () => {},
        onPrev: () => {}
    };

    handleClickPrev = () => {
        if (this.props.hasPrev)
            this.props.onPrev();
    };

    handleClickNext = () => {
        if (this.props.hasNext)
            this.props.onNext();
    };

    render() {
        const prevClass = "btn btn-prev" + (this.props.hasPrev ? "" : " disabled");
        const nextClass = "btn btn-next" + (this.props.hasNext ? "" : " disabled");
        return (
            <React.Fragment>
                <span className={prevClass} onClick={this.handleClickPrev}></span>
                <span>{this.props.height}</span>
                <span className={nextClass} onClick={this.handleClickNext}></span>
            </React.Fragment>
        );
    }
}
