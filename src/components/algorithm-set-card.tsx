import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TwistyPlayer } from "cubing/twisty";
import { Alg } from "cubing/alg";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MousePointerClick, SquareX } from "lucide-react";
import FlatCube from "./flat-cube";
import clsx from "clsx";
import { useAlgorithmStore } from "@/store/algorithmStore";
import type { AlgCase } from "@/types/algorithms";

interface AlgorithmSetCardProps {
  algorithms: AlgCase[];
  name: string;
}

export default function AlgorithmSetCard({
  algorithms,
  name,
}: AlgorithmSetCardProps) {
  const [twistyPlayer, setTwistyPlayer] = useState<TwistyPlayer | undefined>();
  const cubeDiv = useRef<HTMLDivElement | null>(null);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string>(
    algorithms[0].algorithms[0]
  );
  const [showEdgePermutation, setShowEdgePermutation] =
    useState<boolean>(false);
  const selectedAlgorithms = useAlgorithmStore((state) => state.selectedCases);
  const addAlg = useAlgorithmStore((state) => state.addCase);
  const removeAlg = useAlgorithmStore((state) => state.removeCase);
  const toggleAlg = useAlgorithmStore((state) => state.toggleCase);

  let allAlgsSelected = algorithms.every((algorithm) =>
    selectedAlgorithms[algorithm.cornerOrientation]?.[
      algorithm.cornerPermutation
    ]?.includes(algorithm.edgePermutation)
  );

  useEffect(() => {
    const twisty = new TwistyPlayer();
    const localCubeDiv = cubeDiv.current;

    // Customize cube
    twisty.controlPanel = "none";
    twisty.background = "none";

    twisty.style.width = "100%";
    twisty.style.height = "100%";

    twisty.experimentalSetupAlg = new Alg("z2").concat(
      new Alg(currentAlgorithm).invert()
    );
    twisty.experimentalStickeringMaskOrbits =
      "CORNERS:RRRRRRRR,EDGES:RRRROOOORRRR,CENTERS:RRRRRR";

    setTwistyPlayer(twisty);
    cubeDiv.current?.appendChild(twisty);
    return () => {
      localCubeDiv?.removeChild(twisty);
    };
  }, []);

  useEffect(() => {
    if (!twistyPlayer) return;
    twistyPlayer.experimentalSetupAlg = new Alg("z2").concat(
      new Alg(currentAlgorithm).invert()
    );

    if (showEdgePermutation) {
      twistyPlayer.experimentalStickeringMaskOrbits =
        "CORNERS:RRRRRRRR,EDGES:RRRR----RRRR,CENTERS:RRRRRR";
    } else {
      twistyPlayer.experimentalStickeringMaskOrbits =
        "CORNERS:RRRRRRRR,EDGES:RRRROOOORRRR,CENTERS:RRRRRR";
    }
  }, [showEdgePermutation, currentAlgorithm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardAction>
          <Button
            variant={"outline"}
            onClick={() =>
              allAlgsSelected
                ? algorithms.forEach((algorithm) =>
                    removeAlg(
                      algorithm.cornerOrientation,
                      algorithm.cornerPermutation,
                      algorithm.edgePermutation
                    )
                  )
                : algorithms.forEach((algorithm) =>
                    addAlg(
                      algorithm.cornerOrientation,
                      algorithm.cornerPermutation,
                      algorithm.edgePermutation
                    )
                  )
            }
          >
            {allAlgsSelected ? <SquareX /> : <MousePointerClick />}{" "}
            {allAlgsSelected ? "Deselect All" : "Select All"}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div ref={cubeDiv} className="w-48"></div>
          <div className="grid grid-cols-6 gap-2">
            {algorithms.map((algorithm) => (
              <div
                className={clsx({
                  "h-28 w-28 border border-border rounded-lg transition-all duration-200 cursor-pointer":
                    true,
                  "bg-emerald-500/50": selectedAlgorithms[
                    algorithm.cornerOrientation
                  ]?.[algorithm.cornerPermutation]?.find(
                    (ep) => ep == algorithm.edgePermutation
                  ),
                })}
                key={algorithm.algorithms[0]}
                onMouseEnter={() => {
                  setCurrentAlgorithm(algorithm.algorithms[0]);
                  setShowEdgePermutation(true);
                }}
                onMouseLeave={() => {
                  setShowEdgePermutation(false);
                }}
                onClick={() => {
                  toggleAlg(
                    algorithm.cornerOrientation,
                    algorithm.cornerPermutation,
                    algorithm.edgePermutation
                  );
                }}
              >
                <FlatCube algorithm={algorithm.algorithms[0]} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
