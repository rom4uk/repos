import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Link,
    Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../utils/redux-hooks';
import { selectAsFavourite, setErrorMessage } from '../../store/reducers/repositories';
import { Notify } from 'notiflix';

export default function RepositoriesList(): JSX.Element {
    const {
        repositories,
        loading,
        searchValue,
        payloadRejectedErrorMessage
    } = useAppSelector(state => state.repositories);
    const dispatch = useAppDispatch();

    const addToFavourite = (repositoryId: number, repositoryName: string) => {
        dispatch(selectAsFavourite(repositoryId));
        Notify.success(`The repopsitory ${repositoryName} was added to your favourites`, {
            timeout: 1000,
            position: 'center-bottom',
            showOnlyTheLastOne: true,
            clickToClose: true,
        })
    };

    const closeModal = () => {
        dispatch(setErrorMessage(''));
    };

    if (payloadRejectedErrorMessage) {
        return (

            <Dialog
                open={!!payloadRejectedErrorMessage}
                onClose={closeModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    Error
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {payloadRejectedErrorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }

    if (loading) {
        return (
            <Grid container my={2} justifyContent='center'>
                Loading...
            </Grid>
        );
    }

    if (!loading && searchValue && !repositories.length) {
        return (
            <Grid container my={2} justifyContent='center'>
                No repositories was found
            </Grid>
        );
    }

    return (
        <>
            <Grid
                container
                spacing={2}
            >
                {
                    repositories.map(r => (
                        <Grid
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            item
                            key={r.id}
                        >
                            <Card
                                variant='outlined'
                            >
                                <CardMedia
                                    component='img'
                                    height='200'
                                    image={r.owner?.avatar_url}
                                    alt={r.owner?.login}
                                    style={{ height: '200px' }}
                                />
                                <CardContent>
                                    <Typography variant='body2'>
                                        Author: {r.owner?.login}
                                    </Typography>
                                    <Typography variant='body2'>
                                        Name: {r.name}
                                    </Typography>
                                    <Typography variant='body2'>
                                        Visibility: {r.visibility}
                                    </Typography>
                                    <Typography variant='body2'>
                                        Stars: {r.stargazers_count}
                                    </Typography>
                                    <Typography variant='body2'>
                                        Language: {r.language}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link
                                        href={r.html_url}
                                        target='_blank'
                                        underline='hover'
                                    >
                                        Visit Repository
                                    </Link>
                                    <Button
                                        size='small'
                                        color='primary'
                                        onClick={r.isFavourite ? undefined : () => addToFavourite(r.id, r.name)}
                                        disabled={r.isFavourite}
                                    >
                                        Add to Favourites
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }

            </Grid>

        </>
    );
}