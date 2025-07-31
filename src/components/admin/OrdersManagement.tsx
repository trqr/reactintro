import type {Order} from "../../models/order.ts";
import {useRevalidator} from "react-router-dom";
import {useState} from "react";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import dayjs from "dayjs";
import {changeOrderStatus, deleteOrders} from "../../api/OrderService.ts";
import {Box, Button, MenuItem, Paper, Typography} from "@mui/material";
import Select from "@mui/material/Select";
import ConfirmationDialog from "../common/ConfirmationDialog.tsx";


type OrdersManagementProps = {
    orders: Order[];
}

const OrdersManagement = ({orders} : OrdersManagementProps) => {
    const {revalidate} = useRevalidator();
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);

    const handleSelectionChange = (newSelection: any) => {
        const ids: never[] = Array.from(newSelection.ids)
        setSelectedRows(ids);
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {
            field: 'userId',
            headerName: 'Customer ID',
            width: 100,
            renderCell: (params) => params.row.user?.id || ''
        },
        {
            field: 'userEmail',
            headerName: 'Customer Email',
            width: 160,
            renderCell: (params) => params.row.user?.email || ''
        },
        {
            field: 'createdAt',
            headerName: 'Date',
            width: 130,
            renderCell: (params) => dayjs(params.value).format('DD/MM/YYYY')
        },
        {
            field: 'codepromo',
            headerName: 'Code Promo',
            width: 130,
            renderCell: (params) => params.row.codepromo?.code || ''
        },
        {field: 'delivery', headerName: 'Delivery Price (€)', type: "number", width: 140},
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

    const handleStatusChange = async () => {
        await changeOrderStatus(selectedRows, selectedStatus)
        setSelectedRows([]);
        setSelectedStatus("");
        await revalidate();
    };

    const handleDelete = async () => {
        setOpenConfirmationDialog(false);
        await deleteOrders(selectedRows);
        setSelectedRows([]);
        await revalidate();
    };
    return (
        <>
            <Paper sx={{height: 400, width: '100%'}}>
                <DataGrid

                    rows={orders}
                    columns={columns}
                    initialState={{pagination: {paginationModel}}}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionChange}
                    sx={{border: 0}}
                />
            </Paper>
            {selectedRows.length > 0 && (
                <Paper sx={{p: 2, mt: 2}}>
                    <Typography variant="body1">
                        {selectedRows.length} order(s) selected: {selectedRows.join(', ')}
                    </Typography>
                    <Box sx={{mt: 3, display: "flex", alignItems: "center", gap: 2}}>
                        <Select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            displayEmpty
                            size="small"
                            sx={{minWidth: 200}}
                        >
                            <MenuItem value="">Choose a status</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="paid">Paid</MenuItem>
                            <MenuItem value="shipped">Shipped</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                            <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>

                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!selectedStatus}
                            onClick={handleStatusChange}
                        >
                            CHANGE STATUS
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setOpenConfirmationDialog(true)}
                        >
                            DELETE SELECTED ORDERS
                        </Button>
                    </Box>
                </Paper>
            )}
            <ConfirmationDialog
                isOpen={openConfirmationDialog}
                handleClose={() => setOpenConfirmationDialog(false)}
                handleConfirmationClick={handleDelete}
                dialogText={"Are you sure you want to delete this order(s)?"}
            ></ConfirmationDialog>
        </>
    )
}

export default OrdersManagement