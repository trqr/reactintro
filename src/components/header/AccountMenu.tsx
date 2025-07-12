import {Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material"
import {Favorite, Logout, Settings} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/useAuth.tsx";

type AccountMenuProps = {
    open: boolean;
    handleClose: () => void;
    handleLogOut: () => void;
}

const AccountMenu = ({open, handleClose, handleLogOut}: AccountMenuProps) => {
    const navigate = useNavigate()
    // @ts-expect-error biendslecontect
    const { user } = useAuth();

    return (
        <>
            <Menu
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 25,
                                height: 25,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: "right", vertical: 'top'}}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx7sLJbdmCKh3Ko5fv9ahJsMGSZnIiRbz9Qg&s"/> My Account
                </MenuItem>
                <Divider/>
                <MenuItem onClick={() => navigate("/favorites")}>
                    <ListItemIcon>
                        <Favorite   fontSize="small"/>
                    </ListItemIcon>
                    Favourites
                </MenuItem>
                <MenuItem onClick={() => navigate(`/orders/${user.id}`)}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Your Orders
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem  onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default AccountMenu;