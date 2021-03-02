const Routes = (app) => {
  app.get("/", (req, res) => {
    res.render("index", {
      title: "Booost Framework",
      settings: {
        baseUrl: process.env.BASE_URL,
        port: process.env.PORT,
      },
    });
  });
};

export default Routes;
