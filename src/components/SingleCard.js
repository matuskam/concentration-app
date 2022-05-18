export default function SingleCard({card, handleChoice, flipped, disabled}) {

    // Allow the user to make a choice depending on
    // if the card is disabled or not.
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className={flipped ? "flipped" : ""}>
            <div
                className="my-2 mx-3 card text-off-white">
                <img
                    className="border-2 rounded-md front border-current"
                    src={card.src}
                    alt=" front of card."/>
                <img
                    className="border-2 rounded-md border-current back"
                    onClick={handleClick}
                    src={require('../img/card-cover.jpg')}
                    alt=" card cover or back of card."/>
            </div>
        </div>
    )
}