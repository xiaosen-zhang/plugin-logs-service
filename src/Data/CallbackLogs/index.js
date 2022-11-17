import React, { useState, useCallback } from 'react'

import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'
import axios from 'axios'

const gridStyle = { minHeight: 550, marginTop: 10 };

const columns = [
  { name: 'id', header: 'ID', defaultFlex: 1},
  { name: 'taskSid', defaultFlex: 1, header: 'Task Sid' },
  { name: 'callSid', defaultFlex: 1, header: 'Call Sid' },
  { name: 'duration', defaultFlex: 1, header: 'Duration' },
  { name: 'direction', defaultFlex: 1, header: 'Direction' },
  { name: 'from', defaultFlex: 1, header: 'From' },
  { name: 'forwardedFrom', defaultFlex: 1, header: 'Forwarded From' },
  { name: 'fromFormatted', defaultFlex: 1, header: 'From Formatted' },
  { name: 'to', defaultFlex: 1, header: 'To' },
  { name: 'toFormatted', defaultFlex: 1, header: 'To Formatted' },
  { name: 'status', defaultFlex: 1, header: 'Status' },
  { name: 'answeredBy', defaultFlex: 1, header: 'Answered By' },
  { name: 'callerName', defaultFlex: 1, header: 'Caller Name' },
  { name: 'dateCreated', defaultFlex: 1, header: 'Date Created' },
  { name: 'dateUpdated', defaultFlex: 1, header: 'Date Updated' },
  { name: 'endTime', defaultFlex: 1, header: 'End Time' },
  { name: 'queueTime', defaultFlex: 1, header: 'Queue Time' },
  { name: 'startTime', defaultFlex: 1, header: 'Start Time' },
  { name: 'parentCallSid', defaultFlex: 1, header: 'Parent Call Sid' },
  { name: 'phoneNumberSid', defaultFlex: 1, header: 'Phone Number Sid' },
  { name: 'taskQueue', defaultFlex: 1, header: 'Task Queue' },
  { name: 'taskQueueSid', defaultFlex: 1, header: 'Task Queue Sid' },
  { name: 'taskChannel', defaultFlex: 1, header: 'Task Channel' },
  { name: 'taskChannelSid', defaultFlex: 1, header: 'Task Channel Sid' },
  { name: 'lastUpdate', defaultFlex: 1, header: 'Last Update' },
  { name: 'lastEventSid', defaultFlex: 1, header: 'Last Event Sid' },
  { name: 'createdAt', defaultFlex: 1, header: 'Created At' },
  { name: 'updatedAt', defaultFlex: 1, header: 'Updated At' },
];

const filterValueNow = columns.map((item) => {
  return {name: item.name, operator: item.operator || 'startsWith', type: item.type || 'string', value: ''}
})

const loadData = ({ skip, limit, sortInfo, filterValue }) => {
  const sortData = sortInfo && !Object.keys(sortInfo) ? sortInfo : null
  const formData = {pageSize: (limit || 20), pageNo: (((skip / limit) + 1) || 0), sortInfo: sortData, filterValue: filterValue}
  const url = 'https://webhook.itsmystaging.com/api/CcvLogs/GetCallbackLogsList';
  return axios.post(url, formData).then(response => {
      return Promise.resolve({ data: response.data.result, count: parseInt(response.data.totalCount) });
  })
}

const CallbackLogs = () => {
  const dataSource = useCallback(loadData, []);

  return (
    <div>
      <ReactDataGrid
        licenseKey="AppName=multi_app,Company=SEACOWTECHNOLOGY,ExpiryDate=2023-07-19,LicenseDeveloperCount=1,LicenseType=multi_app,Ref=SEACOWTECHNOLOGYLicenseRef,Z=63162336312513521852124307440-2085118469631623363620465688"
        idProperty="id"
        style={gridStyle}
        columns={columns}
        defaultFilterValue={filterValueNow}
        pagination
        dataSource={dataSource}
        defaultLimit={10}
      />
    </div>
  );
}

export default () => <CallbackLogs />