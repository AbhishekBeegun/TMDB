import * as React from 'react'
import { useParams ,useSearchParams} from "react-router";
import YouTube from 'react-youtube';
import { fetchSingleMovieDetails , fetchSingleMovieVideo } from '../lib/fetchData';
import { useQuery } from '@tanstack/react-query'

const MovieTitle = ({data}) => {
  return (
    <div className='flex justify-between items-center w-full '>
      <div>
        <h1 className='font-semibold text-lg md:text-[36px]'>{data.title}</h1>
        <p className='text-xs text-[#a2aed4] font-medium'><span>{data.release_date}</span> &bull; <span>{data.runtime}</span></p>
      </div> 

      <div className='flex items-center'>
        <div className='flex items-center bg-[#221F3D] px-3 py-2 rounded-md gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ffcd19" d="m8.125 7.092l2.608-3.47q.238-.322.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.605q.289.426.289.94q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.564 20l-.454-.056L12 18.733l-4.11 1.211q-.124.05-.24.053q-.117.003-.214.003q-.665 0-1.15-.483t-.459-1.188l.1-3.856l-2.629-3.548q-.159-.217-.229-.453Q3 10.236 3 10q0-.506.297-.942q.296-.435.828-.618z"></path></svg>

          <p className='text-xs font-semibold text-[#a2aed4] flex'><span className='text-white'>{data.vote_average}</span> / 10 &nbsp;<span className='hidden md:block'>({data.popularity}K)</span></p>
        </div>
      </div>
    </div>
  )
}

const MoviePosterVideo = ({posterImg , posterVideo}) => {
  return (
    <div className='flex flex-col md:flex-row gap-5 mt-6'>
      <div className='hidden  md:block md:w-1/4 bg-[#221F3D] h-[250px] md:h-[380px] rounded-lg'>
      {posterImg &&
       <img src={`https://image.tmdb.org/t/p/w500/${posterImg}.jpg`}  className='h-full object-cover w-full rounded-lg' />
      }
      </div>

      <div className='md:w-3/4 bg-[#221F3D] h-[250px] md:h-[380px] rounded-lg'>
        <div className='yt_container'>
          {posterVideo &&
            <YouTube
            videoId={posterVideo[0].key}
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
       <div className='m_item'> 
         <p className='m_cat'>Release Date</p>

         <div>
          {data.release_date}
         </div>
       </div>

         {/* Status */}
         <div className='m_item'> 
          <p className='m_cat'>Status</p>

          <div>
            {data.status}
          </div>
         </div> 

          {/* Budget*/}
         <div className='m_item'> 
          <p className='m_cat'>Budget</p>

          <div>
            {data.budget}
          </div>
         </div> 

        {/* Revenue */}
        <div className='m_item'> 
          <p className='m_cat'>Revenue</p>

          <div>
            {data.revenue}
          </div>
         </div> 

        {/* Tag Line  */}
        <div className='m_item'> 
          <p className='m_cat'>Tagline</p>

          <div>
            {data.tagline}
          </div>
         </div> 

          {/* Production Companies */}
        <div className='m_item'> 
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
        </div>
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