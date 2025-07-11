import AlgorithmSetCard from "@/components/algorithm-set-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { MousePointerClick } from "lucide-react";
import algorithms from "@/algs.json";

export const Route = createFileRoute("/")({
  component: Index,
});

type Algorithms = {
  [cornerOrientation: string]: {
    [cornerPermutation: string]: {
      [edgePermutation: string]: string[];
    };
  };
};

const typedAlgorithms = algorithms as Algorithms;

function Index() {
  return (
    <div>
      <Tabs defaultValue={Object.keys(typedAlgorithms)[0]}>
        <div className="flex justify-between items-center">
          <TabsList>
            {Object.keys(typedAlgorithms).map((cornerOrientation) => (
              <TabsTrigger value={cornerOrientation} key={cornerOrientation}>
                {cornerOrientation}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button variant={"outline"}>
            <MousePointerClick /> Select All
          </Button>
        </div>
        {Object.keys(typedAlgorithms).map((cornerOrientation) => (
          <TabsContent
            value={cornerOrientation}
            key={cornerOrientation}
            className="flex flex-col gap-4 mt-2"
          >
            {Object.keys(typedAlgorithms[cornerOrientation]).map(
              (cornerPermutation) => (
                <AlgorithmSetCard
                  key={cornerPermutation}
                  algorithms={Object.values(
                    typedAlgorithms[cornerOrientation][cornerPermutation]
                  ).map((algGroup) => algGroup[0])}
                  name={`${cornerOrientation} - ${cornerPermutation}`}
                />
              )
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
