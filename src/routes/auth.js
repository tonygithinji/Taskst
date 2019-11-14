import React from 'react';
import Login from "../components/login";
import { Route } from "react-router-dom";

const LoginRoute = () => <Route path="/login" component={Login} />

export default {
    LoginRoute
}