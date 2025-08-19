import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import Context from "./Context";
import { BrowserRouter} from 'react-router-dom'
createRoot(document.getElementById("root")!).render(
<BrowserRouter>
<Context>
<App />
</Context>
</BrowserRouter>
);
