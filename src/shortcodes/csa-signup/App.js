import React from 'react'
import {Routes, Route, HashRouter} from "react-router-dom"
import Layout from './pages/Layout'
import NoPage from "./pages/NoPage";

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        </QueryClientProvider>
    );
}

export default App;
