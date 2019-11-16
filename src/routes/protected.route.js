import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, component: Component, ...otherProps }) => {
    return (
        <Route {...otherProps} render={(props) => isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />} />
    )
};

ProtectedRoute.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.shape({}).isRequired,
        PropTypes.func.isRequired
    ]).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(ProtectedRoute);