import React from 'react'
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom"
// import ManageCSAShares from './pages/ManageCSAShares'
import Layout from './pages/Layout'
import ManagePickupLocations from './pages/ManagePickupLocations'
import Dashboard from "./pages/Dashboard";
import NoPage from "./pages/NoPage";


const App = () => {
    return (
        <HashRouter>
            <Routes path="/" element={<Layout/>}>
                <Route index element={<Dashboard/>} />
                {/*<Route path={"manage-csa-shares"} element={ManageCSAShares} />*/}
                <Route path="manage-pickup-locations" element={<ManagePickupLocations/>} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
