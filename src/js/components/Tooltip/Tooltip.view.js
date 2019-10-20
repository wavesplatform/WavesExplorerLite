import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const HIDE_TOOLTIP_DELAY = 2000;

export const TooltipView = ({id}) => (
    <ReactTooltip id={id}
                  effect="solid"
                  className="tooltip"
                  delayHide={HIDE_TOOLTIP_DELAY}
                  globalEventOff="scroll" />
);

TooltipView.propTypes = {
    id: PropTypes.string.isRequired
};

TooltipView.rebind = ReactTooltip.rebuild;
