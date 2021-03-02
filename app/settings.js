import exphbs from "express-handlebars";

const AppSettings = (app) => {
  app.engine(
    "hbs",
    exphbs({
      defaultLayout: "./app/views/layouts/default",
      extname: ".hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", "./app/views");

  app.listen(process.env.PORT, () =>
    console.log(`Running on localhost port ${process.env.PORT}`)
  );
};

export default AppSettings;
