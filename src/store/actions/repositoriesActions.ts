
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TRepository } from '../../interfaces/repository';
import { getRepositories } from '../../utils/request';


export interface IGetRepositoriesResponse {
    total_count: number;
    items: TRepository[];
    message?: string;
}

export const getRepositoriese = createAsyncThunk<IGetRepositoriesResponse | unknown, string>(
    'repositoriesSlice/getRepositoriese',
    async (repositoryQuery: string, { rejectWithValue }): Promise<IGetRepositoriesResponse | unknown> => {
        try {
            const response = await getRepositories(repositoryQuery);
            const data = await response.json() as IGetRepositoriesResponse;
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
