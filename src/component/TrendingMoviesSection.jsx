import React from 'react'
import { Link } from 'react-router'
import { fetchTrendingMoviesData } from '../lib/fetchData'
import { useQuery } from '@tanstack/react-query'
import { useHeroImgsStore , useMCineDataStore } from '../lib/zustandStates'

const Card = ({item , index , playingAtMCine }) => {
  return (
    <Link to={`/movie/${item.id}`} className=''>
      <div className='flex items-center group w-[110px] md:w-[unset] relative'>
        <p className='outline-number text-[95px] leading-[0] text-[#17152b] group-hover:text-[#cab6ff] transition-all ease-in-out duration-500 translate-x-1 group-hover:translate-x-16'>{index + 1 }</p>
        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}.jpg`} className='rounded-lg h-[110px] w-[80px] object-cover z-10 group-hover:scale-120 transition-all ease-in-out'/>
        {playingAtMCine && 
          <img src="src/assets/mcine_logo.png" className='w-6 absolute -top-2 -right-2 z-50' />
        }
      </div>
    </Link>
  )
}

const TrendingMoviesSection = ({MCineData}) => {
  
  const { data, isLoading, isError, isFetched, isFetching  } = useQuery({
    queryKey: ['trendingMovies'], 
    queryFn: fetchTrendingMoviesData, 
  });
  // console.log("isFetched:", isFetched); 
  // console.log("isFetching:", isFetching);
  // console.log(data);

  let NewData = data ? data.slice(0, 6) : [];

  NewData.forEach((item) => {
    useHeroImgsStore.getState().addImages(item.poster_path); 
  });

  if(NewData.length > 0) {
    useHeroImgsStore.setState({ hasImages: true }); 
  }
  // const images = useHeroImgsStore.getState().images;
  // console.log(images);


  return (
    <div className='max-w-5xl mx-auto'>
      <h2 className='text-white font-semibold text-lg md:text-2xl px-6 md:px-0'>
        Trending 
      </h2>

      <div className='flex gap-10 md:gap-0 justify-between flex-nowrap overflow-x-scroll md:overflow-hidden py-6 px-10 pl-6 md:px-0 md:pr-6'>
        {NewData && NewData.map((data, index) => {
          const isPlaying = MCineData?.some(movie => movie === data.title);
          return (
            <div key={data.id}>
              <Card item={data} index={index} playingAtMCine={isPlaying} />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default TrendingMoviesSection