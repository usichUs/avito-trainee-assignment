import type { ModerationHistory } from "../moderationHistory";
import type { Seller } from "../seller";

export type AdStatus = 'pending' | 'approved' | 'rejected' | 'draft'

export type AdPriority = 'normal' | 'urgent'

export type Advertisement = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    categoryId: number;
    status: AdStatus;
    priority: AdPriority;
    createdAt: string;
    updatedAt: string;
    Images: string[];
    seller: Seller;
    characteristics: string;
    moderationHistory: ModerationHistory
}