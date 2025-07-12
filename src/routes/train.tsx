import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
// import { puzzles } from 'cubing/puzzles';
// import { randomScrambleForEvent } from 'cubing/scramble';
// import { experimentalSolve3x3x3IgnoringCenters } from 'cubing/search';
import { Eye, SkipForward, Star } from "lucide-react";
import "cubing/twisty";
import { TwistyPlayer } from "cubing/twisty";
import { useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useAlgorithmStore } from "@/store/algorithmStore";

export const Route = createFileRoute("/train")({
  component: Train,
});

function Train() {
  const cubeDiv = useRef<HTMLDivElement | null>(null);
  const randomCase = useAlgorithmStore((state) => state.randomCase);
  const nextRandomCase = useAlgorithmStore((state) => state.nextRandomCase);

  useEffect(() => {
    const twisty = new TwistyPlayer();
    const localCubeDiv = cubeDiv.current;

    // Customize cube
    twisty.controlPanel = "none";
    twisty.background = "none";

    twisty.style.width = "100%";
    twisty.style.height = "100%";

    cubeDiv.current?.appendChild(twisty);
    return () => {
      localCubeDiv?.removeChild(twisty);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 lg:col-span-2 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Scramble</CardTitle>
              <CardDescription>
                Scramble the cube from its current position to start solving.
              </CardDescription>
              <CardAction>
                <Button variant={"outline"} onClick={nextRandomCase}>
                  <SkipForward />
                  Skip
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="font-mono bg-muted py-2 px-4 rounded-sm flex flex-between gap-x-2">
                R U R' U' R' F R2 U' R' U' R U R' F'
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cube Visualization</CardTitle>
              <CardDescription>
                Interact with the 3D cube below to view its current state and
                orientation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={cubeDiv} className="w-full aspect-video"></div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-3 lg:col-span-1">
          <CardHeader>
            <CardTitle>View Algorithms</CardTitle>
            <CardDescription>See solutions for this case.</CardDescription>
            <CardAction>
              <Button size={"icon"} variant={"outline"}>
                <Eye />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {randomCase.algorithms.map((algorithm) => (
              <div className="bg-muted py-2 px-4 rounded-sm gap-x-2">
                <div className="font-mono">{algorithm}</div>
                <div className="text-xs text-muted-foreground mt-2 flex justify-between items-center">
                  <span className="">11 HTM</span>
                  <Star size={16} className="text-yellow-300 fill-current" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Times</CardTitle>
          <CardDescription>
            Track your latest solve times and monitor your progress here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Case</TableHead>
                <TableHead className="font-bold">Time</TableHead>
                <TableHead className="font-bold">Scramble</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">T-26</TableCell>
                <TableCell>12.34s</TableCell>
                <TableCell>
                  <span className="font-mono py-1 px-2 bg-muted rounded-sm">
                    R U R' U' R' F R2 U' R' U' R U R' F'
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">U-31</TableCell>
                <TableCell>10.87s</TableCell>
                <TableCell>
                  <span className="font-mono py-1 px-2 bg-muted rounded-sm">
                    F R U' R' U' R U R' F' R U R' U' R' F R2
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">L-12</TableCell>
                <TableCell>14.02s</TableCell>
                <TableCell>
                  <span className="font-mono py-1 px-2 bg-muted rounded-sm">
                    U2 R2 F2 U' R2 U2 R2 U' F2 U2
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">S-1</TableCell>
                <TableCell>11.56s</TableCell>
                <TableCell>
                  <span className="font-mono py-1 px-2 bg-muted rounded-sm">
                    R' U' F U R U' R' F' R2 U R'
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
