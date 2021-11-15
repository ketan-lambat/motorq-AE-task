import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

export const Map = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const vehicles = await fetch("/api/vehicles?count=500")
        .then((res) => res.json())
        .then((data) => setData(data));
      console.debug(data, vehicles);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);

  const ShowData = (props) => {
    if (props.data) {
      // populate the markers array with location data
      let markers = [];
      for (let i = 0; i < props.data.length; i++) {
        markers.push(
          <Marker
            position={[
              props.data[i].Status.location.lat,
              props.data[i].Status.location.lon,
            ]}
          >
            {/* Tool tip for on hover popup */}
            <Tooltip>
              <div className="card" style={{ width: "16rem" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-8">
                      <h5 className="card-title">{props.data[i].Driver}</h5>
                    </div>
                    <div className="col">
                      <i
                        className={`fas fa-toggle-${
                          props.data[i].Status.ignition ? "on" : "off"
                        } fa-2x`}
                      ></i>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <h6 className="card-subtitle mb-2 text-muted">
                        {props.data[i].Vin}
                      </h6>
                    </div>
                    <div className="col card-subtitle mb-2 text-muted">
                      {props.data[i].MMY}
                    </div>
                  </div>
                  <div className="row mx-1">
                    <div className="col-8">
                      <div className="row fw-bold text-center">
                        License Plate
                      </div>
                      <div className="row text-center">
                        {props.data[i].LicensePlate}
                      </div>
                    </div>
                    <div className="col ">
                      <div className="row fw-bold text-center ">Speed</div>
                      <div className="row text-center">
                        {props.data[i].Status.speed} mph
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tooltip>
          </Marker>
        );
      }
      return (
        <MarkerClusterGroup className="cluster">{markers}</MarkerClusterGroup>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      <div className="container my-2">
        <div id="map">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="markercluster-map"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ShowData data={data} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};
