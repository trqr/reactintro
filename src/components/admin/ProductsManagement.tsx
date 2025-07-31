import {useLoaderData, useRevalidator} from "react-router-dom";
import {useState} from "react";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {Box, Button, MenuItem, Paper, TextField, Typography} from "@mui/material";
import Select from "@mui/material/Select";
import {changeProductsStatus, changeProductsStock} from "../../api/ProductService.ts";
import ConfirmationDialog from "../common/ConfirmationDialog.tsx";



const ProductsManagement = () => {
    const products = useLoaderData();
    const {revalidate} = useRevalidator();
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [stockInputValue, setStockInputValue] = useState<number>(0);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);

    const handleSelectionChange = (newSelection: any) => {
        const ids: never[] = Array.from(newSelection.ids)
        setSelectedRows(ids);
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
        },
        {
            field: 'brand',
            headerName: 'Brand',
            width: 160,
        },
        {
            field: 'color',
            headerName: 'Color',
            width: 130,
        },
        {
            field: 'price',
            headerName: 'Price (€)',
            type: 'number',
            width: 150,
        },
        {
            field: 'status',
            headerName: 'Status',
            type: "string",
            width: 100,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: "number",
            width: 60,
        }
    ];

    const paginationModel = {page: 0, pageSize: 10};

    const handleStockSubmitButton = async () => {
        await changeProductsStock(selectedRows, stockInputValue);
        setSelectedRows([]);
        setStockInputValue(0);
        await revalidate();
    }

    const handleStatusChange = async () => {
        await changeProductsStatus(selectedRows, selectedStatus)
        setSelectedRows([]);
        setSelectedStatus("");
        await revalidate();
    };

    const handleDelete = async () => {
        setSelectedRows([]);
        setOpenConfirmationDialog(false);
    };
    return (
        <>
            <Paper sx={{height: 450, width: '100%'}}>
                <DataGrid

                    rows={products}
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
                        {selectedRows.length} product(s) selected: {selectedRows.join(', ')}
                    </Typography>
                    <Box sx={{mt: 3, display: "flex", alignItems: "center", gap: 2}}>
                        <TextField
                            size={"small"}
                            type="number"
                            label="Stock"
                            onChange={(e) => setStockInputValue(+e.target.value)}>

                        </TextField>
                        <Button
                            disabled={stockInputValue === 0}
                            variant="contained"
                            color="primary"
                            onClick={handleStockSubmitButton}>
                                ADDING TO STOCKS
                        </Button>
                        <Select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            displayEmpty
                            size="small"
                            sx={{minWidth: 200}}
                        >
                            <MenuItem value="">Choose a status</MenuItem>
                            <MenuItem value="hidden">Hidden</MenuItem>
                            <MenuItem value="visible">Visible</MenuItem>
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
                            DELETE SELECTED PRODUCTS
                        </Button>
                    </Box>
                </Paper>
            )}
            <ConfirmationDialog
            isOpen={openConfirmationDialog}
            handleClose={() => setOpenConfirmationDialog(false)}
            handleConfirmationClick={handleDelete}
            dialogText={"Are you sure you want to delete this product(s)?"}
            ></ConfirmationDialog>
        </>
    )
}

export default ProductsManagement