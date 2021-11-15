import React from "react";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const SearchVehicle = () => {
  const switchParam = (event) => {
    const param = event.target.value;
    let el = document.getElementById("search-param");
    el.name = param;
  };
  const { search } = useLocation();
  let q = new URLSearchParams(search);
  let defaultParam = "driver";
  let queryValue = "";
  if (q.get("driver")) {
    defaultParam = "driver";
    queryValue = q.get("driver");
  }
  if (q.get("licensePlate")) {
    defaultParam = "licensePlate";
    queryValue = q.get("licensePlate");
  }
  if (q.get("vin")) {
    defaultParam = "vin";
    queryValue = q.get("vin");
  }
  const [query, setQuery] = useState(queryValue);
  console.log(q.toString(), defaultParam, queryValue);

  return (
    <div className="continer">
      <div className="row justify-content-md-center">
        <div className="col-3">
          <select
            defaultValue={defaultParam}
            className="form-select"
            onChange={switchParam}
            aria-label="Search Using"
          >
            <option disabled>Search Using</option>
            <option value="driver">Driver</option>
            <option value="licensePlate">License Plate</option>
            <option value="vin">Vin</option>
          </select>
        </div>
        <div className="col-5">
          <form action="">
            <input
              type="search"
              className="form-control"
              name="driver"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              value={query}
              id="search-param"
              aria-label="Search Param"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export const Vehicle = (props) => {
  const [driver, setDriver] = useState(props.data.Driver);
  const [lp, setlp] = useState(props.data.LicensePlate);
  const [office, setOffice] = useState(props.data.Office);

  const editVehicle = (id) => {
    console.log("edit", id);
    const driverI = document.getElementById(id + "-driver");
    const driverP = document.getElementById(id + "-driver-p");
    const lpI = document.getElementById(id + "-lp");
    const lpP = document.getElementById(id + "-lp-p");
    const officeI = document.getElementById(id + "-office");
    const officeP = document.getElementById(id + "-office-p");
    const saveB = document.getElementById(id + "-save");
    const cancelB = document.getElementById(id + "-cancel");
    const editB = document.getElementById(id + "-edit");
    if (driverI.hidden) {
      driverI.hidden = lpI.hidden = officeI.hidden = false;
      driverP.hidden = lpP.hidden = officeP.hidden = true;
      saveB.hidden = false;
      cancelB.hidden = false;
      editB.hidden = true;
    } else {
      driverI.hidden = lpI.hidden = officeI.hidden = true;
      driverP.hidden = lpP.hidden = officeP.hidden = false;
      saveB.hidden = true;
      cancelB.hidden = true;
      editB.hidden = false;
    }
  };

  const patchVehicle = async (id) => {
    console.log("patch", id);
    const driverI = document.getElementById(id + "-driver");
    const driverP = document.getElementById(id + "-driver-p");
    const lpI = document.getElementById(id + "-lp");
    const lpP = document.getElementById(id + "-lp-p");
    const officeI = document.getElementById(id + "-office");
    const officeP = document.getElementById(id + "-office-p");
    const saveB = document.getElementById(id + "-save");
    const cancelB = document.getElementById(id + "-cancel");
    const editB = document.getElementById(id + "-edit");

    const response = await fetch("/api/vehicles/" + id, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        driver: driverI.value,
        licensePlate: lpI.value,
        office: officeI.value,
        customerName: props.data.CustomerName,
      }),
    });
    const data = await response.json();
    console.log(data);

    driverP.innerHTML = driverI.value;
    lpP.innerHTML = lp;
    officeP.innerHTML = office;
    driverI.hidden = lpI.hidden = officeI.hidden = true;
    driverP.hidden = lpP.hidden = officeP.hidden = false;
    saveB.hidden = true;
    cancelB.hidden = true;
    editB.hidden = false;
  };

  const cancelVehicleUpdate = (id) => {
    const driverI = document.getElementById(id + "-driver");
    const driverP = document.getElementById(id + "-driver-p");
    const lpI = document.getElementById(id + "-lp");
    const lpP = document.getElementById(id + "-lp-p");
    const officeI = document.getElementById(id + "-office");
    const officeP = document.getElementById(id + "-office-p");
    const saveB = document.getElementById(id + "-save");
    const cancelB = document.getElementById(id + "-cancel");
    const editB = document.getElementById(id + "-edit");

    setDriver(driverP.innerHTML);
    setlp(lpP.innerHTML);
    setOffice(officeP.innerHTML);

    driverI.hidden = lpI.hidden = officeI.hidden = true;
    driverP.hidden = lpP.hidden = officeP.hidden = false;
    saveB.hidden = true;
    cancelB.hidden = true;
    editB.hidden = false;
  };

  const id = props.data._id;
  return (
    <tr key={props.data._id}>
      <td>
        <p>{props.data.Vin}</p>
      </td>
      <td>
        <input
          type="text"
          id={id + "-driver"}
          value={driver}
          onChange={(event) => {
            setDriver(event.target.value);
          }}
          hidden
        />
        <p id={id + "-driver-p"}>{props.data.Driver}</p>
      </td>
      <td>
        <input
          type="text"
          id={id + "-lp"}
          value={lp}
          onChange={(event) => {
            setlp(event.target.value);
          }}
          hidden
        />
        <p id={id + "-lp-p"}>{props.data.LicensePlate}</p>
      </td>
      <td>
        <input
          type="text"
          id={id + "-office"}
          value={office}
          onChange={(event) => {
            setOffice(event.target.value);
          }}
          hidden
        />
        <p id={id + "-office-p"}>{props.data.Office}</p>
      </td>

      <td>{props.data.MMY}</td>
      <td>{props.data.CustomerName}</td>
      <td>{props.data.Status.ignition.toString()}</td>
      <td>{props.data.Status.speed}</td>
      <td>
        <button onClick={() => editVehicle(id)} id={id + "-edit"}>
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={() => patchVehicle(id)} hidden id={id + "-save"}>
          <i className="fas fa-check"></i>
        </button>
        <button
          onClick={() => cancelVehicleUpdate(id)}
          hidden
          id={id + "-cancel"}
        >
          <i className="fas fa-times"></i>
        </button>
      </td>
    </tr>
  );
};

export const Vehicles = () => {
  const PAGE_NUMBER = 1;
  const [data, setData] = useState(null);
  const [activeData, setActiveData] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(PAGE_NUMBER);
  const { search } = useLocation();

  useEffect(() => {
    (async () => {
      console.log(search);
      let x = new URLSearchParams(search);
      let driverParam = x.get("driver");
      let lpParam = x.get("licensePlate");
      let vinParam = x.get("vin");

      let q = {
        count: 100,
      };
      if (driverParam) {
        q.driver = driverParam;
      }
      if (lpParam) {
        q.licensePlate = lpParam;
      }
      if (vinParam) {
        q.vin = vinParam;
      }

      let url = "/api/vehicles?" + new URLSearchParams(q).toString();
      console.log("URL", url);
      const vehicles = await fetch(url)
        .then((res) => res.json())
        .then((result) => setData(result));
      console.debug(data, activeData);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      if (data.length < 10) {
        setActiveData(data);
        setHasMore(false);
      } else {
        setActiveData(data.slice(0, page * 10));
      }
    }
  }, [data, page]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage(page + 1);
      setHasMore(activeData.length < data.length);
    }, 500);
  };

  const ShowData = (props) => {
    console.debug("props.data", props.data);
    let vehicles = [];
    if (props.data) {
      for (let i = 0; i < props.data.length; i++) {
        vehicles.push(<Vehicle key={props.data[i]._id} data={props.data[i]} />);
      }
      return (
        <div>
          <InfiniteScroll
            dataLength={props.data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>All records fetched</b>
              </p>
            }
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Vin</th>
                  <th>Driver</th>
                  <th>License Plate</th>
                  <th>Office</th>
                  <th>MNY</th>
                  <th>Customer Name</th>
                  <th>Ignition</th>
                  <th>Speed</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>{vehicles}</tbody>
            </table>
          </InfiniteScroll>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  console.log("data", data);
  return (
    <div className="my-2">
      <h3>Vehicle Data</h3>
      <SearchVehicle />

      <ShowData data={activeData} />
    </div>
  );
};
