/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Container, Loader } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from './app.module.css';
import { validateToken } from "../../redux/actions/auth";

import ProtectedRoute from "../../routes/protected.route";
import Login from "../login";
import Register from "../register";
import Workspaces from "../workspaces";
import NewWorkspace from "../workspace.new";
import Workspace from "../workspace";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("taskst_token");
    if (token) {
      this.props.validateToken(token)
        .finally(() => this.setState({ loading: false }));
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <Container fluid className={styles.app}>
        {loading && <Loader active size="big" />}

        {!loading && (
          <Switch>
            <Route path="/" exact>
              <Redirect to="/workspaces" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute exact path="/workspaces" component={Workspaces} />
            <ProtectedRoute exact path="/workspaces/new" component={NewWorkspace} />
            <ProtectedRoute path="/workspaces/:id" component={Workspace} />
            <Route path="*">
              <Redirect to="/workspaces" />
            </Route>
          </Switch>
        )}
      </Container>
    )
  }
}

App.propTypes = {
  validateToken: PropTypes.func.isRequired
}

export default connect(null, { validateToken })(App);
