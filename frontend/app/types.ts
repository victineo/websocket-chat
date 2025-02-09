export interface MessageData {
    user_id: string;
    message: string;
    timestamp: string;
    isOwnMessage: boolean;
}

export interface ChatData {
    id: string;
    name: string;
    messages: MessageData[];
    created_at?: string;
    last_message?: MessageData;
}
