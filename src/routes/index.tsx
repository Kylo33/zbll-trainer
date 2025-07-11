import AlgorithmSetCard from "@/components/algorithm-set-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { MousePointerClick } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const zbllSets = ["T", "U", "L", "H", "Pi", "S", "AS"];

function Index() {
  return (
    <div>
      <Tabs defaultValue={`zbll-${zbllSets[0].toLowerCase()}`}>
        <div className="flex justify-between items-center">
          <TabsList>
            {zbllSets.map((set) => (
              <TabsTrigger value={`zbll-${set.toLowerCase()}`} key={set}>
                {set}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button variant={"outline"}>
            <MousePointerClick /> Select All
          </Button>
        </div>
        {zbllSets.map((set) => (
          <TabsContent
            value={`zbll-${set.toLowerCase()}`}
            key={set}
            className="flex flex-col gap-4 mt-2"
          >
            {[...Array(6).keys()]
              .map((i) => i + 1)
              .map((_i) => (
                <AlgorithmSetCard key={_i} />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
