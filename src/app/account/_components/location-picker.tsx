"use client";

import "leaflet/dist/leaflet.css";
import type * as Leaflet from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import { districts } from "@/constants/routes";
import { DISTRICT_CENTERS, TAMIL_NADU_VIEW } from "@/constants/geo";
import type { GeoPoint } from "@/features/auth/types";
import { Field, Input, Select } from "@/components/ui/field";
import { Icon } from "@/components/ui/icons";

export interface LocationPickerLabels {
  districtLabel: string;
  chooseDistrict: string;
  wardLabel: string;
  wardPlaceholder: string;
  wardHint: string;
  mapHint: string;
  useMyLocation: string;
  locating: string;
  pinned: string;
  noPin: string;
}

/** A lime teardrop pin — a divIcon, so Leaflet needs no image assets (which
 *  are the usual cause of the "broken marker" bug in bundlers). */
function pinIcon(L: typeof Leaflet): Leaflet.DivIcon {
  return L.divIcon({
    className: "",
    html: `<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0z" fill="#84cc16" stroke="#111827" stroke-width="1.5"/>
      <circle cx="15" cy="15" r="5.5" fill="#111827"/>
    </svg>`,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });
}

/**
 * District dropdown + a Leaflet/OpenStreetMap map. Choosing a district flies the
 * map to that area; clicking (or dragging the pin, or "use my location") drops a
 * pin whose latitude/longitude is reported back. Free, no API key. Everything
 * touching Leaflet runs in effects, so it stays off the server.
 */
export function LocationPicker({
  district,
  ward,
  location,
  onDistrictChange,
  onWardChange,
  onLocationChange,
  labels,
}: {
  district: string;
  ward: string;
  location: GeoPoint | null;
  onDistrictChange: (district: string) => void;
  onWardChange: (ward: string) => void;
  onLocationChange: (point: GeoPoint) => void;
  labels: LocationPickerLabels;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const markerRef = useRef<Leaflet.Marker | null>(null);
  const leafletRef = useRef<typeof Leaflet | null>(null);
  const [locating, setLocating] = useState(false);
  const [pin, setPin] = useState<GeoPoint | null>(location);

  // Keep the latest callback reachable from Leaflet event handlers registered once.
  const onLocationChangeRef = useRef(onLocationChange);
  useEffect(() => {
    onLocationChangeRef.current = onLocationChange;
  }, [onLocationChange]);

  const dropPin = useCallback((lat: number, lng: number) => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      const marker = L.marker([lat, lng], { draggable: true, icon: pinIcon(L) }).addTo(map);
      marker.on("dragend", () => {
        const p = marker.getLatLng();
        setPin({ lat: p.lat, lng: p.lng });
        onLocationChangeRef.current({ lat: p.lat, lng: p.lng });
      });
      markerRef.current = marker;
    }
    setPin({ lat, lng });
    onLocationChangeRef.current({ lat, lng });
  }, []);

  // Create the map once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      leafletRef.current = L;

      const start = location
        ? { lat: location.lat, lng: location.lng, zoom: 15 }
        : district && DISTRICT_CENTERS[district as keyof typeof DISTRICT_CENTERS]
          ? DISTRICT_CENTERS[district as keyof typeof DISTRICT_CENTERS]
          : TAMIL_NADU_VIEW;

      const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(
        [start.lat, start.lng],
        start.zoom,
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
      map.on("click", (e: Leaflet.LeafletMouseEvent) => dropPin(e.latlng.lat, e.latlng.lng));
      mapRef.current = map;

      if (location) {
        const marker = L.marker([location.lat, location.lng], {
          draggable: true,
          icon: pinIcon(L),
        }).addTo(map);
        marker.on("dragend", () => {
          const p = marker.getLatLng();
          setPin({ lat: p.lat, lng: p.lng });
          onLocationChangeRef.current({ lat: p.lat, lng: p.lng });
        });
        markerRef.current = marker;
      }

      setTimeout(() => map.invalidateSize(), 60);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // Init runs once; district/location are only seeds for the opening view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fly to the chosen district (but leave any dropped pin where it is).
  useEffect(() => {
    const map = mapRef.current;
    const center = DISTRICT_CENTERS[district as keyof typeof DISTRICT_CENTERS];
    if (map && center) map.flyTo([center.lat, center.lng], center.zoom, { duration: 0.8 });
  }, [district]);

  const locate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current?.flyTo([latitude, longitude], 15, { duration: 0.8 });
        dropPin(latitude, longitude);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <div className="grid gap-5">
      <Field label={labels.districtLabel} htmlFor="district">
        <Select
          id="district"
          name="district"
          value={district}
          onChange={(e) => onDistrictChange(e.target.value)}
        >
          <option value="">{labels.chooseDistrict}</option>
          {districts.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </Field>

      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[0.8125rem] text-muted">{labels.mapHint}</p>
          <button
            type="button"
            onClick={locate}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-strong px-3 py-1.5 text-[0.75rem] font-semibold text-ink transition-colors hover:bg-hairline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
          >
            <Icon name="mapPin" className="size-3.5" />
            {locating ? labels.locating : labels.useMyLocation}
          </button>
        </div>
        <div
          ref={containerRef}
          className="relative isolate h-[300px] w-full overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface sm:h-[340px]"
        />
        <p className="mt-2 text-[0.75rem] text-muted tabular-nums">
          {pin ? `${labels.pinned}: ${pin.lat.toFixed(5)}, ${pin.lng.toFixed(5)}` : labels.noPin}
        </p>
      </div>

      <Field label={labels.wardLabel} htmlFor="ward" hint={labels.wardHint}>
        <Input
          id="ward"
          name="ward"
          value={ward}
          onChange={(e) => onWardChange(e.target.value)}
          placeholder={labels.wardPlaceholder}
          maxLength={80}
        />
      </Field>
    </div>
  );
}
