import app from "./server.mjs";
const port = 3000;

app.listen(port, () => {
  console.log(`Personal IoT app running on port ${port}`);
});
