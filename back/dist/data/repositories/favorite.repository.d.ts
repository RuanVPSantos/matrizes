export declare class FavoriteRepository {
    addFavorite(userId: number, artigoId: number): Promise<void>;
    removeFavorite(userId: number, artigoId: number): Promise<void>;
    listFavorites(userId: number): Promise<any[]>;
    isFavorite(userId: number, artigoId: number): Promise<boolean>;
}
//# sourceMappingURL=favorite.repository.d.ts.map