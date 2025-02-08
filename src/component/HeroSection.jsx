import * as React from 'react'
import * as motion from "motion/react-client"
import SearchBar from './SearchBar'
import { useHeroImgsStore } from '../lib/zustandStates'

const HeroSection = () => {
    // const PosterCard = ["https://posters-slider.uiinitiative.com/images/1.jpg 1-6"] 
    const { images, hasImages } = useHeroImgsStore();
    const [newImages, setNewImages] = React.useState([]);

    React.useEffect(() => {
        // console.log(hasImages);
        if (hasImages) {
          const NewImages = [
            `https://image.tmdb.org/t/p/w500/${images[2]}.jpg`,
            `https://image.tmdb.org/t/p/w500/${images[3]}.jpg`,
            `https://image.tmdb.org/t/p/w500/${images[5]}.jpg`,
          ];
          setNewImages(NewImages); 
        } else {
            const NewImages = [
                `https://posters-slider.uiinitiative.com/images/1.jpg`,
                `https://posters-slider.uiinitiative.com/images/2.jpg`,
                `https://posters-slider.uiinitiative.com/images/3.jpg`,
              ];
          setNewImages(NewImages);
        }
    }, [hasImages, images]);
    
  return (
    <div className="w-screen bg-[url('/src/assets/BG.png')] bg-cover bg-center px-6 md:px-0">
        <div className="flex flex-col justify-center items-center pt-10 pb-10 ">
            <div className='relative h-[230px] w-[120px] md:w-[100px]'>
                <motion.div 
                    className='absolute rotate-8 left-18 top-3 w-[150px] h-[230px] scale-70 md:scale-90'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <img src={newImages[0]} className='rounded-lg h-full w-full' />
                </motion.div>

                <motion.div 
                    className='absolute w-[150px] h-[230px] z-10 sm:scale-90 md:scale-100'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <img src={newImages[1]} className='rounded-lg h-full w-full' />
                </motion.div>

                <motion.div 
                    className='absolute -rotate-8 -left-24 top-3 w-[150px] h-[230px] scale-70 md:scale-90'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <img src={newImages[2]} className='rounded-lg h-full w-full' />
                </motion.div>
            </div>

            <h1 className='text-white font-bold text-[36px] md:text-[56px] leading-[36px] md:leading-[60px] text-center mt-10'>Find <span className='text-[#cab6ff]'>Movies</span> You&apos;ll Love <br/>Without the Hassle</h1>

            <SearchBar />
        </div>
    </div>
  )
}

export default HeroSection