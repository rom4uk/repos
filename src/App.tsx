import { Container, Grid } from '@mui/material'
import Header from './components/header/header'
import RoutePages from './routes'

function App() {

    return (
        <Container>
            <Grid my={2}>
                <Header />
                <main>
                    <RoutePages />
                </main>
            </Grid>
        </Container>
    )
}

export default App
