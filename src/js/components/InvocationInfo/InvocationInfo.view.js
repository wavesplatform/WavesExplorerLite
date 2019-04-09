import React from 'react';
import PropTypes from 'prop-types';

const GenericParameter = ({value}) => value.toString();

const StringParameter = ({value}) => `"${value}"`;

const ParameterMapper = ({type, value}) => {
    switch (type) {
        case "string":
            return <StringParameter value={value} />;

        default:
            return <GenericParameter value={value} />;
    }
};

export class InvocationInfoView extends React.Component {
    static propTypes = {
        function: PropTypes.string.isRequired,
        args: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
        })).isRequired
    };

    render() {
        return (
            <span>
                <span>{this.props.function}</span>
                ({this.props.args.map((item, index) => {
                    return <span key={`param${index}`}>
                            {!!index && ', '}
                            <ParameterMapper key={index} {...item}/>
                        </span>;
                })})
            </span>
        );
    }
}
