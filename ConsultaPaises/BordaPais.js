import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
 
const WIDTH = 800;
const HEIGHT = 500;
const PADDING = 20;
 
export default function BordaPais({ pais }) {
  const [caminho, setCaminho] = useState("");

  useEffect(() => {
    async function carregaPais() {
      if (!pais) return;

      const match = pais.match(/relation\/(\d+)/);
      if (!match) return;

      const id = match[1];

      const res = await fetch(
        `https://nominatim.openstreetmap.org/lookup?osm_ids=R${id}&format=json&polygon_geojson=1`
      );
      const data = await res.json();

      if (!data.length) return;

      const geojson = data[0].geojson;
      const path = geoJsonToPath(geojson);
      setCaminho(path);
    }

    carregaPais();
  }, [pais]);

  return (
    <View>
      <Svg width={WIDTH} height={HEIGHT}>
        <Path
          d={caminho}
          stroke="#ff0000"
          strokeWidth={1.5}
          fill="rgba(255,0,0,0.2)"
        />
      </Svg>
    </View>
  );
}
 
function geoJsonToPath(geojson) {
  let path = "";
 
  const polygons =
    geojson.type === "Polygon"
      ? [geojson.coordinates]
      : geojson.coordinates;
 
  polygons.forEach((polygon) => {
    polygon.forEach((ring) => {
      ring.forEach(([lon, lat], index) => {
        const x = projectX(lon);
        const y = projectY(lat);
 
        path += `${index === 0 ? "M" : "L"} ${x} ${y} `;
      });
 
      path += "Z ";
    });
  });
 
  return path;
}
 
function projectX(lon) {
  return ((lon + 180) / 360) * WIDTH;
}
 
function projectY(lat) {
  return ((90 - lat) / 180) * HEIGHT;
}
