import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Item from './Item';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Badge from '@mui/material/Badge';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default function List({ searchTerm }) {
    const [serversArr, setserversArr] = useState([]);
    const [onServers, setonServers] = useState([]);
    const [ISon, setIson] = useState(false);
    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const [update, setupdate] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:2001/api/servers?searchTerm=${searchTerm}`)
            const data = await res.json()
            setserversArr(data)
        })();
        (async () => {
            const res = await fetch('http://localhost:2001/api/onlyon')
            const data = await res.json()
            setonServers(data)
        })()
    }, [update, searchTerm]);


    return <div className='list'>
        <h1 className='headline'>Servers</h1>
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            sx={{
                textAlign: 'center'
            }}
        >

            <ToggleButton value="on_servers_only" onClick={() => setIson(true)}>
                <Badge badgeContent={onServers.length} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }} color="primary">
                    <LightbulbIcon color="action" />
                </Badge>
                on servers only</ToggleButton>
            <ToggleButton value="all" onClick={() => setIson(false)}>All</ToggleButton>
        </ToggleButtonGroup>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}
        >

            {
                ISon ?
                    onServers.map(serveron => <Item key={Math.random()} server={serveron} setupdate={setupdate} />)
                    :
                    serversArr.map(server => <Item key={Math.random()} server={server} setupdate={setupdate} />)
            }
        </Box>



    </div>;
}
