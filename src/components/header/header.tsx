import { Button, Paper } from "@mui/material"
import { menuItems } from "../../routes"
import { NavLink } from "react-router-dom"

import './header.css'

export default function Header(): JSX.Element {

    return (
        <header>
            <Paper
                component='nav'
                elevation={0}
            >
                {
                    menuItems.map(item => (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            className='nav-item'
                            exact
                        >
                            <Button>
                                {item.label}
                            </Button>
                        </NavLink>
                    ))
                }
            </Paper>
        </header>
    )
}