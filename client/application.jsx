import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FrontPage} from "./pages/frontPage";
import {Menu} from "./pages/menu";


export function Application() {

    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/menu"} element={<Menu/>}/>
        </Routes>
    </BrowserRouter>

}