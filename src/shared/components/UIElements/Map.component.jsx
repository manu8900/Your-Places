import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.styles.css";

const Map = props => {
    const { center, zoom } = props;
    const mapRef = useRef();
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFudTg5MDAiLCJhIjoiY2thZmZmOXZjMDJ3ZzJxbnY5OTQ5Y3BmNSJ9.crGo_MrcddFuDpe1n2_Qmg';

     const map = new mapboxgl.Map({
            container: mapRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: center,
            zoom: zoom,  
       });
     
     new mapboxgl.Marker().setLngLat([center.lng,center.lat]).addTo(map);
    }, [center,zoom]);//whenever changes made to the center or zoom props the map is re rendered
    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        ></div>
    );
};


export default Map;