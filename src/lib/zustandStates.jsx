
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

const useMCineDataStore = create((set) => ({
  MCinedata: [],
  updateMCinedata: (data) => set({ MCinedata: data }),
}));

export {useHeroImgsStore, useMCineDataStore};