import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Favorites from '../routes/favorites.js'
import Properties from '../routes/properties.js'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Properties />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='properties' element={<Properties />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
