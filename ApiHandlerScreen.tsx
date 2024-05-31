import { Box, CircularProgress, Button, Typography, Container } from '@mui/material';
import React, { useState } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios';
import BAGrid from '../components/BAGrid';

interface UserData {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

interface GridColumn {
    key: keyof UserData;
    label: string;
    displayField?: (row: UserData) => JSX.Element;
}

export default function ApiHandlerScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserData[]>([]);

    const getApiData = () => {
        setLoading(true);
        axios.get<UserData[]>('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                console.log(res, "Success Response")
                setData([...res.data]);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const gridColumns: GridColumn[] = [
        {
            key: 'name',
            label: 'User Name'
        },
        {
            key: 'email',
            label: 'Email Address'
        },
        {
            key: 'phone',
            label: 'Phone Number'
        },
        {
            key: 'website',
            label: 'Website'
        }
    ];

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    USER DATA
                </Typography>
                <Button variant="contained" onClick={getApiData} disabled={loading} startIcon={<PublicIcon />}>
                    {loading ? 'Loading...' : 'Fetch Data'}
                </Button>
            </Box>

            <BAGrid gridCols={gridColumns} datasource={data} />

            {loading && <CircularProgress style={{ marginTop: 20 }} />}
        </Container>
    );
}
