import React from 'react';
import PropTypes from 'prop-types';

export class Enumerator extends React.PureComponent {
    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        hasPrev: PropTypes.bool,
        hasNext: PropTypes.bool,
        disabled: PropTypes.bool,
        onNext: PropTypes.func,
        onPrev: PropTypes.func
    };

    static defaultProps = {
        hasPrev: true,
        hasNext: true,
        disabled: false,
        onNext: () => {},
        onPrev: () => {}
    };

    handleClickPrev = () => {
        if (this.props.disabled)
            return;

        if (this.props.hasPrev)
            this.props.onPrev();
    };

    handleClickNext = () => {
        if (this.props.disabled)
            return;

        if (this.props.hasNext)
            this.props.onNext();
    };

    render() {
        const prevClass = "btn btn-prev" + (this.props.hasPrev && !this.props.disabled ? "" : " disabled");
        const nextClass = "btn btn-next" + (this.props.hasNext && !this.props.disabled ? "" : " disabled");
        return (
            <React.Fragment>
                <span className={prevClass} onClick={this.handleClickPrev}></span>
                <span>{this.props.label}</span>
                <span className={nextClass} onClick={this.handleClickNext}></span>
            </React.Fragment>
        );
    }
}
