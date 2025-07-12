import {Paper, Typography} from "@mui/material";
import Header from "../components/header/Header.tsx";
import {DataGrid, type GridColDef} from '@mui/x-data-grid';
import {useLoaderData} from "react-router-dom";
import dayjs from "dayjs";

const AdministrationPage = () => {
    const orders = useLoaderData()

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {
            field: 'createdAt',
            headerName: 'Date',
            width: 130,
            renderCell: (params) => dayjs(params.value).format('DD/MM/YYYY')},
        {
            field: 'codepromo',
            headerName: 'Code Promo',
            width: 130,
            renderCell: (params) => params.row.codepromo?.code || ''
        },
        {field: 'delivery', headerName: 'Delivery Price (€)',type: "number", width: 140},
        {
            field: 'totalPrice',
            headerName: 'Order Price (€)',
            type: 'number',
            width: 150,
        },
        {
            field: 'status',
            headerName: 'Status',
            type: "string",
            width: 160,
        },
    ];

    const paginationModel = {page: 0, pageSize: 10};

    return (
        <>
            <Header></Header>
            <Typography variant={"h4"} sx={{textAlign: "center", margin: "30px"}}>Administration</Typography>
            <Paper sx={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    initialState={{pagination: {paginationModel}}}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{border: 0}}
                />
            </Paper>
        </>
    )
}

export default AdministrationPage