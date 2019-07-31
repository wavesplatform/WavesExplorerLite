import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const HIDE_TOOLTIP_DELAY = 2000;
const hideAllTooltips = () => ReactTooltip.hide();

export const TooltipView = ({id}) => (
    <ReactTooltip id={id}
                  effect="solid"
                  className="tooltip"
                  afterShow={() => setTimeout(hideAllTooltips, HIDE_TOOLTIP_DELAY)} />
);

TooltipView.propTypes = {
    id: PropTypes.string.isRequired
};
