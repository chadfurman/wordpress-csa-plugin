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
                        <Link to="/blogs">Manage CSA Shares</Link>
                    </li>
                    <li>
                        <Link to="/contact">Manage Pickup Locations</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout