import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FrontPage} from "./pages/frontPage";
import {Menu} from "./pages/menu";


export function Application() {

    async function menu() {
        const res = await fetch("/api/menu");
        if (!res.ok) {
            throw new Error(`Failed ${res.status}: ${(await res).statusText}`);
        }
        return await res.json();

    }

    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/menu"} element={<Menu menu={menu} />}/>
        </Routes>
    </BrowserRouter>

}