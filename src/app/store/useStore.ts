import { create } from "zustand";

interface StoreState {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
}

const useStore = create<StoreState>(
  (set: (partial: Partial<StoreState>) => void) => ({
    selectedLocation: "",
    setSelectedLocation: (location: string) =>
      set({ selectedLocation: location }),
    minPrice: 0,
    setMinPrice: (price: number) => set({ minPrice: price }),
    maxPrice: 0,
    setMaxPrice: (price: number) => set({ maxPrice: price }),
  })
);

export default useStore;
