export type Action = 'approved' | 'rejected' | 'requestChanges'

export type ModerationHistory = {
    id: number;
    moderatorId: number;
    moderatorName: string;
    action: Action;
    reason: string | null;
    comment: string;
    timestamp: string;
}