const SuccessNotification = ({ message }) => {
    if (message === null ) {
        return null
    }

    return( 
        <div className="successNotification">
            {message}
        </div>
    );
}

export default SuccessNotification;