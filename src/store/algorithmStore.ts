import type { Algorithms } from "@/types/algorithms";
import { create } from "zustand";

export const useAlgorithmStore = create((set) => ({
  selectedAlgorithms: {},
  addAlgorithms: (
    cornerOrientation: string,
    cornerPermutation: string,
    ...edgePermutations: string[]
  ) =>
    set((state: { selectedAlgorithms: Algorithms }) => ({
      selectedAlgorithms: {
        ...state.selectedAlgorithms,
        cornerOrientation: {
          ...state.selectedAlgorithms[cornerOrientation],
          cornerPermutation: {
            ...state.selectedAlgorithms[cornerOrientation][cornerPermutation],
            ...edgePermutations,
          },
        },
      },
    })),
}));
