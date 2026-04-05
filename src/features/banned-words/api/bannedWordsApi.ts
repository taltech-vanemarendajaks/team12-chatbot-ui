import { apiClient } from "@/shared/services/apiClient";
import type {
    BannedWord,
    CreateBannedWordRequest,
    UpdateBannedWordRequest,
} from "../types";

const BASE_URL = "/api/v1/banned-words";

export const getBannedWords = async (activeOnly = false): Promise<BannedWord[]> => {
    const response = await apiClient.get(BASE_URL, {
        params: { activeOnly },
    });
    return response.data;
};

export const createBannedWord = async (
    payload: CreateBannedWordRequest,
): Promise<BannedWord> => {
    const response = await apiClient.post(BASE_URL, payload);
    return response.data;
};

export const updateBannedWord = async (
    id: number,
    payload: UpdateBannedWordRequest,
): Promise<BannedWord> => {
    const response = await apiClient.put(`${BASE_URL}/${id}`, payload);
    return response.data;
};

export const deleteBannedWord = async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
};