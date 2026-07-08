"use client";

import dynamic from "next/dynamic";

const CubeScene = dynamic(() => import("./cube-scene"), {
  ssr: false,
  loading: () => null,
});

export default function CubeSceneLazy() {
  return <CubeScene />;
}
