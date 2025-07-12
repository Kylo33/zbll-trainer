export type Algorithms = {
  [cornerOrientation: string]: {
    [cornerPermutation: string]: {
      [edgePermutation: string]: string[];
    };
  };
};

export type AlgCase = {
  algorithms: string[];
  cornerOrientation: string;
  cornerPermutation: string;
  edgePermutation: string;
};
