export declare class ReadingRepository {
    markBlocoAsRead(userId: number, blocoId: number): Promise<void>;
    listReadBlocos(userId: number, artigoId: number): Promise<number[]>;
    isRead(userId: number, blocoId: number): Promise<boolean>;
}
//# sourceMappingURL=reading.repository.d.ts.map