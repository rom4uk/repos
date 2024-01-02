import { createSlice } from "@reduxjs/toolkit";
import { TFavouriteRepository, TRepository } from '../../interfaces/repository';
import { IGetRepositoriesResponse, getRepositoriese } from '../actions/repositoriesActions';
import { setRepositoryAsFavourite } from '../../utils/helpers';

export interface IRejectedPayload {
    message: string;
}

type TStringPayload = {
    payload: string;
};

type TNumberPayload = {
    payload: number;
};

type TRatePayload = {
    rate: number;
    repositoryId: number;
};

interface IInitialState {
    loading: boolean;
    repositories: TRepository[];
    favouritesRepositories: TFavouriteRepository[];
    payloadRejectedErrorMessage: string;
    searchValue: string;
}

const repositoriesSlice = createSlice({
    name: 'repositoriesSlice',
    initialState: {
        loading: false,
        repositories: [],
        favouritesRepositories: [],
        searchValue: '',
        payloadRejectedErrorMessage: '',
    } as IInitialState,
    reducers: {
        setErrorMessage(state, { payload }) {
            state.payloadRejectedErrorMessage = payload;
        },
        setEmptyRepositories(state) {
            state.repositories = [];
        },
        setSearchValue(state, { payload }: TStringPayload) {
            state.searchValue = payload;
        },
        setRate(state, { payload }: { payload: TRatePayload }) {
            const selectedRepository = state.favouritesRepositories.find(r => r.id === payload.repositoryId);
            selectedRepository!.rate = payload.rate;
        },
        selectAsFavourite(state, { payload }: TNumberPayload) {
            const selectedRepository = state.repositories.find(r => r.id === payload);
            if (!selectedRepository) return;
            selectedRepository.isFavourite = true;
            state.favouritesRepositories.push({
                ...selectedRepository,
                rate: 0
            })
        },
        removeFavouriteRepository(state, { payload }: TNumberPayload) {
            state.favouritesRepositories = state.favouritesRepositories.filter(r => r.id !== payload);
            const selectedRepository = state.repositories.find(r => r.id === payload);
            if (selectedRepository) selectedRepository.isFavourite = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getRepositoriese.pending, (state) => {
                state.loading = true;
                state.repositories = [];
                state.payloadRejectedErrorMessage = '';
            })
            .addCase(getRepositoriese.fulfilled, (state, action) => {
                const { payload } = action as {
                    payload: IGetRepositoriesResponse
                };
                if (!payload.message) {
                    setRepositoryAsFavourite(
                        payload.items as TRepository[],
                        state.favouritesRepositories
                    )
                    state.repositories = payload.items;
                } else {
                    state.payloadRejectedErrorMessage = 'Failed to fetch. Please try again later or reload the page';
                    state.repositories = [];
                }
                state.loading = false;
            })
            .addCase(getRepositoriese.rejected, (state, action) => {
                const { message } = action.payload as IRejectedPayload;
                state.payloadRejectedErrorMessage = message;
                state.loading = false;
            });

    },
});

export const {
    setErrorMessage,
    setEmptyRepositories,
    setSearchValue,
    selectAsFavourite,
    removeFavouriteRepository,
    setRate,
} = repositoriesSlice.actions;

export default repositoriesSlice.reducer;