const express = require("express");
const ServiceRouter = require("./services");
const gemeniRouter = require("./gemini");
function route(app) {
  app.use("/service", ServiceRouter);
  app.use("/api/gemini", gemeniRouter);
  app.use("/auth", gemeniRouter);
}

module.exports = route;
