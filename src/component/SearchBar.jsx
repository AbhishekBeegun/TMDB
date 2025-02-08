import * as React from 'react'
import { Link } from 'react-router'
import { fetchMovieBySearch } from '../lib/fetchData'
import { useQuery } from '@tanstack/react-query'
import { createPortal } from 'react-dom';

const Card = ({item}) => {
    return (
      <Link to={`/movie/${item.id}`}>
        <div className='flex gap-3 max-w-[300px] hover:bg-gray-800 p-2 rounded-lg text-white'>
          <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}.jpg`} className='bg-[#cab6ff] h-[110px] w-[85px] rounded-sm' />
          <div>
            <p className='font-semibold line-clamp-1 text-white mb-1'>{item.original_title}</p>

            <p className='text-xs line-clamp-3'>{item.overview}</p>

            <div className='flex justify-start items-center gap-1 mt-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="#ffcd19"
                  d="m8.125 7.092l2.608-3.47q.238-.322.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.605q.289.426.289.94q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.564 20l-.454-.056L12 18.733l-4.11 1.211q-.124.05-.24.053q-.117.003-.214.003q-.665 0-1.15-.483t-.459-1.188l.1-3.856l-2.629-3.548q-.159-.217-.229-.453Q3 10.236 3 10q0-.506.297-.942q.296-.435.828-.618z">
                </path>
              </svg>

              <p className='text-xs font-semibold'>{item.vote_average}</p>
            </div>
          </div>

        </div>
      </Link>

    )
}

const PortalComponent = ({data , isLoading}) => {
  const [targetElement, setTargetElement] = React.useState(null);

  React.useEffect(() => {
    const element = document.body.querySelector(".search_results");
    setTargetElement(element);
  }, []);

  return targetElement && data
    ? createPortal(
        <div className='max-w-5xl mx-auto mb-10 px-6 -mt-4 md:px-0'>
          <div className='flex justify-center mb-6'>
            <h2 className='text-white font-semibold text-lg md:text-2xl'>
              Top Search Results </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {isLoading && <>Loading Data</>}
            {data.slice(0,3).map((data,index) => (
              <Card key={index} item={data}/>
            ))}
          </div>

        </div>
        ,
        targetElement
      )
    : null;
};


const SearchBar = () => {

    const [UserSearchText, setUserSearchText] = React.useState('');
    const [debouncedSearchText, setDebouncedSearchText] = React.useState(UserSearchText);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearchText(UserSearchText);  
      }, 1000);  

      return () => clearTimeout(timer);
    }, [UserSearchText]);

    const { data, isLoading, isError, isFetched, isFetching  } = useQuery({
      queryKey: [debouncedSearchText], 
      queryFn: fetchMovieBySearch, 
      enabled: debouncedSearchText.length >= 3,
    });

    // console.log(data)
  return (
    <div className='flex items-center gap-3 text-[#cab6ff] max-w-[640px] rounded-lg w-full px-4 py-3 mt-10 bg-[#0F0D23] relative'>
       <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="#cab6ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"></path></svg>

       <input value={UserSearchText} onChange={(e) => setUserSearchText(e.target.value)} placeholder='Search through 300+ movies online' className='text-[#cab6ff] placeholder:text-[#cab6ff] text-sm w-full focus-visible:outline-none searchbar_input' />
       

       {/* <div
        style={{
          opacity: UserSearchText.length > 0 ? 1 : 0,
          visibility: UserSearchText.length > 0 ? 'visible' : 'hidden',
          transform: UserSearchText.length > 0 ? 'translateY(0)' : 'translateY(-20px)',
        }}
       className='bg-[#0F0D23] w-full absolute left-0 top-13 h-[300px] z-20 shadow shadow-[#cab6ff] rounded-lg transition-all ease-in-out duration-300 p-4 overflow-y-scroll grid grid-cols-2 gap-5 search_result_container'>

        {isLoading && <>Loading Data</>}
        {!isLoading && data && data.map((data,index) => (
          <Card key={index} item={data}/>
        ))}
       </div> */}

       {/* <p className='text-white'>{UserSearchText}</p> */}
       <PortalComponent data={data} isLoading={isLoading}/>

    </div>
  )
}

export default SearchBar;