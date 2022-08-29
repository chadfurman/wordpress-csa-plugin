import React from 'react'
import {Routes, Route, HashRouter} from "react-router-dom"
import Layout from './pages/Layout'
import Signup from './pages/Signup'
import NoPage from "./pages/NoPage";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Signup />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </QueryClientProvider>
  );
}

export default App;
