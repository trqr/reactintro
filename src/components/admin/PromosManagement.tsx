import {useLoaderData, useRevalidator} from "react-router-dom";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {useState} from "react";
import {addPromo, deletePromo} from "../../api/PromoService.ts";
import type {CodePromo} from "../../models/codePromo.ts";
import ConfirmationDialog from "../common/ConfirmationDialog.tsx";

const PromosManagement = () => {
    const promos = useLoaderData();
    const {revalidate} = useRevalidator();
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
    const [promocode, setPromocode] = useState<CodePromo>({
        id: 0,
        code: "",
        percentage: 0
    });

    const handleSelectionChange = (newSelection: any) => {
        const ids: never[] = Array.from(newSelection.ids)
        setSelectedRows(ids);
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {
            field: 'code',
            headerName: 'Code Name',
            width: 150,
        },
        {
            field: 'brand',
            headerName: 'Brand',
            width: 160,
        },
        {
            field: 'percentage',
            headerName: '%',
            width: 80,
        }
    ];


    const handleButtonAddPromo = async () => {
        await addPromo(promocode);
        revalidate();
    }

    const handleDelete = async () => {
        setOpenConfirmationDialog(false);
        await deletePromo(selectedRows);
        setSelectedRows([]);
        await revalidate();
    };

    return (
        <>
            <Paper sx={{height: 450, width: '100%'}}>
                <DataGrid
                    rows={promos}
                    columns={columns}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionChange}
                    sx={{border: 0}}
                />
            </Paper>
            {selectedRows.length > 0 && (
                <Paper sx={{p: 2, mt: 2}}>
                    <Typography variant="body1">
                        {selectedRows.length} code(s) selected: {selectedRows.join(', ')}
                    </Typography>
                    <Box sx={{mt: 3, display: "flex", alignItems: "center", gap: 2}}>
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
            <Box sx={{display: "flex", alignItems: "center", margin: "10px"}}>
                <TextField
                    sx={{margin: "10px"}}
                    size={"small"}
                    label={"id"}
                    type={"number"}
                    value={promocode.id}
                    onChange={(e) => setPromocode({...promocode, id: +e.target.value})}
                >
                </TextField>
                <TextField
                    sx={{margin: "10px"}}
                    size={"small"}
                    label={"Code"}
                    type={"string"}
                    value={promocode.code}
                    onChange={(e) => setPromocode({...promocode, code: e.target.value})}
                >
                </TextField>
                <TextField
                    sx={{margin: "10px"}}
                    size={"small"}
                    label={"Percentage"}
                    type={"number"}
                    value={promocode.percentage}
                    onChange={(e) => setPromocode({...promocode, percentage: +e.target.value})}
                >
                </TextField>
                <Button variant={"contained"} onClick={handleButtonAddPromo}>Add</Button>
            </Box>
            <ConfirmationDialog
                isOpen={openConfirmationDialog}
                handleClose={() => setOpenConfirmationDialog(false)}
                dialogText={"Are you sure you want to delete this promo(s)?"}
                handleConfirmationClick={handleDelete}
            ></ConfirmationDialog>
        </>
    )
}

export default PromosManagement