import React from 'react'
import { Outlet, Link } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/manage-csa-shares">Manage CSA Shares</Link>
                    </li>
                    <li>
                        <Link to="/manage-pickup-locations">Manage Pickup Locations</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout