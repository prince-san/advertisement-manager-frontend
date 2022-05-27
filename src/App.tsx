import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { BannerPage } from './pages/BannerPage';
import { BannersPage } from './pages/BannersPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryPage } from './pages/CategoryPage';
import { MainPage } from './pages/MainPage';

axios.defaults.baseURL = "http://localhost:8080/api/"

function App() {
  return (
    <Routes>
      <Route path="" element={<MainPage/>}/>
      <Route path="banners" element={<BannersPage/>}/>
        <Route path="banners/:bannerId" element={<BannerPage/>}/>
      <Route path="categories" element={<CategoriesPage/>}/>
        <Route path="categories/:categoryId" element={<CategoryPage/>}/>
    </Routes>
  );
}

export default App;
