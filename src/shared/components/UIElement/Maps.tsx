import { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
type TMapProps = {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
};

export default function Maps(props: TMapProps) {
  const { center, zoom } = props;
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    return () => map.setTarget(undefined);
  }, [center, zoom]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" id="map"></div>;
}
