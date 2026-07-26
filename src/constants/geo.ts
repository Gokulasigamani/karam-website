import type { districts } from "./routes";

type District = (typeof districts)[number];

export interface MapView {
  lat: number;
  lng: number;
  zoom: number;
}

/**
 * Where the map should fly when a district is chosen. Coordinates are the
 * district headquarters town; a zoom of 12 frames the town and its immediate
 * wards without hiding neighbouring areas. Used by the profile location picker.
 */
export const DISTRICT_CENTERS: Record<District, MapView> = {
  Chennai: { lat: 13.0827, lng: 80.2707, zoom: 12 },
  Coimbatore: { lat: 11.0168, lng: 76.9558, zoom: 12 },
  Cuddalore: { lat: 11.748, lng: 79.7714, zoom: 12 },
  Dindigul: { lat: 10.3624, lng: 77.9695, zoom: 12 },
  Erode: { lat: 11.341, lng: 77.7172, zoom: 12 },
  Kanchipuram: { lat: 12.8342, lng: 79.7036, zoom: 12 },
  Madurai: { lat: 9.9252, lng: 78.1198, zoom: 12 },
  Nagapattinam: { lat: 10.7656, lng: 79.8424, zoom: 12 },
  Salem: { lat: 11.6643, lng: 78.146, zoom: 12 },
  Thanjavur: { lat: 10.787, lng: 79.1378, zoom: 12 },
  Tiruchirappalli: { lat: 10.7905, lng: 78.7047, zoom: 12 },
  Tirunelveli: { lat: 8.7139, lng: 77.7567, zoom: 12 },
  Tiruppur: { lat: 11.1085, lng: 77.3411, zoom: 12 },
  Tiruvallur: { lat: 13.1439, lng: 79.9094, zoom: 12 },
  Vellore: { lat: 12.9165, lng: 79.1325, zoom: 12 },
  Villupuram: { lat: 11.9401, lng: 79.4861, zoom: 12 },
};

/** Whole-of-Tamil-Nadu view, used before a district is picked. */
export const TAMIL_NADU_VIEW: MapView = { lat: 11.1271, lng: 78.6569, zoom: 7 };
