import { type } from 'os';

export type NotificationProps = {
    id: number;
    type: 'GAME' | 'FRIEND';
    username: string;
    avatar: string;
    readed: boolean;
    sendToId: string;
    ChallengeId: string;
};

export type NotificationState = {
    notifications: NotificationProps[];
};

export enum NotificationActionTypes {
    FETCH_NOTIFICATIONS_REQUEST = 'FETCH_NOTIFICATIONS_REQUEST',
    FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS',
    FETCH_NOTIFICATIONS_FAILURE = 'FETCH_NOTIFICATIONS_FAILURE',
    MARK_NOTIFICATION_READ = 'MARK_NOTIFICATION_READ',
}

export interface FetchNotificationsRequestAction {
    type: NotificationActionTypes.FETCH_NOTIFICATIONS_REQUEST;
}

export interface FetchNotificationsSuccessAction {
    type: NotificationActionTypes.FETCH_NOTIFICATIONS_SUCCESS;
    payload: Notification[];
}

export interface FetchNotificationsFailureAction {
    type: NotificationActionTypes.FETCH_NOTIFICATIONS_FAILURE;
    payload: string;
}

export interface MarkNotificationReadAction {
    type: NotificationActionTypes.MARK_NOTIFICATION_READ;
    payload: number;
}

export type NotificationAction =
    | FetchNotificationsRequestAction
    | FetchNotificationsSuccessAction
    | FetchNotificationsFailureAction
    | MarkNotificationReadAction;
