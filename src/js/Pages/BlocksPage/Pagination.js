import React from 'react';
import PropTypes from 'prop-types';

const NUMBER_OF_PAGES_IN_ROW = 5;

const PageLimit = ({className, title, disabled, pageNumber, onPageChange}) => {
    const linkClassName = className + (disabled ? ' disabled' : '');

    return (
        <span className={linkClassName} onClick={() => onPageChange(pageNumber)}>{title}</span>
    );
};

const PageLink = (props) => {
    const visible = (typeof props.visible === 'undefined') ? true : props.visible;
    if (!visible)
        return (null);

    const title = props.title || props.pageNumber.toString();
    const className = 'page' + (props.current ? ' current' : '');

    return (<span className={className} onClick={() => props.onPageChange(props.pageNumber)}>{title}</span>);
};

const derivePageBoundaries = (pageNumber, lastPage) => {
    const lowPage = Math.floor((pageNumber - 1) / NUMBER_OF_PAGES_IN_ROW) * NUMBER_OF_PAGES_IN_ROW;

    return {
        lowPage: lowPage + 1,
        highPage: Math.min(lastPage, lowPage + NUMBER_OF_PAGES_IN_ROW)
    };
};

export default class Pagination extends React.PureComponent {
    static propTypes = {
        currentPage: PropTypes.number,
        lastPage: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        currentPage: 1,
    };

    constructor(props) {
        super(props);

        const boundaries = derivePageBoundaries(this.props.currentPage, this.props.lastPage);
        this.state = {
            currentPage: this.props.currentPage,
            ...boundaries
        };
    }

    handlePageChange = (pageNumber) => {
        const boundaries = derivePageBoundaries(pageNumber, this.props.lastPage);
        this.setState({
            currentPage: pageNumber,
            ...boundaries
        });

        this.props.onPageChange(pageNumber);
    };

    render() {
        const pageNumbers = [];
        for (let i = this.state.lowPage; i <= this.state.highPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="page-navigation right no-select">
                <PageLimit className="page-link first" title="First" pageNumber={1}
                           onPageChange={this.handlePageChange}
                           disabled={this.state.currentPage === 1}/>
                <PageLink pageNumber={this.state.lowPage - 1} title="..."
                          onPageChange={this.handlePageChange}
                          visible={this.state.lowPage > 1}/>
                {pageNumbers.map(number => {
                    return (<PageLink key={number} pageNumber={number} onPageChange={this.handlePageChange}
                                      current={number === this.state.currentPage}/>);
                })}
                <PageLink pageNumber={this.state.highPage + 1} title="..."
                          onPageChange={this.handlePageChange}
                          visible={this.state.highPage < this.props.lastPage}/>
                <PageLimit className="page-link last" title="Last" pageNumber={this.props.lastPage}
                           onPageChange={this.handlePageChange}
                           disabled={this.state.currentPage === this.props.lastPage}/>
            </div>
        );
    }
}
