import * as React from 'react'
import { Link } from 'react-router';
import { fetchUserCatSelectMoviesData } from '../lib/fetchData';
import { useQuery } from '@tanstack/react-query'

const LoadingCard = () => {
    return (
        <div className='md:w-[244px] h-[186px] bg-[#17152b] rounded-xl animate-pulse'>
        </div>
    )
}

const Card = ({item}) => {
    return (
        <Link to={`/movie/${item.id}`}>
            <div className='flex flex-col p-3 px-3 bg-[#17152b] rounded-xl text-white hover:shadow-sm shadow-[#cab6ff] relative group'>
                <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}.jpg`} className='rounded-lg h-[170px] md:h-[110px] object-cover' />
                <p className='text-xs mt-3 font-semibold line-clamp-1 w-full'>{item.original_title}</p>

                <div className='flex justify-start items-center gap-1 mt-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ffcd19" d="m8.125 7.092l2.608-3.47q.238-.322.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.605q.289.426.289.94q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.564 20l-.454-.056L12 18.733l-4.11 1.211q-.124.05-.24.053q-.117.003-.214.003q-.665 0-1.15-.483t-.459-1.188l.1-3.856l-2.629-3.548q-.159-.217-.229-.453Q3 10.236 3 10q0-.506.297-.942q.296-.435.828-.618z"></path></svg>

                <p className='text-xs font-semibold'>{item.vote_average.toFixed(1)}</p>

                <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}.jpg` } className="absolute bottom-2 rounded-sm right-5 h-[85px] w-[60px] object-cover shadow-xs shadow-amber-50 bg-[#17152b]"/>

                </div>
            </div>
        </Link>
    )
}

const PopularMoviesSection = () => {

    const [Category, setCategory] = React.useState(0)
    const [Pagination, setPagination] = React.useState(1)

    const { data, isLoading, isError, isFetched, isFetching  } = useQuery({
        queryKey: [ Category , Pagination], 
        queryFn: fetchUserCatSelectMoviesData, 
      });

  return (
    <div className='max-w-5xl mx-auto mt-6 mb-6 px-6 md:px-0'>
        <div className='flex justify-between'>
            <h2 className='text-white font-semibold text-lg md:text-2xl'>
            {Category == 0 && "Popular"}
            {Category == 1 && "Upcoming"}
            {Category == 2 && "Now Playing"}
            </h2>

            <div className='flex gap-2'>
                <button disabled={Category == 0} className='flex items-center bg-[#221F3D] px-2 py-1 md:px-3 md:py-2 rounded-md gap-2 text-white text-[10px] md:text-xs font-semibold cursor-pointer disabled:bg-[#cab6ff] disabled:text-black' onClick={() => {setCategory(0) , setPagination(1)}}>
                    Popular
                </button>

                <button disabled={Category == 1} className='flex items-center bg-[#221F3D] px-2 py-1 md:px-3 md:py-2 rounded-md gap-2 text-white text-[10px] md:text-xs font-semibold cursor-pointer disabled:bg-[#cab6ff] disabled:text-black' onClick={() => {setCategory(1),setPagination(1)}}>
                    Upcoming
                </button>

                <button disabled={Category == 2} className='flex items-center bg-[#221F3D] px-2 py-1 md:px-3 md:py-2 rounded-md gap-2 text-white text-[10px] md:text-xs font-semibold cursor-pointer disabled:bg-[#cab6ff] disabled:text-black' onClick={() => {setCategory(2),setPagination(1)}}>
                    Now Playing
                </button>
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-6'>
            {isLoading && 
                Array.from({ length: 12 }).map((_, index) => (
                <LoadingCard key={index} />  // Ensure you have a key for each loading skeleton
                ))
            }
            {!isLoading && data && data.map((data,index) => (
            <Card key={index} item={data}/>
            ))}
        </div>

        <div className='mt-6 text-white flex justify-between items-center'>
            <button disabled={Pagination == 1} onClick={() => setPagination( Pagination - 1)} className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z"></path></svg>
            </button >

            <div className='text-gray-600 font-semibold text-sm'>
             <span className='text-white'>Page {Pagination}</span>
            </div>

            <button onClick={() => setPagination( Pagination + 1)} className='cursor-pointer'>
             <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"></path></svg>
            </button>
        </div>
    </div>
  )
}

export default PopularMoviesSection