import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Alias from './Alias';
import {routes} from './Routing';

const REGULAR = 'regular';
const BRIGHT = 'bright';

const appearanceToClassName = appearance => {
    switch (appearance) {
        case REGULAR:
            return 'no-accent';

        default:
            return '';
    }
};

export default class AliasRef extends React.PureComponent {
    static propTypes = {
        alias: PropTypes.string.isRequired,
        title: PropTypes.string,
        appearance: PropTypes.oneOf([REGULAR, BRIGHT])
    };

    static defaultProps = {
        appearance: BRIGHT
    };

    render() {
        const {alias, appearance} = this.props;
        const a = Alias.fromString(alias);
        const title = this.props.title || a.alias;
        const className = appearanceToClassName(appearance);

        return (<Link to={routes.aliases.one(a.alias)} className={className}>{title.substring(0, 50)}</Link>);
    }
}
