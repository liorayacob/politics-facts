// Simple linear projection of lat/lng to a percentage position inside a bounding box.
// Good enough for placing city markers on a schematic (non-authoritative) map.
const BOUNDS = {
  minLat: 29.4,
  maxLat: 33.4,
  minLng: 34.2,
  maxLng: 35.9,
};

export function projectToPercent(lat: number, lng: number) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100;
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100;
  return { xPercent: x, yPercent: y };
}
