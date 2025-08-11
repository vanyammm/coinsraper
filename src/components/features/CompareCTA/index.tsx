"use client";

import {useCompareStore} from "@/modules/compare-store";
import Link from "next/link";

import "./style.scss";

export const CompareCTA = () => {
  const {compareIds, clearCompare} = useCompareStore();

  if (compareIds.length < 2) return null;

  return (
    <div className="compareCtaContainer">
      <span>Comparing {compareIds.length} coins</span>
      <Link href="/charts?filter=comparsion">Compare</Link>
      <button onClick={clearCompare}>&times;</button>
    </div>
  );
};
