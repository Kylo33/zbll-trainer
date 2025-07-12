import type { AlgCase, Algorithms } from "@/types/algorithms";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import algorithms from "@/algs.json";

const typedAlgorithms = algorithms as Algorithms;

type AlgStoreData = {
  [cornerOrientation: string]: {
    [cornerPermutation: string]: string[];
  };
};

type AlgStore = {
  randomCase: AlgCase;
  nextRandomCase: () => void;
  selectedCases: AlgStoreData;
  addCase: (
    cornerOrientation: string,
    cornerPermutation: string,
    edgePermutation: string
  ) => void;
  removeCase: (
    cornerOrientation: string,
    cornerPermutation: string,
    edgePermutation: string
  ) => void;
  toggleCase: (
    cornerOrientation: string,
    cornerPermutation: string,
    edgePermutation: string
  ) => void;
};

const getRandomCase = (selectedCases: AlgStoreData): AlgCase => {
  const availableCases: AlgCase[] = [];

  for (const cornerOrientation in selectedCases) {
    for (const cornerPermutation in selectedCases[cornerOrientation]) {
      for (const edgePermutation of selectedCases[cornerOrientation][
        cornerPermutation
      ]) {
        availableCases.push({
          algorithms:
            typedAlgorithms[cornerOrientation][cornerPermutation][
              edgePermutation
            ],
          cornerOrientation,
          cornerPermutation,
          edgePermutation,
        });
      }
    }
  }

  if (!availableCases.length) {
    for (const cornerOrientation in typedAlgorithms) {
      for (const cornerPermutation in typedAlgorithms[cornerOrientation]) {
        for (const edgePermutation in typedAlgorithms[cornerOrientation][
          cornerPermutation
        ]) {
          availableCases.push({
            algorithms:
              typedAlgorithms[cornerOrientation][cornerPermutation][
                edgePermutation
              ],
            cornerOrientation,
            cornerPermutation,
            edgePermutation,
          });
        }
      }
    }
  }

  return availableCases[Math.floor(Math.random() * availableCases.length)];
};

export const useAlgorithmStore = create<AlgStore>()(
  persist(
    (set) => ({
      randomCase: getRandomCase({}),
      nextRandomCase: () =>
        set((state) => ({
          randomCase: getRandomCase(state.selectedCases),
        })),
      selectedCases: {},
      addCase: (
        cornerOrientation: string,
        cornerPermutation: string,
        edgePermutation: string
      ) => {
        return set((state) => {
          const existingCo = state.selectedCases[cornerOrientation] ?? {};
          const existingCp = existingCo[cornerPermutation] ?? [];

          if (existingCp.find((s) => s == edgePermutation)) return state;

          const newSelectedCases = {
            ...state.selectedCases,
            [cornerOrientation]: {
              ...existingCo,
              [cornerPermutation]: [...existingCp, edgePermutation],
            },
          };

          return {
            selectedCases: newSelectedCases,
            randomCase: getRandomCase(newSelectedCases),
          };
        });
      },
      removeCase: (
        cornerOrientation: string,
        cornerPermutation: string,
        edgePermutation: string
      ) => {
        return set((state) => {
          const existingCo = state.selectedCases[cornerOrientation];
          if (!existingCo) return state;

          const existingCp = existingCo[cornerPermutation];
          if (!existingCp) return state;

          const newEp = existingCp.filter((ep) => ep != edgePermutation);

          const newSelectedCases = {
            ...state.selectedCases,
            [cornerOrientation]: {
              ...existingCo,
              [cornerPermutation]: newEp,
            },
          };

          return {
            selectedCases: newSelectedCases,
            randomCase: getRandomCase(newSelectedCases),
          };
        });
      },
      toggleCase: (
        cornerOrientation: string,
        cornerPermutation: string,
        edgePermutation: string
      ) => {
        return set((state) => {
          const existingCo = state.selectedCases[cornerOrientation] ?? {};
          const existingCp = existingCo[cornerPermutation] ?? [];

          const newSelectedCases = {
            ...state.selectedCases,
            [cornerOrientation]: {
              ...existingCo,
              [cornerPermutation]: existingCp.includes(edgePermutation)
                ? existingCp.filter((ep) => ep != edgePermutation)
                : [...existingCp, edgePermutation],
            },
          };

          return {
            selectedCases: newSelectedCases,
            randomCase: getRandomCase(newSelectedCases),
          };
        });
      },
    }),
    {
      name: "selected-algorithm-storage",
    }
  )
);
