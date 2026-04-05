export interface BannedWord {
    id: number;
    word: string;
    category?: string;
    severity?: number;
    isActive?: boolean;
}

export interface CreateBannedWordRequest {
    word: string;
    category?: string;
    severity?: number;
    isActive?: boolean;
}

export interface UpdateBannedWordRequest {
    word?: string;
    category?: string;
    severity?: number;
    isActive?: boolean;
}