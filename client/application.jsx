import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FrontPage} from "./pages/frontPage";


export function Application() {

    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/"} element={<Menu/>}/>
            <Route path={"/"} element={<AddItem/>}/>
        </Routes>
    </BrowserRouter>

}