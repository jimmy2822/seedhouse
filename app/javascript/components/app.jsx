import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query';

import Favorites from '../routes/favorites.js'
import Properties from '../routes/properties.js'
import Users from '../routes/users.js'
import SignIn from '../routes/users/sign_in.js'
import SignUp from '../routes/users/sign_up.js'

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Properties />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='properties' element={<Properties />} />
            <Route path='users' element={<Users />}>
              <Route path='sign_in' element={<SignIn />} />
              <Route path='sign_up' element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  )
};

export default App;
