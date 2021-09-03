const Notification = ({ message, notificationStyle }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={notificationStyle}>
            {message}
        </div>
    );
}

export default Notification;