import { DELETE_NOTIFICATION, INotification, SET_NOTIFICATION, TNotificationAction } from '../actions/notifications';

const initState: INotification = {
    notification: false,
    notification_message: '',
    notification_type: 'success'
};

const notification = (state: INotification = initState, action: TNotificationAction) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return {
                notification: true,
                notification_message: action.notification,
                notification_type: action.notification_type
            };
        case DELETE_NOTIFICATION:
            return {
                notification: false,
                notification_message: '',
                notification_type: 'success'
            };
        default:
            return state;
    }
}

export default notification;
