import React from 'react';
import { Route } from "react-router-dom";
import Register from "../components/register";

const RegisterRoute = () => <Route path="/register" component={Register} />

export default {
    RegisterRoute
}