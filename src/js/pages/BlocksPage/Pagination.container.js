import React from 'react';
import PropTypes from 'prop-types';


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


export class Pagination extends React.PureComponent {
    static propTypes = {
        currentPage: PropTypes.number,
        lastPage: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        boundaries: PropTypes.object.isRequired,
    };

    static defaultProps = {
        currentPage: 1,
    };

    handlePageChange = (pageNumber) => this.props.onPageChange(pageNumber);

    render() {
        const pageNumbers = [];
        const {currentPage, lastPage, boundaries: {lowPage, highPage}} = this.props;
        for (let i = lowPage; i <= highPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="page-navigation right no-select">
                <PageLimit className="page-link first" title="First" pageNumber={1}
                           onPageChange={this.handlePageChange}
                           disabled={currentPage === 1}/>
                <PageLink pageNumber={lowPage - 1} title="..."
                          onPageChange={this.handlePageChange}
                          visible={lowPage > 1}/>
                {pageNumbers.map(number => {
                    return (<PageLink key={number} pageNumber={number} onPageChange={this.handlePageChange}
                                      current={number === currentPage}/>);
                })}
                <PageLink pageNumber={highPage + 1} title="..."
                          onPageChange={this.handlePageChange}
                          visible={highPage < lastPage}/>
                <PageLimit className="page-link last" title="Last" pageNumber={lastPage}
                           onPageChange={this.handlePageChange}
                           disabled={currentPage === lastPage}/>
            </div>
        );
    }
}
