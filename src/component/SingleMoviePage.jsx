import * as React from 'react'
import { useParams ,useSearchParams} from "react-router";
import YouTube from 'react-youtube';
import { fetchSingleMovieDetails , fetchSingleMovieVideo , fetchYtsMovieTorrent} from '../lib/fetchData';
import { useQuery } from '@tanstack/react-query'

const MovieTitle = ({data}) => {

  const movieName = data.title;
  const releaseYear = data.release_date ? data.release_date.split('-')[0] : 'N/A';
  const YTSData  = {
    query: movieName,
    year: releaseYear
  }
  const {data: ytsData, isLoading:ytsFetching, error:ytsError, refetch, } = useQuery({
    queryKey: ['movie-torrents', movieName, releaseYear],
    queryFn: () => fetchYtsMovieTorrent(YTSData),
    enabled: false,
  });

  let uniqueYTS = [];

  if (ytsData?.torrents) {
    uniqueYTS = Array.from(new Map(ytsData.torrents.map(t => [t.text, t])).values());
  }

  // console.log(ytsData,'ytsData');
  // console.log(uniqueYTS,'uniqueYTS');


  return (
    <>
      <div className='flex justify-between items-center w-full '>
        <div>
          <h1 className='font-semibold text-lg md:text-[36px]'>{data.title}</h1>
          <p className='text-xs text-[#a2aed4] font-medium'><span>{data.release_date}</span> &bull; <span>{data.runtime}</span></p>
        </div> 

        <div className='flex flex-col md:flex-row items-center gap-2'>
          <div className='flex items-center bg-[#221F3D] px-3 py-2 rounded-md gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ffcd19" d="m8.125 7.092l2.608-3.47q.238-.322.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.605q.289.426.289.94q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.564 20l-.454-.056L12 18.733l-4.11 1.211q-.124.05-.24.053q-.117.003-.214.003q-.665 0-1.15-.483t-.459-1.188l.1-3.856l-2.629-3.548q-.159-.217-.229-.453Q3 10.236 3 10q0-.506.297-.942q.296-.435.828-.618z"></path></svg>

            <p className='text-xs font-semibold text-[#a2aed4] flex'><span className='text-white'>{Math.round(data.vote_average)}</span> /10 &nbsp;
            {/* <span className='hidden md:block'>({data.popularity}K)</span> */}
            </p>
          </div>

          <div className={`flex items-center 
            ${ytsError ? 'bg-red-500 cursor-not-allowed pointer-events-none' : ''}
            ${ytsFetching ? 'animate-pulse cursor-not-allowed pointer-events-none' : ''}
            ${ytsData ? 'border border-green-500' : ''}
            bg-[#221F3D] px-3 py-2 rounded-md gap-2 cursor-pointer`} onClick={refetch} title='Torrent Links'>
            <img src="/src/assets/logo-YTS.svg" className='w-13' />
          </div>
        </div>

      </div>
      {/* YTS Torrent Links: */}
      {ytsFetching && 
        <div className='flex gap-4 items-center mt-4'>
          <p className='text-white font-semibold text-base'><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M13.684 23.94a12.01 12.01 0 0 0 9.599-7.79c-.118.044-.26.096-.432.147c-2 .59-3.404-.466-3.687-.649c-.283-.18-.587-.48-.643-.464c-.183 1.132-1.218 2.706-3.58 3.42c-1.295.391-2.687.4-3.681-.157l.328.822c.13.328.351.866.488 1.192c0 0 .858 2.044 1.608 3.48M2.723 7.153l3.54-.66c.323-.059.68.124.794.407l2.432 6.07c.332.633.399.773.615 1.043c0 0 1.68 2.398 4.24 1.812c1.726-.394 2.532-1.69 2.587-2.612c.057-.296-.032-.669-.185-1.016L13.832 5.61c-.117-.266.022-.527.306-.581l2.953-.55a.69.69 0 0 1 .706.376l3.227 6.91c.13.276.394.712.588.966c0 0 .671.964 1.747.78c.266 0 .569-.143.569-.143q.071-.645.072-1.31c0-6.627-5.373-12-12.002-12C5.372.06 0 5.433 0 12.06c0 5.319 3.46 9.827 8.252 11.402a25 25 0 0 1-.919-2.121L2.298 7.808c-.111-.297.083-.59.425-.654"/></svg></p>
          <p className=''><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg></p>
        </div>
      }
      {/* {ytsError && <p>Error: {ytsError.message}</p>} */}
      {ytsData && ytsData.torrents && (
      <div className='flex flex-row gap-5 mt-3 items-center'>
        <p className='text-white font-semibold mb-2 text-base'><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M13.684 23.94a12.01 12.01 0 0 0 9.599-7.79c-.118.044-.26.096-.432.147c-2 .59-3.404-.466-3.687-.649c-.283-.18-.587-.48-.643-.464c-.183 1.132-1.218 2.706-3.58 3.42c-1.295.391-2.687.4-3.681-.157l.328.822c.13.328.351.866.488 1.192c0 0 .858 2.044 1.608 3.48M2.723 7.153l3.54-.66c.323-.059.68.124.794.407l2.432 6.07c.332.633.399.773.615 1.043c0 0 1.68 2.398 4.24 1.812c1.726-.394 2.532-1.69 2.587-2.612c.057-.296-.032-.669-.185-1.016L13.832 5.61c-.117-.266.022-.527.306-.581l2.953-.55a.69.69 0 0 1 .706.376l3.227 6.91c.13.276.394.712.588.966c0 0 .671.964 1.747.78c.266 0 .569-.143.569-.143q.071-.645.072-1.31c0-6.627-5.373-12-12.002-12C5.372.06 0 5.433 0 12.06c0 5.319 3.46 9.827 8.252 11.402a25 25 0 0 1-.919-2.121L2.298 7.808c-.111-.297.083-.59.425-.654"/></svg></p>
          <ul className='flex flex-row gap-3 flex-wrap text-xs'>
              {uniqueYTS && uniqueYTS.length > 0 && uniqueYTS.map((torrent, index) => (
                <li key={index} className='mb-1 bg-[#221F3D] px-3 py-1.5 rounded text-white font-semibold'>
                  <a href={torrent.href} target="_blank" rel="noopener noreferrer" className='text-white'>
                    {torrent.text}
                  </a>  
                </li>
              ))}
            </ul>
          </div>
        )}
    </>

  )
}

const MoviePosterVideo = ({posterImg , posterVideo}) => {
  const Trailer = posterVideo && posterVideo.filter((video) => video.type === 'Trailer');
  return (
    <div className='flex flex-col md:flex-row gap-5 mt-4'>
      <div className='hidden  md:block md:w-1/4 bg-[#221F3D] h-[250px] md:h-[380px] rounded-lg'>
      {posterImg &&
       <img src={`https://image.tmdb.org/t/p/w500/${posterImg}.jpg`}  className='h-full object-cover w-full rounded-lg' />
      }
      </div>

      <div className='md:w-3/4 bg-[#221F3D] h-[250px] md:h-[380px] rounded-lg'>
        <div className='yt_container'>
          {posterVideo &&
            <YouTube
            videoId={Trailer[0].key}
            className='video' 
            />
          }
        </div>
      </div>
    </div>
  )
}

const MovieAISummary = () => {
  return (
    <>
     AI summery
    </>
  )
}

const MovieDetails = ({data}) => {
  return (
    <div className='m_details mt-6'>

      {/* Genres */}
      <div className='m_item'> 
         <p className='m_cat'>Genres</p>

         <div className='flex justify-start gap-3 flex-wrap'>
          {data.genres && data.genres.map((genre) => (
            <div key={genre.id} className='bg-[#221f3d] px-3 py-1 rounded text-white text-xs md:text-sm font-semibold flex justify-center items-center'>
              {genre.name}
            </div>
          ))}
         </div>
      </div>

       {/* Overview */}
       <div className='m_item'> 
         <p className='m_cat'>Overview</p>

         <div className='text-white text-wrap'>
          {data.overview}
         </div>
       </div>

       {/* Release Date */}
       {/* <div className='m_item'> 
         <p className='m_cat'>Release Date</p>

         <div>
          {data.release_date}
         </div>
       </div> */}

         {/* Status */}
         {/* <div className='m_item'> 
          <p className='m_cat'>Status</p>

          <div>
            {data.status}
          </div>
         </div>  */}

          {/* Budget*/}
         {/* <div className='m_item'> 
          <p className='m_cat'>Budget</p>

          <div>
            {data.budget}
          </div>
         </div>  */}

        {/* Revenue */}
        {/* <div className='m_item'> 
          <p className='m_cat'>Revenue</p>

          <div>
            {data.revenue}
          </div>
         </div>  */}

        {/* Tag Line  */}
        {/* <div className='m_item'> 
          <p className='m_cat'>Tagline</p>

          <div>
            {data.tagline}
          </div>
         </div>  */}

          {/* Production Companies */}
        {/* <div className='m_item'> 
          <p className='m_cat'>Production Companies</p>

          <div className='flex justify-start gap-5 flex-wrap'>
            {data.production_companies && data.production_companies.map((company , index) =>(
              // company.logo_path ?
              // <div key={company.id} title={company.name}>
              //   <img className='w-[120px] object-fit'  src={`https://image.tmdb.org/t/p/w500/${company.logo_path}.jpg`} />
              // </div>
              // : 
              <div key={index}>
                {company.name}
              </div>
              
            ))
            }

          </div>
        </div> */}
    </div>
  )
}

const SingleMoviePage = () => {

  let {movie} = useParams();

  const MovieTitleQuery = useQuery({
    queryKey: ["movie", movie], 
    queryFn: () => fetchSingleMovieDetails(movie), 
  });
  

  const MovieVideoQuery = useQuery({
    queryKey: ["video", movie], 
    queryFn: () => fetchSingleMovieVideo(movie), 
  });

  
  // console.log(MovieTitleQuery.data,'here')
  // console.log(MovieVideoQuery.data,'here')



  // {params.movie}
 
  return (
    <div className='text-white max-w-5xl mx-auto '>
      <div className='px-6 py-4 md:px-0'>
        {MovieTitleQuery.data && 
        <>
          <MovieTitle data={MovieTitleQuery.data}  />
        
          <MoviePosterVideo posterImg={MovieTitleQuery.data.poster_path
          } posterVideo={MovieVideoQuery.data}/>
          {/* <MovieAISummary/> */}
          <MovieDetails data={MovieTitleQuery.data}/>
        </>
        }
      </div>
    </div>
  )
}
 
export default SingleMoviePage