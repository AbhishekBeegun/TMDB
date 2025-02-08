
import { create } from 'zustand'

const useHeroImgsStore = create((set) => ({
    images: [],
    hasImages: false,
    addImages: (newImage) =>
        set((state) => {
          const updatedImages = [...state.images, newImage];
          return { 
            images: updatedImages, 
            hasImages: updatedImages.length > 0 
          };
        }),
}))

export {useHeroImgsStore};