import { Box, TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/redux-hooks';
import { getRepositoriese } from '../../store/actions/repositoriesActions';
import { setEmptyRepositories, setSearchValue } from '../../store/reducers/repositories';



type DebounceProps = {
    handleDebounce: (value: string) => void;
    debounceTimeout: number;
    searchValue: string;
};

function DebounceInput(props: TextFieldProps & DebounceProps) {
    const { handleDebounce, debounceTimeout, searchValue, ...rest } = props;
    const [value, setValue] = useState<string>(searchValue);

    const timerRef = useRef<number>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
            handleDebounce(event.target.value);
        }, debounceTimeout);
    };

    return <TextField {...rest} value={value} size='small' onChange={handleChange} />;
}






export default function SearchInput(): JSX.Element {
    const dispatch = useAppDispatch();
    const {
        searchValue
    } = useAppSelector(state => state.repositories);

    const onChangeHandler = (value: string) => {
        dispatch(setSearchValue(value));
        if (!value) {
            dispatch(setEmptyRepositories());
        } else {
            dispatch(getRepositoriese(value));
        }
    };

    return (
        <Box
            component='form'
            my={2}
            noValidate
            autoComplete='off'
        >
            <DebounceInput
                searchValue={searchValue}
                fullWidth
                id='outlined-basic'
                label='Search by repository name'
                variant='outlined'
                debounceTimeout={300}
                handleDebounce={onChangeHandler}
            />
        </Box>
    )
};