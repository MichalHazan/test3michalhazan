import React from 'react';
import Box from '@mui/material/Box';

export default function Info() {
  return <div>
    <h1 className='headline'>What i did</h1>
    <Box
      sx={{
        textAlign: 'center'
      }}
    >
      <h2>Mysql, Reactjs, Nodejs express, MUI, CSS</h2>
      <p>API: http://localhost:2001/api/</p>
      <h2>Methods:</h2>
      <p>Get // servers
        <br />
        Get // /servers?searchTerm=
        <br />
        Get // /onlyon
      </p>
      <p>PUT// /onoff/:server_id</p>
      <p>POST// //servers</p>
      <h2>You can add new server,<br /> 
      You can see only the servers thats are on or all of them,<span>order by created date desc</span><br />
      You can change the status of the server,
      <br /> You can search server by it`s name
       </h2>

    </Box>
  </div>;
}
