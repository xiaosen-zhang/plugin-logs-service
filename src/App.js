import React, { useState, useCallback } from 'react'

import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'

// import DATASET_URL from './DATASET_URL'

const gridStyle = { minHeight: 550, marginTop: 10 };

const columns = [
  { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
  { name: 'firstName', defaultFlex: 2, header: 'First Name' },
  { name: 'lastName', defaultFlex: 2, header: 'Last Name' },
  { name: 'email', defaultFlex: 3, header: 'Email' }
];

const loadData = ({ skip, limit, sortInfo }) => {
  const url =
    'https://demos.reactdatagrid.io/api/v1/contacts' +
    '?skip=' +
    skip +
    '&limit=' +
    limit +
    '&sortInfo=' +
    JSON.stringify(sortInfo);

  return fetch(url).then(response => {
      const totalCount = response.headers.get('X-Total-Count');
      return response.json().then(data => {
        return Promise.resolve({ data, count: parseInt(totalCount) });
      })
    })
}

const App = () => {
  const dataSource = useCallback(loadData, []);

  return (
    <div>
      <ReactDataGrid
        licenseKey="AppName=multi_app,Company=SEACOWTECHNOLOGY,ExpiryDate=2023-07-19,LicenseDeveloperCount=1,LicenseType=multi_app,Ref=SEACOWTECHNOLOGYLicenseRef,Z=63162336312513521852124307440-2085118469631623363620465688"
        idProperty="id"
        style={gridStyle}
        columns={columns}
        pagination
        dataSource={dataSource}
        defaultLimit={10}
      />
    </div>
  );
}

export default () => <App />