import {Suspense} from "react";
import ChartsView from "./ChartsView";

export default function ChartsPage() {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <ChartsView />
    </Suspense>
  );
}
