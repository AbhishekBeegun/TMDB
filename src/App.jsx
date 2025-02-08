import * as React from 'react' 
import './App.css'
import { Routes, Route } from "react-router";
import HeroSection from './component/HeroSection'
import PopularMoviesSection from './component/CategoriesMoviesSection'
import TrendingMoviesSection from './component/TrendingMoviesSection'
import SingleMoviePage from './component/SingleMoviePage';

const App = () => {
  
  return (
  <>
    <Routes>
      <Route index element={
        <>
         <HeroSection />
         <div className='search_results'>
          {/* Using React portal From SearchBar to Render Data Here */}
         </div>
         <TrendingMoviesSection/>
         <PopularMoviesSection/>
        </>
      } />


      <Route path="movie">
        <Route path=":movie" element={<SingleMoviePage />} />
      </Route>
    </Routes>
  </>
  )
}

export default App
