"use client";

import dynamic from "next/dynamic";
import type { CityResult } from "@/data/types";

const CityChoroplethMap = dynamic(() => import("./CityChoroplethMap"), {
  ssr: false,
  loading: () => <div className="map-card map-loading">טוען מפה…</div>,
});

export default function MapSection({ cities }: { cities: CityResult[] }) {
  return <CityChoroplethMap cities={cities} />;
}
