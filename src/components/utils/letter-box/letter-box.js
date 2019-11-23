import React from "react";
import PropTypes from 'prop-types';
import styles from "./letterbox.module.css";

export default function LetterBox({ letter, color }) {
    const backgroundColor = `#${color}`;
    return (
        <div className={styles.icon} style={{ backgroundColor }}>{letter}</div>
    )
}

LetterBox.propTypes = {
    letter: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}