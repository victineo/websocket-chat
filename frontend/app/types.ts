export interface MessageData {
    id: string;
    chat_id: string;
    sender_id: string;
    content: string;
    timestamp: string;
    isOwnMessage: boolean;
}

export interface ChatData {
    id: string;
    user_id: string;
    space_id: string;
    name: string;
    context_profile_id: string | null;
    created_at?: string;
    last_message?: MessageData;
}
