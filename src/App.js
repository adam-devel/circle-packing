//import "primeflex/primeflex.css";
//import "primereact/resources/primereact.min.css";
//import "primereact/resources/themes/lara-light-indigo/theme.css";
//import Keycloak from 'keycloak-js';
import axios from 'axios';
import './App.css';
import CellVisualisation from './Components/CellVisualisation';
import CellVisualisation2 from './Components/CellVisualisation2';
import Header from './Components/Header';
import React, { useEffect, useState } from 'react';
import SearchBar from './Components/SearchBar';
/*
const keycloakInitOptions = {
  url: 'http://localhost:8080/',
  realm: 'master',
  clientId: 'react-client',
};

const keycloak = new Keycloak(keycloakInitOptions);

keycloak.init({
  onLoad: 'login-required',
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((authenticated) => {
  if (!authenticated) {

  } else {
    // Handle the authenticated state if needed
  }
}).catch(() => {
  console.error("Authentication Failed");
});
*/
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //fetchData().then((rawData) => {
    fetchFakeData().then((rawData) => {
      const d3Data = rawToD3(rawData)
      setData(d3Data);
    })
    const rawToD3 = (dataArray) => {
      if (dataArray.length == 0) { return null }
      const first = dataArray.splice(0, 1)[0];
      let acc = [{
        label: first.label,
        children: first.delegatedCells ? rawToD3(first.delegatedCells) : null
      }];
      return acc.concat(rawToD3(dataArray) ?? []);
    }
  }, []);

  const fetchData = async () => {
    let response = null;
    try {
      response = await axios.get('http://localhost:5051/cells/all');
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    return response.data;
  }

  const fetchFakeData = async () => [
    {
      "label": "Super",
      "delegatedCells": [
        {
          "label": "RH",
          "delegatedCells": [
            {
              "label": "stage",
              "delegatedCells": [],
            },
            {
              "label": "Rec",
              "delegatedCells": [],
            }
          ],
        },
        {
          "label": "enjoy",
          "delegatedCells": [
            {
              "label": "test",
              "delegatedCells": [],
              "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
            }
          ],
          "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
        },
        {
          "label": "Com",
          "delegatedCells": [],
        }
      ],
      "id": "bf1d93a3-1f74-4323-9e48-d98f24a1f482"
    },
    {
      "label": "encrage",
      "delegatedCells": [],
      "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
    }
  ]
  const addCircleInside = (rootCell, label) => {
    const circleIndex = data.findIndex(circle => circle.label === rootCell);
    if (circleIndex == -1) { return }

    const newCircleSize = Math.random() * 10 + 5;
    const newCircle = { r: newCircleSize, label, color: '#f17300' };

    setData(prevData => {
      const newData = [...prevData];
      if (!newData[circleIndex].children) {
        newData[circleIndex].children = [];
      }
      newData[circleIndex].children.push(newCircle);
      return newData;
    });

  };

  return (
    <div className="App">
      <Header />
      <SearchBar />
      <CellVisualisation2 color="#023047" data={data} />
    </div>
  );
};

export default App;
