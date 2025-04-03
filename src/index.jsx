import { createRoot } from 'react-dom/client';
import { Mainview } from './components/main-view/main-view';
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

const MyFlixApplication =() =>{
    return(
        <Container style={{border:"1px solid red"}}>
       <Mainview/>
       </Container>
    );
};


const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);