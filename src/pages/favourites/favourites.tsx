import { Button, Card, CardActions, CardContent, CardMedia, Grid, Link, Rating, Typography } from '@mui/material';
import { TFavouriteRepository } from '../../interfaces/repository';

interface IFavouritesListProps {
    removeFromFavourites: (repositoryId: number, repositoryName: string) => void;
    setRopesitoryRate: (repositoryId: number, rate: number) => void;
    favouritesRepositories: TFavouriteRepository[];
}

export default function FavouritesList({
    removeFromFavourites,
    setRopesitoryRate,
    favouritesRepositories,
}: IFavouritesListProps): JSX.Element {

    return (
        <>
            <Grid
                container
                spacing={2}
                my={2}
            >
                {
                    favouritesRepositories.map(r => (
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

                                    <Rating
                                        onChange={(_, newValue) => setRopesitoryRate(r.id, newValue as number)}
                                        name="no-value"
                                        value={r.rate} />
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
                                        onClick={() => removeFromFavourites(r.id, r.name)}
                                    >
                                        Remove from Favourites
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }

            </Grid>

        </>
    )
}
