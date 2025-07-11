export type Algorithms = {
  [cornerOrientation: string]: {
    [cornerPermutation: string]: {
      [edgePermutation: string]: string[];
    };
  };
};
