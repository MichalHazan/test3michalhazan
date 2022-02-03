import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function Add() {
    const [serverName, setserverName] = useState("");
    const [ip, setip] = useState("");
    const [companiesArr, setcompaniesArr] = useState([]);
    const [company, setcompany] = useState('');
    const [msg, setmsg] = useState("");
    const handleChange = (event) => {
        setcompany(event.target.value);
    };

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:2001/api/companies/')
            const data = await res.json()
            setcompaniesArr(data)
        })();
    }, []);

    const addServer = async () => {
        const res = await fetch('http://localhost:2001/api/servers/', {
            method: "post",
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
                serverName,
                ip,
                company_id: company
            })
        })
        const data = await res.json()
        setmsg(data.msg)
    }

    return <div>
        <h1 className='headline'>Add Server</h1>
        <Container maxWidth="xs" sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Company</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={company}
                    label="company"
                    onChange={handleChange}
                >
                    {
                        companiesArr.map(comp => <MenuItem key={Math.random()} value={comp.companyID}>{comp.companyName}</MenuItem>)
                    }

                </Select>
            </FormControl>
            <TextField label="Server Name" color="secondary" sx={{ m: 1 }} focused onChange={e =>
                setserverName(e.target.value)
            } />
            <TextField label="IP" color="secondary" sx={{ m: 1 }} focused onChange={e =>
                setip(e.target.value)
            } />
            <Button variant="contained" color="success" onClick={addServer}>
                Create
            </Button>
            <p>{msg}</p>
        </Container>
    </div>;
}
