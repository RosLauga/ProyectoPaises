const { Router } = require("express");
const express = require("express");
const { default: axios } = require("axios");
const { Country, Tourism, CountriesTourism } = require("../db");
const { Op } = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const getCountries = async () => {
  const paises = await axios.get("https://restcountries.com/v3/all");
  return paises;
};

const createCountries = async (paises) => {
  const mapc = await paises.data.map(async (p) => {
    const country = await Country.create({
      id: p.cca3,
      name: p.name.common,
      flags: p.flags[1],
      region: p.region,
      capital: p.capital ? p.capital[0] : "No tiene capital",
      subregion: p.subregion,
      area: p.area,
      population: p.population,
      lat: p.latlng ? p.latlng[0] : "sin datos",
      long: p.latlng ? p.latlng[1] : "sin datos",
    });
  });
  return console.log("Paises cargados");
};
const getandCreate = async () => {
  const get = await getCountries();
  const create = await createCountries(get);
};

router.get("/countries", async (req, res) => {
  const { name } = req.query;
  var rname;
  if (name) {
    if (name.includes("%20")) {
      rname = name
        .toLowerCase()
        .replace(/%20/g, " ")
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    } else {
      const cname = name.toLowerCase();
      rname = cname.replace(/\w\S*/g, (w) =>
        w.replace(/^\w/, (c) => c.toUpperCase())
      );
    }
    const pname = await Country.findOne({
      where: {
        name: {
          [Op.substring]: rname,
        },
      },
      include: Tourism,
    });
    console.log("pais", pname);

    if (pname) res.send([pname]);
    else res.send([{ msg: "No se encontró el país" }]);
  } else {
    const check = await Country.findOne();
    console.log(check);
    if (check) {
      const todos = await Country.findAll({
        include: Tourism,
      });
      res.send(todos);
      return todos;
    } else {
      const findall = getandCreate();
    }
  }
});

router.get("/countries/:id", async (req, res) => {
  const { id } = req.params; // RECIBO ID POR PARAMS,
  if (id) {
    const idupper = id.toUpperCase(); // SI ESTA MINUSCULA TRANSFORMO A UPPERCASE
    const oname = await Country.findOne({
      where: {
        id: idupper,
      },
      include: Tourism,
    });

    if (!oname) res.send({ msg: "No se encontró el país" });
    else {
      res.send(oname);
    }
  }
});

router.post("/activity", async (req, res) => {
  const { name, difficulty, duration, season, activity } = req.body; // RECIBE POR BODY LA ACTIVIDAD A CREAR
  const addt = await Tourism.create({
    name,
    difficulty,
    duration,
    season,
  });

  await addt.setCountries(activity); // SETEA LA/S ACTIVIDAD/ES AL PAÍS
  res.send(console.log(addt));
});

router.get("/activity", async (req, res) => {
  const allact = await Tourism.findAll();
  res.send(allact); // ENVÍA LAS ACTIVIDADES EN LA DB
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
