import React from 'react';
import { Container } from "semantic-ui-react";
import styles from './app.module.css';
import AuthRoutes from "../../routes/auth";
import UserRoutes from "../../routes/user";

function App() {
  return (
    <Container className={styles.app}>
      <AuthRoutes.LoginRoute />
      <UserRoutes.RegisterRoute />
    </Container>
  );
}

export default App;
