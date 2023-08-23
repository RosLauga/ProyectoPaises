import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../actions";
import "./CountryDetail.css";

function CountryDetail() {
  const dispatch = useDispatch();
  const {
    name,
    flags,
    region,
    capital,
    subregion,
    id,
    population,
    area,
    lat,
    long,
    tourisms,
  } = useSelector((state) => state.country);
  const { idname } = useParams();
  const datos = useSelector((state) => state.country);
  useEffect(() => {
    dispatch(getCountry(idname));
  }, [dispatch, idname]);
  // DETALLE EN POBLACIÓN Y ÁREA (CIEN, MIL, ETC)
  if (population) {
    var numarea = "";
    var numpop = "";
    var numchange = population.toString().toLocaleString();
    numpop =
      numchange.length <= "3"
        ? ""
        : numchange.length <= "6"
        ? "mil"
        : numchange.length <= "9"
        ? "millones de"
        : "mil millones de";
  } else {
    numpop = "No Posee";
  }
  if (area) {
    var areachange = area.toLocaleString();
    numarea =
      areachange[0] === "0"
        ? ""
        : areachange.length <= "3"
        ? ""
        : areachange.length <= "6"
        ? "mil"
        : areachange.length <= "9"
        ? "millones de"
        : "";
  } else {
    numarea = "Sin área";
  }

  return (
    <>
      <section className="Containerleft">
        <div className="CountryCol">
          <div className="CountryDetail">
            <div className="contflag">
              <img src={flags} alt="Imagen sin encontrar" />
            </div>
            <h1>País: {name}</h1>
            <h3>Código País: {id}</h3>
            <h3>Continente: {region}</h3>
            <h3>Capital: {capital}</h3>
            <h3>Subregion: {subregion}</h3>
            <h3>
              Área: {area && parseFloat(area).toLocaleString()} {numarea} km2{" "}
            </h3>
            <h3>
              Población: {population && parseInt(population).toLocaleString()}{" "}
              {numpop} habitantes
            </h3>
          </div>
        </div>
        <div className="CountryCol">
          <div className="CountryDetail">
            <h1>Actividades turisticas</h1>
            <div className="Container-Activity">
              <iframe
                className="iframe"
                key={lat}
                title={name}
                src={`https://maps.google.com/?ll=${lat},${long}&z=5&output=embed`}
              />

              {tourisms ? (
                tourisms.map((c) => {
                  return (
                    <>
                      <ul key={area} className="tourism-list">
                        <li className="tourism-item">Nombre: {c.name}</li>
                        <li className="tourism-item">Temporada: {c.season}</li>
                        <li className="tourism-item">Duración: {c.duration}</li>
                        <li className="tourism-item">
                          Dificultad: {c.difficulty} estrella/s
                        </li>
                      </ul>
                    </>
                  );
                })
              ) : (
                <p>No existen actividades</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CountryDetail;
