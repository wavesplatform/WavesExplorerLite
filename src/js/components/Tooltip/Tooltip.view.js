import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';

const HIDE_TOOLTIP_DELAY = 2000;

export const TooltipView = ({id}) => (
    <Tooltip id={id}
                  effect="solid"
                  className="tooltip"
                  delayHide={HIDE_TOOLTIP_DELAY}
                  globalEventOff="scroll" />
);

TooltipView.propTypes = {
    id: PropTypes.string.isRequired
};
