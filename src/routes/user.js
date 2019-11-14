import React from 'react';
import Register from "../components/register";
import { Route } from "react-router-dom";

const RegisterRoute = () => <Route path="/register" component={Register} />

export default {
    RegisterRoute
}