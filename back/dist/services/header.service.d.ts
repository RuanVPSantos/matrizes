export declare function getHeaderData(): Promise<{
    id: number;
    name: string;
    description: string | null;
    subambientes: {
        id: number;
        name: string;
        description: string | null;
        artigos: {
            id: number;
            title: string;
            description: string | null;
        }[];
    }[];
}[]>;
//# sourceMappingURL=header.service.d.ts.map