import * as React from 'react' 
import './App.css'
import { Routes, Route } from "react-router";
import HeroSection from './component/HeroSection'
import PopularMoviesSection from './component/CategoriesMoviesSection'
import TrendingMoviesSection from './component/TrendingMoviesSection'
import SingleMoviePage from './component/SingleMoviePage';
import { fetchMcineData } from './lib/fetchData';
import { useQuery } from '@tanstack/react-query'
import {useMCineDataStore} from './lib/zustandStates';

const App = () => {

  const { data:MCineData, isLoading, isError, isFetched, isFetching  } = useQuery({
      queryKey: [ 'McineData'], 
      queryFn: fetchMcineData, 
  });

  return (
  <>
    <Routes>
      <Route index element={
        <>
         <HeroSection />
         <div className='search_results'>
          {/* Using React portal From SearchBar to Render Data Here */}
         </div>
         <TrendingMoviesSection MCineData={MCineData}/>
         <PopularMoviesSection MCineData={MCineData}/>
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
