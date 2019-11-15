import React from 'react';
import { Route } from "react-router-dom";
import Login from "../components/login";

const LoginRoute = () => <Route path="/login" component={Login} />

export default {
    LoginRoute
}