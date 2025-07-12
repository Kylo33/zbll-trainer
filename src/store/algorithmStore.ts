import { create } from "zustand";
import { persist } from "zustand/middleware";

type AlgStoreData = {
  [cornerOrientation: string]: {
    [cornerPermutation: string]: string[];
  };
};

type AlgStore = {
  selectedAlgs: AlgStoreData;
  addAlg: (
    cornerOrientation: string,
    cornerPermutation: string,
    edgePermutation: string
  ) => void;
  removeAlg: (
    cornerOrientation: string,
    cornerPermutation: string,
    edgePermutation: string
  ) => void;
};

export const useAlgorithmStore = create<AlgStore>()(
  persist(
    (set) => ({
      selectedAlgs: {},
      addAlg: (
        cornerOrientation: string,
        cornerPermutation: string,
        edgePermutation: string
      ) => {
        return set((state) => {
          const existingCo = state.selectedAlgs[cornerOrientation] ?? {};
          const existingCp = existingCo[cornerPermutation] ?? [];

          if (existingCp.find((s) => s == edgePermutation)) return state;

          return {
            selectedAlgs: {
              ...state.selectedAlgs,
              [cornerOrientation]: {
                ...existingCo,
                [cornerPermutation]: [...existingCp, edgePermutation],
              },
            },
          };
        });
      },
      removeAlg: (
        cornerOrientation: string,
        cornerPermutation: string,
        edgePermutation: string
      ) => {
        return set((state) => {
          const existingCo = state.selectedAlgs[cornerOrientation];
          if (!existingCo) return state;

          const existingCp = existingCo[cornerPermutation];
          if (!existingCp) return state;

          return {
            selectedAlgs: {
              ...state.selectedAlgs,
              [cornerOrientation]: {
                ...existingCo,
                [cornerPermutation]: existingCp.filter(
                  (ep) => ep != edgePermutation
                ),
              },
            },
          };
        });
      },
    }),
    {
      name: "selected-algorithm-storage",
    }
  )
);
