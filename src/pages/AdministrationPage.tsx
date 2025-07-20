import {Box, Tab, Typography} from "@mui/material";
import Header from "../components/header/Header.tsx";
import {useLoaderData, useNavigate} from "react-router-dom";
import OrdersManagement from "../components/admin/OrdersManagement.tsx";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useState} from "react";
import ProductsManagement from "../components/admin/ProductsManagement.tsx";
import promosManagement from "../components/admin/PromosManagement.tsx";
import PromosManagement from "../components/admin/PromosManagement.tsx";

const AdministrationPage = () => {
    const orders = useLoaderData();
    const [value, setValue] = useState('1');
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Header></Header>
            <Typography variant={"h4"} sx={{textAlign: "center", margin: "30px"}}>Administration panel</Typography>
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Orders" onClick={() => navigate("/admin")} value="1"/>
                            <Tab label="Products" onClick={() => navigate("/admin/products")} value="2"/>
                            <Tab label="Promotions" onClick={() => navigate("/admin/promos")} value="3"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <OrdersManagement orders={orders}></OrdersManagement>
                    </TabPanel>
                    <TabPanel value="2">
                        <ProductsManagement></ProductsManagement>
                    </TabPanel>
                    <TabPanel value="3">
                        <PromosManagement></PromosManagement>
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    )
}

export default AdministrationPage