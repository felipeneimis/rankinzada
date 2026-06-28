import app from "./api";
import { APP_PORT } from "./config/env";

const port = APP_PORT || 3000;


app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});
