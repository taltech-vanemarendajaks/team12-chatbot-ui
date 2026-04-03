import { apiClient } from "../../../shared/ui/services/apiClient";
import type {
  StampAnswer,
  CreateStampAnswerRequest,
  UpdateStampAnswerRequest,
} from "../types/stampAnswer.types";

const STAMP_ANSWERS_BASE_URL = "/api/v1/stamp-answers";

export const stampAnswerApi = {
  /**
   * Get all stamp answers
   */
  getAll: async (activeOnly = false): Promise<StampAnswer[]> => {
    const response = await apiClient.get<StampAnswer[]>(
      STAMP_ANSWERS_BASE_URL,
      {
        params: { activeOnly },
      },
    );
    return response.data;
  },

  /**
   * Get stamp answer by ID
   */
  getById: async (id: number): Promise<StampAnswer> => {
    const response = await apiClient.get<StampAnswer>(
      `${STAMP_ANSWERS_BASE_URL}/${id}`,
    );
    return response.data;
  },

  /**
   * Search stamp answers
   */
  search: async (searchTerm: string): Promise<StampAnswer[]> => {
    const response = await apiClient.get<StampAnswer[]>(
      `${STAMP_ANSWERS_BASE_URL}/search`,
      {
        params: { q: searchTerm },
      },
    );
    return response.data;
  },

  /**
   * Create new stamp answer
   */
  create: async (request: CreateStampAnswerRequest): Promise<StampAnswer> => {
    const response = await apiClient.post<StampAnswer>(
      STAMP_ANSWERS_BASE_URL,
      request,
    );
    return response.data;
  },

  /**
   * Update stamp answer
   */
  update: async (
    id: number,
    request: UpdateStampAnswerRequest,
  ): Promise<StampAnswer> => {
    const response = await apiClient.put<StampAnswer>(
      `${STAMP_ANSWERS_BASE_URL}/${id}`,
      request,
    );
    return response.data;
  },

  /**
   * Delete stamp answer
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${STAMP_ANSWERS_BASE_URL}/${id}`);
  },

  /**
   * Get most used stamp answers
   */
  getMostUsed: async (): Promise<StampAnswer[]> => {
    const response = await apiClient.get<StampAnswer[]>(
      `${STAMP_ANSWERS_BASE_URL}/most-used`,
    );
    return response.data;
  },

  /**
   * Get stamp answers by category
   */
  getByCategory: async (category: string): Promise<StampAnswer[]> => {
    const response = await apiClient.get<StampAnswer[]>(
      `${STAMP_ANSWERS_BASE_URL}/category/${category}`,
    );
    return response.data;
  },
};
