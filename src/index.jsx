//imports and bundling
import {createRoot} from 'react-dom/client';
import "./index.scss";

//main component
const MyFlixApplication = () => {
    return (
        <div className = "myflix">
            <div>Good morning</div>
        </div>
    );
};

//finds root
const container = document.querySelector("#root");
const root = createRoot(container);

//renders app in root DOM element
root.render(<MyFlixApplication />);