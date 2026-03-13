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

    state = {
        pageInput: this.props.currentPage.toString()
    };

    componentDidUpdate(prevProps) {
        if (prevProps.currentPage !== this.props.currentPage) {
            this.setState({pageInput: this.props.currentPage.toString()});
        }
    }

    handlePageChange = (pageNumber) => this.props.onPageChange(pageNumber);

    handleInputChange = (e) => {
        const pageInput = e.target.value.replace(/[^\d]/g, '');
        this.setState({pageInput});
    };

    applyInputPage = () => {
        const {currentPage, lastPage} = this.props;
        const {pageInput} = this.state;

        if (!pageInput) {
            this.setState({pageInput: currentPage.toString()});
            return;
        }

        const parsed = Number.parseInt(pageInput, 10);
        if (!Number.isFinite(parsed)) {
            this.setState({pageInput: currentPage.toString()});
            return;
        }

        const nextPage = Math.max(1, Math.min(lastPage, parsed));
        this.setState({pageInput: nextPage.toString()});

        if (nextPage !== currentPage) {
            this.handlePageChange(nextPage);
        }
    };

    handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.applyInputPage();
        }
    };

    handleInputFocus = (e) => {
        e.target.select();
    };

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
                    if (number === currentPage) {
                        return (
                            <input
                                key={number}
                                className="page page-input current"
                                type="text"
                                inputMode="numeric"
                                value={this.state.pageInput}
                                onChange={this.handleInputChange}
                                onBlur={this.applyInputPage}
                                onKeyDown={this.handleInputKeyDown}
                                onFocus={this.handleInputFocus}
                                onClick={this.handleInputFocus}
                            />
                        );
                    }

                    return (<PageLink key={number} pageNumber={number} onPageChange={this.handlePageChange}/>);
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
