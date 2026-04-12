export interface StampAnswer {
  id: number;
  question: string;
  keywords: string | null;
  answer: string;
  isActive: boolean;
  usageCount: number;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}

export interface CreateStampAnswerRequest {
  question: string;
  keywords?: string;
  answer: string;
  isActive?: boolean;
}

export interface UpdateStampAnswerRequest {
  question?: string;
  keywords?: string;
  answer?: string;
  isActive?: boolean;
}
