import { Grid } from '@mui/material';
import { removeFavouriteRepository, setRate } from '../../store/reducers/repositories';
import { useAppDispatch, useAppSelector } from '../../utils/redux-hooks';
import FavouritesList from './favourites';
import { Notify } from 'notiflix';

export default function FavouritesWrapper(): JSX.Element {
    const {
        favouritesRepositories,
    } = useAppSelector(state => state.repositories);
    const dispatch = useAppDispatch();

    const removeFromFavourites = (repositoryId: number, repositoryName: string) => {
        dispatch(removeFavouriteRepository(repositoryId));
        Notify.success(`The repopsitory ${repositoryName} was removed from your favourites`, {
            timeout: 1000,
            position: 'center-bottom'
        })
    };

    const setRopesitoryRate = (repositoryId: number, rate: number) => {
        dispatch(setRate({
            repositoryId: repositoryId,
            rate: rate
        }));
    };

    if (!favouritesRepositories.length) {
        return (
            <Grid container my={2} justifyContent='center'>
                The favourites list is empty
            </Grid>
        )
    }

    return (
        <FavouritesList
            favouritesRepositories={favouritesRepositories}
            removeFromFavourites={removeFromFavourites}
            setRopesitoryRate={setRopesitoryRate}
        />
    )
}