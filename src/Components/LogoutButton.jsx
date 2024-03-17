import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
//import Keycloak from 'keycloak-js';

//const keycloakInitOptions = {
//  url: 'http://localhost:8080/',
//  realm: 'master',
//  clientId: 'react-client',
//};

const AppHeader = () => {
  //const [keycloak, setKeycloak] = useState();
  //
  //useEffect(() => {
  //  const initKeycloak = async () => {
  //    const keycloakInstance = Keycloak(keycloakInitOptions);
  //    try {
  //      await keycloakInstance.init({
  //        onLoad: 'login-required',
  //        checkLoginIframe: true,
  //        pkceMethod: 'S256'
  //      });
  //      setKeycloak(keycloakInstance);
  //    } catch (error) {
  //      console.error("Authentication Failed", error);
  //    }
  //  };

  //  initKeycloak();
  //}, []);

  const handleLogout = () => {
    //if (keycloak) {
    //  keycloak.logout({ redirectUri: 'http://localhost:3000/' });
    //}
  };

  return (
    //keycloak && (
      <Button
        onClick={handleLogout}
        className="m-1 custom-btn-style"
        style={{
          fontWeight: 'bold',
          backgroundColor: 'orange',
          borderColor: 'orange',
          width: '150px',
          height: '40px'
        }}
        label='Se&nbsp;déconnecter'
      />
    //)
  );
};

export default AppHeader;
