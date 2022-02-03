import React from 'react';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Item({ server, setupdate }) {
  const onoff = async (ison) => {
    console.log(server.id);
     await fetch(`http://localhost:2001/api/onoff/${server.id}`, {
      method: "put",
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ ison: ison ? 1 : 0 })
  })
    setupdate(up => !up)
  }
  return <div>
    <Paper sx={{
      width: 300,
      height: 250,
      m: 1,
      padding: 2
    }
    }>
      <h1>{server.serverName}</h1>
      <h2>{server.ip}</h2>
      <h2>{server.company}</h2>
      <p>created: {new Date(server.created).toLocaleDateString("he-IL")} at {new Date(server.created).toLocaleTimeString('he-IL')}</p>

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>off</Typography>
        <Switch checked={!!server.status} onClick={_=>onoff(!server.status)} />
        <Typography>on</Typography>
      </Stack>
    </Paper>
  </div>;
}
