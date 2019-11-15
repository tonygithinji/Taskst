import React from 'react';
import PropTypes from 'prop-types';

const InlineMessage = ({ text, status }) => {
    let message;
    if (status === "success") {
        message = <span style={{ color: "#1a531b" }}>{text}</span>
    } else {
        message = <span style={{ color: "#912d2b" }}>{text}</span>
    }

    return message;
}

InlineMessage.propTypes = {
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};

export default InlineMessage;
