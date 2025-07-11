import { Alg } from "cubing/alg";
import { TwistyPlayer } from "cubing/twisty";
import { useRef, useEffect } from "react";

interface FlatCubeProps {
  algorithm: string;
}

export default function FlatCube({ algorithm }: FlatCubeProps) {
  const cubeDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const twisty = new TwistyPlayer();
    const localCubeDiv = cubeDiv.current;

    // Customize cube
    twisty.controlPanel = "none";
    twisty.background = "none";

    twisty.style.width = "100%";
    twisty.style.height = "100%";

    twisty.visualization = "experimental-2D-LL";
    twisty.experimentalSetupAlg = new Alg("z2").concat(
      new Alg(algorithm).invert()
    );

    cubeDiv.current?.appendChild(twisty);
    return () => {
      localCubeDiv?.removeChild(twisty);
    };
  }, []);

  return <div ref={cubeDiv} className="w-full h-full" />;
}
