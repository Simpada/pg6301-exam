import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {FrontPage} from "./pages/frontPage";
import {Menu} from "./pages/menu";
import {AddNewItem} from "./pages/addNewItem";


export function Application() {

    return <BrowserRouter>
        <header>
            <Link to={"/"}>Front page</Link>
            <br/>
            <Link to={"/menu"}>Menu</Link>
            <div className="menu-divider" />
            {/*<UserActions user={data?.user} />*/}
        </header>
        <main>
            <Routes>
                <Route path={"/"} element={<FrontPage/>}/>
                <Route path={"/menu"} element={<Menu/>}/>
                <Route path={"/menu/add"} element={<AddNewItem/>}/>
            </Routes>
        </main>

    </BrowserRouter>

}