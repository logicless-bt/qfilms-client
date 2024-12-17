//imports and bundling
import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import "bootstrap/dist/css/boostrap.min.css";
import "./index.scss";

//main component
const MyFlixApplication = () => {
    return <MainView />
};

//finds root
const container = document.querySelector("#root");
const root = createRoot(container);

//renders app in root DOM element
root.render(<MyFlixApplication />);