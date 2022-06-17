import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

const GenericParameter = ({value}) => value.toString();

const StringParameter = ({value}) => `"${value}"`;

const ParameterMapper = ({type, value}) => {
    switch (type) {
        case "string":
        case "binary":
            return <StringParameter value={value}/>;
        case "list": {
            return <React.Fragment key={`param${value}`}>
                [
                {value.map((x, i) => <React.Fragment key={`param${i}`}>
                    {ParameterMapper(x)}
                    {
                        value.length - 1 !== i
                            ? ', '
                            : null
                    }
                </React.Fragment>)
                }
                ]
            </React.Fragment>
        }
        default:
            return <GenericParameter value={value}/>;
    }
};

export class InvocationInfoView extends React.Component {
    render() {
        return (
            <div className="data-container">
                <div style={{display: 'flex', flexWrap: 'wrap'}}>{this.props.function}&nbsp;
                    ({this.props.args.map((item, index) => {
                        return <React.Fragment key={`param${index}`}>
                            {!!index && ', '}
                            <ParameterMapper key={index} {...item}/>
                        </React.Fragment>;
                    })})
                </div>
            </div>
        );
    }
}
