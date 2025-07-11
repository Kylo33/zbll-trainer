import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TwistyPlayer } from "cubing/twisty";
import { Alg } from "cubing/alg";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";

export default function AlgorithmSetCard() {
  const cubeDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const twisty = new TwistyPlayer();
    const localCubeDiv = cubeDiv.current;

    // Customize cube
    twisty.controlPanel = "none";
    twisty.background = "none";

    twisty.style.width = "100%";
    twisty.style.height = "100%";

    twisty.experimentalSetupAlg = new Alg("U' r U R' U' r' F R F' z2")
      .invert()
      .toString();
    twisty.experimentalStickeringMaskOrbits =
      "CORNERS:RRRRRRRR,EDGES:RRRROOOORRRR,CENTERS:RRRRRR";

    cubeDiv.current?.appendChild(twisty);
    console.log(cubeDiv);
    return () => {
      localCubeDiv?.removeChild(twisty);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>T-1</CardTitle>
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
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
            <div className="h-28 w-28 border border-border rounded-lg"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
