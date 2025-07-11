import AlgorithmSetCard from "@/components/algorithm-set-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { MousePointerClick } from "lucide-react";
import algorithms from "@/algs.json";
import type { Algorithms } from "@/types/algorithms";

export const Route = createFileRoute("/")({
  component: Index,
});

const typedAlgorithms = algorithms as Algorithms;

const zbllSets = [
  {
    name: "T",
    cornerOrientation: "0021",
    subsets: ["123", "321", "213", "312", "231", "132"],
  },
  {
    name: "U",
    cornerOrientation: "0012",
    subsets: ["123", "321", "132", "231", "213", "312"],
  },
  {
    name: "L",
    cornerOrientation: "0102",
    subsets: ["123", "321", "312", "231", "213", "132"],
  },
  {
    name: "H",
    cornerOrientation: "1212",
    subsets: ["123", "321", "312", "231"],
  },
  {
    name: "Pi",
    cornerOrientation: "1122",
    subsets: ["123", "321", "213", "312", "132", "231"],
  },
  {
    name: "S",
    cornerOrientation: "0222",
    subsets: ["123", "321", "213", "312", "132", "231"],
  },
  {
    name: "As",
    cornerOrientation: "0111",
    subsets: ["123", "321", "312", "213", "132", "231"],
  },
];

function Index() {
  return (
    <div>
      <Tabs defaultValue={zbllSets[0].cornerOrientation}>
        <div className="flex justify-between items-center">
          <TabsList>
            {zbllSets.map((zbllSet) => (
              <TabsTrigger
                value={zbllSet.cornerOrientation}
                key={zbllSet.cornerOrientation}
              >
                {zbllSet.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button variant={"outline"}>
            <MousePointerClick /> Select All
          </Button>
        </div>
        {zbllSets.map((zbllSet) => (
          <TabsContent
            value={zbllSet.cornerOrientation}
            key={zbllSet.cornerOrientation}
            className="flex flex-col gap-4 mt-2"
          >
            {zbllSet.subsets.map((subsetCornerPermutation, index) => (
              <AlgorithmSetCard
                key={subsetCornerPermutation}
                algorithms={
                  typedAlgorithms[zbllSet.cornerOrientation][
                    subsetCornerPermutation
                  ]
                    ? Object.values(
                        typedAlgorithms[zbllSet.cornerOrientation][
                          subsetCornerPermutation
                        ]
                      ).map((algArr) => algArr[0])
                    : []
                }
                name={`${zbllSet.name}-${index + 1}`}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
