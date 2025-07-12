import { create } from "zustand";

type AlgStoreData = {
  [cornerOrientation: string]: {
    [cornerPermutation: string]: Set<string>;
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

export const useAlgorithmStore = create<AlgStore>((set) => ({
  selectedAlgs: {},
  addAlg: (
    cornerOrientation: string,
    cornerPermutation: string,
    edgePermutation: string
  ) => {
    return set((state) => {
      const existingCo = state.selectedAlgs[cornerOrientation] ?? {};
      const existingCp = existingCo[cornerPermutation] ?? new Set<string>();
      return {
        selectedAlgs: {
          ...state.selectedAlgs,
          [cornerOrientation]: {
            ...existingCo,
            [cornerPermutation]: new Set(existingCp).add(edgePermutation),
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

      const newSet = new Set(existingCp);
      newSet.delete(edgePermutation);

      return {
        selectedAlgs: {
          ...state.selectedAlgs,
          [cornerOrientation]: {
            ...existingCo,
            [cornerPermutation]: newSet,
          },
        },
      };
    });
  },
}));
