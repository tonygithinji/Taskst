import React from 'react';
import PropTypes from 'prop-types';

const InlineMessage = ({ text, status }) => {
    if (status === "success") {
        return <span style={{ color: "#1a531b" }}>{text}</span>
    } else {
        return <span style={{ color: "#912d2b" }}>{text}</span>
    }
}

InlineMessage.propTypes = {
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};

export default InlineMessage;
