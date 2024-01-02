import { Route, Switch } from "react-router-dom";
import Home from "./pages/home/home";
import { FAVOURITES_PATH, ROOT_PATH } from "./utils/constants";
import FavouritesWrapper from './pages/favourites/favourites-wrapper';

export const menuItems = [
    {
        to: ROOT_PATH,
        label: 'Home'
    },
    {
        to: FAVOURITES_PATH,
        label: 'Favourites'
    }
];

export default function RoutePages(): JSX.Element {

    return (
        <Switch>
            <Route exact path='/repos'>
                <Home />
            </Route>
            <Route exact path='/repos/favourites'>
                <FavouritesWrapper />
            </Route>
            <Route path="*">
                <div>Not match</div>
            </Route>

        </Switch>
    )
}