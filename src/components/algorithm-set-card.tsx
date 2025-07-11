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
import { MousePointerClick } from "lucide-react";

interface AlgorithmSetCardProps {
  algorithms: string[];
  name: string;
}

export default function AlgorithmSetCard({
  algorithms,
  name,
}: AlgorithmSetCardProps) {
  const [twistyPlayer, setTwistyPlayer] = useState<TwistyPlayer | undefined>();
  const cubeDiv = useRef<HTMLDivElement | null>(null);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string>(
    algorithms[0]
  );
  const [showEdgePermutation, setShowEdgePermutation] =
    useState<boolean>(false);

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
      console.log("showing edges");
    } else {
      twistyPlayer.experimentalStickeringMaskOrbits =
        "CORNERS:RRRRRRRR,EDGES:RRRROOOORRRR,CENTERS:RRRRRR";
      console.log("hiding edges");
    }
  }, [showEdgePermutation, currentAlgorithm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardAction>
          <Button variant={"outline"}>
            <MousePointerClick />
            Select All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div ref={cubeDiv} className="w-48"></div>
          <div className="grid grid-cols-6 gap-2">
            {algorithms.map((algorithm) => (
              <div
                className="h-28 w-28 border border-border rounded-lg"
                key={algorithm}
                onMouseEnter={() => {
                  setCurrentAlgorithm(algorithm);
                  setShowEdgePermutation(true);
                }}
              ></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
