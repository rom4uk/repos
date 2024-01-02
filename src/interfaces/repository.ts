type TOwner = {
    avatar_url: string;
    login: string;
}

export type TRepository = {
    id: number;
    html_url: string;
    created_at: string;
    name: string;
    visibility: string;
    language: string;
    forks: number;
    stargazers_count: number;
    owner: TOwner;
    isFavourite?: boolean;
};

export type TFavouriteRepository = TRepository & {
    rate: number;
};