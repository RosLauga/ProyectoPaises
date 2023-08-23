import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./Searchbar.js";
import Paginado from "./Paginado.js";
import {
  getCountries,
  getFilter,
  listActivity,
  filterActivity,
} from "../actions/index.js";
import "./Home.css";
import Card from "./Card";
import { sortDesc, sortAsc, sortPopAsc, sortPopDesc } from "./functions/index";

export default function Home() {
  // PAGINADO
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const actividades = useSelector((state) => state.activity);
  const [paginas, setPaginas] = useState(1);
  const [paises, setPaises] = useState(9);
  const ultimopaislista =
    paginas === 1 ? paginas * paises : paginas * paises - 1;
  const primerpaislista = ultimopaislista - paises;
  var paginactual = allCountries?.slice(primerpaislista, ultimopaislista);
  var paisestotales = allCountries?.length;

  const location = useLocation();
  const basepaises = 10;

  useEffect(() => {
    if (location.search.length > 0) {
      dispatch(getCountries(location.search));
    } else {
      dispatch(getCountries());
      dispatch(listActivity());
    }
  }, [dispatch, location.search]);

  const paginacion = (pvalor) => {
    if (pvalor === 1) {
      setPaginas(pvalor);
      setPaises(9);
    } else {
      setPaginas(pvalor);
      setPaises(10);
    }
    // var array = document.getElementsByClassName(e.target.className)
    // const ba = "button-item button-active"
    // const bi = "button-item"
    // for (var i = 0;i < array.length;i++){
    //     if (i+1 == pvalor) {
    //         array[i].className = ba;
    //     }
    //     else {
    //         array[i].className = bi;
    //     }
    // }
  };
  // ESTADOS PARA RENDERIZAR FILTROS
  const [Asc, setAsc] = useState(0);

  // ORDENAR POR CONTINENTE
  function handleRegion(e) {
    setPaginas(1);
    dispatch(getFilter(e.target.value));
  }
  // ORDENAR POR ACTIVIDAD
  function handleActivity(e) {
    e.preventDefault();
    setPaginas(1);
    dispatch(filterActivity(e.target.value));
  }
  // HANDLER DE FILTROS ESTADO
  const handleAsctoDesc = (e) => {
    e.preventDefault();
    if (e.target.value === "asc") {
      allCountries.sort(sortDesc);
      return setAsc(1);
    } else if (e.target.value === "desc") {
      allCountries.sort(sortAsc);
      return setAsc(2);
    } else if (e.target.value === "popasc") {
      allCountries.sort(sortPopDesc);
      return setAsc(3);
    } else if (e.target.value === "popdesc") {
      allCountries.sort(sortPopAsc);
      return setAsc(4);
    } else return setAsc(0);
  };
  // VER TODOS
  function refresh(e) {
    e.preventDefault();
    dispatch(getCountries("/"));
  }
  return (
    <section>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <button
            onClick={(e) => {
              refresh(e);
            }}>
            Ver todos
          </button>
        </li>
        <li className="nav-item">
          <SearchBar paginacion={paginacion} />
        </li>
        <li className="nav-item">
          <div className="selectdiv">
            <label>
              <select
                onChange={(e) => {
                  handleAsctoDesc(e);
                }}>
                <option value="all">Alfabeticamente</option>
                <option value="asc">-- Ascendente</option>
                <option value="desc">-- Descendente</option>
              </select>
            </label>
          </div>
        </li>
        <li className="nav-item">
          <div className="selectdiv">
            <label>
              <select
                onChange={(e) => {
                  handleAsctoDesc(e);
                }}>
                <option value="all">Población</option>
                <option value="popasc">-- Ascendente</option>
                <option value="popdesc">-- Descendente</option>
              </select>
            </label>
          </div>
        </li>
        <li className="nav-item">
          <div className="selectdiv">
            <label>
              <select
                onChange={(e) => {
                  handleRegion(e);
                }}>
                <option value="all">Seleccionar Continente..</option>
                <option value="Americas">America</option>
                <option value="Antarctic">Antartida</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option>
              </select>
            </label>
          </div>
        </li>
        <li className="nav-item">
          <div className="selectdiv">
            <select
              onChange={(e) => {
                handleActivity(e);
              }}>
              <option>Seleccionar actividad turistica...</option>
              {actividades ? (
                actividades.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))
              ) : (
                <option>No existen actividades</option>
              )}
            </select>
          </div>
        </li>
        <li className="nav-item">
          <Link to="/activity">
            <button className="button-create">Crear Actividad Turistica</button>
          </Link>
        </li>
      </ul>
      <Paginado
        paisestotales={paisestotales}
        paisesxpagina={basepaises}
        paginacion={paginacion}
      />
      <div className="Container Cardwrap">
        {paginactual &&
          paginactual?.map((c) => {
            return (
              <Card
                key={c.name}
                error={c.msg}
                id={c.id}
                name={c.name}
                region={c.region}
                image={c.flags}
              />
            );
          })}
      </div>
    </section>
  );
}
