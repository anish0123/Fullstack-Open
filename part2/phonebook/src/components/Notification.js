const Notification = ({message}) => {

    if(message === null) {
        return null;
    }
    const messageOkStyle = {
        color: "green",
        background: "lightgray",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
}
    return(
        <div style={messageOkStyle}>
            {message}
        </div>
    )
};

export default Notification;