import * as React from 'react'
import {HashRouter, Route, Routes} from "react-router-dom"
import Layout from './pages/Layout'
import Signup from './pages/Signup'
import NoPage from "./pages/NoPage";
import {QueryClient, QueryClientProvider} from "react-query";
import {
    addonShares,
    bundleOptions,
    bundles,
    paymentMethods,
    paymentOptions,
    pickupLocations,
    regions,
    seasons,
    shares
} from './data/constants';

const queryClient = new QueryClient()

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Signup addonShares={addonShares} bundleOptions={bundleOptions} bundles={bundles}
                                              paymentMethods={paymentMethods} pickupLocations={pickupLocations}
                                              regions={regions} seasons={seasons} shares={shares}
                                              paymentOptions={paymentOptions}/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Route>
          </Routes>
        </HashRouter>
      </QueryClientProvider>
  );
}

export default App;
