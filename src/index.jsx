import { createRoot } from 'react-dom/client';
import { Mainview } from './components/main-view/main-view';
import "./index.scss";

const MyFlixApplication =() =>{
    return(
       <Mainview/>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);