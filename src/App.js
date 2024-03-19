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
  const [data, setData] = useState(null);

  useEffect(() => {
    //fetchData().then((rawData) => {
    fetchFakeData2().then((rawData) => {
      const d3Data = rawData.map(rawToD3)
      setData({
        children: [
          ...d3Data,
          { label: "super cell" },
        ]
      });
    })
    function rawToD3(jsonData) {
      const sub = jsonData.delegatedCells;
      if (!sub || sub.length === 0) {
        return { children: [{ label: jsonData.label }] }
      }
      return {
        children: sub.map(rawToD3)
          .concat([{ label: jsonData.label }])
      };
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

  async function fetchFakeData2() {
    return [
      {
        "label": "Clothing Stores",
        "delegatedCells": [
          {
            "label": "Men's Clothes",
            "delegatedCells": [
              {
                "label": "Shirts",
                "delegatedCells": []
              },
              {
                "label": "Pants",
                "delegatedCells": []
              }
            ]
          },
          {
            "label": "Women's Clothes",
            "delegatedCells": [
              {
                "label": "Dresses",
                "delegatedCells": []
              },
              {
                "label": "Skirts",
                "delegatedCells": []
              }
            ]
          }
        ]
      },
      {
        "label": "Electronics Stores",
        "delegatedCells": [
          {
            "label": "Computers",
            "delegatedCells": [
              {
                "label": "Laptops",
                "delegatedCells": []
              },
              {
                "label": "Desktops",
                "delegatedCells": []
              }
            ]
          },
          {
            "label": "Smartphones",
            "delegatedCells": [
              {
                "label": "Android Phones",
                "delegatedCells": []
              },
              {
                "label": "iPhones",
                "delegatedCells": []
              }
            ]
          }
        ]
      }
    ]
  }


  const fetchFakeData3 = async () => [
    {
      "label": "Super",
      "delegatedCells": [
        {
          "label": "stage",
          "delegatedCells": [],
        },
        {
          "label": "Rec",
          "delegatedCells": [],
        },
        {
          "label": "stage",
          "delegatedCells": [],
        },
        {
          "label": "Rec",
          "delegatedCells": [],
        },
        {
          "label": "stage",
          "delegatedCells": [],
        },
        {
          "label": "Rec",
          "delegatedCells": [],
        },
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

  return (
    <div className="App">
      <Header />
      <SearchBar />
      {data == null
        ? <></>
        : <CellVisualisation2 data={data} padding={10} margin={10} />
      }
    </div>
  );
};

export default App;
