import React from 'react'
import {Routes, Route, HashRouter} from "react-router-dom"
import Layout from './pages/Layout'
import ManagePickupLocations from './pages/ManagePickupLocations'
import Dashboard from "./pages/Dashboard";
import NoPage from "./pages/NoPage";
import ManageCSAShares from "./pages/ManageCSAShares";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Dashboard/>} />
                        <Route path="manage-csa-shares" element={<ManageCSAShares/>} />
                        <Route path="manage-pickup-locations" element={<ManagePickupLocations/>} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        </QueryClientProvider>
    );
}

export default App;
