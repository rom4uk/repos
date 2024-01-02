import { TRepository } from '../interfaces/repository';

export function setRepositoryAsFavourite(
    list: TRepository[],
    favouritesList: TRepository[]
): void {
    list.forEach(repo => {
        const isRepositoryFavourite = favouritesList.find(favRepo => favRepo.id === repo.id);
        if (isRepositoryFavourite) repo.isFavourite = true;
    });
};
