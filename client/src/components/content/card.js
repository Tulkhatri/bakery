const Card = (props) => {
    return (
        <>
                <div className="card_view">
                    <div className="card_image">{props.items.image}</div>
                    <div className="card_name">{props.items.name}</div>
                    <div className="card_price">{props.items.price}</div>
                </div>
        </>
    );
}
export default Card;