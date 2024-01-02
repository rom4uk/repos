import RepositoriesList from './repositories-list';
import SearchInput from './search-input';



export default function Home(): JSX.Element {

    return (
        <div>
            <SearchInput />
            <RepositoriesList />
        </div>
    )
}