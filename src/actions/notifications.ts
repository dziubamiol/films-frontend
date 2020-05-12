export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';

export type TNotificationType = 'success' | 'warning' | 'error';

export interface INotification {
    notification: boolean,
    notification_message: string,
    notification_type: TNotificationType
}

export type TNotificationAction = {
    type: string,
    notification?: string
    notification_type?: TNotificationType
}

export const setNotification = (notification: string, notification_type: TNotificationType): TNotificationAction => {
    return {
        type: SET_NOTIFICATION,
        notification: notification,
        notification_type: notification_type
    }
}

export const deleteNotification = (): TNotificationAction => {
    return {
        type: DELETE_NOTIFICATION,
    }
}

