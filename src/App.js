import './App.css';
import {useEffect, useState} from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
    {"src": "./img/card-1.jpg", matched: false},
    {"src": "./img/card-2.jpg", matched: false},
    {"src": "./img/card-3.jpg", matched: false},
    {"src": "./img/card-4.jpg", matched: false},
    {"src": "./img/card-5.jpg", matched: false},
    {"src": "./img/card-6.jpg", matched: false},
]

function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    // Shuffle cards and double array size so each card has a match.
    // Then using the Math.random() function - randomize the position of each
    // card within the array and add a unique ID to each card.
    const
        shuffleCards = () => {
            // copy cards from cardImages and add twice
            const shuffleCards = [...cardImages, ...cardImages]
                .sort(() => Math.random() - 0.5)
                .map((card) => ({...card, id: Math.random()}))
            setChoiceOne(null)
            setChoiceTwo(null)
            setCards(shuffleCards)
            setTurns(0)
        }

    // Select which choice to set depending on
    // if a card has already been selected.
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    // Compare both selected cards. If they are a match set the matched boolean to True.
    // Then make the Disable attribute to false allowing the user to make another selection.
    useEffect(() => {
            if (choiceOne && choiceTwo) {
                setDisabled(true)
                if (choiceOne.src === choiceTwo.src) {
                    setCards(prevCards => {
                        return prevCards.map(card => {
                            if (card.src === choiceOne.src) {
                                return {...card, matched: true}
                            } else {
                                return card
                            }
                        })
                    })
                    resetTurn()
                } else {
                    setTimeout(() => resetTurn(), 1000)
                }
            }
        }
        ,
        [choiceOne, choiceTwo]
    )

    // On page load run the shuffle cards
    // function to start the game.
    useEffect(() => {
        shuffleCards()
    }, [])


    return (
        <div className="h-screen w-screen bg-midnight-blue font-mono">
            <h1 className="text-2xl text-off-white text-center opacity pt-4">
                Concentration
                <div className="py-2">
                    <button onClick={shuffleCards}
                            className="bg-rhythm text-off-white text-xl px-4 py-1 rounded-full hover:opacity-90 duration-150">
                        New Game
                    </button>
                    <span className="pl-3 text-xl text-off-white font-normal">
                    Moves: {turns}
                </span>
                </div>
            </h1>
            <div className="px-8 sm:px-16 lg:px-56 pt-2">
                <div
                    className="grid grid-cols-3 sm:grid-cols-4 md:px-28 sm:px-8">
                    {cards.map(card => (
                        <SingleCard
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            flipped={card === choiceOne || card === choiceTwo || card.matched}
                            disabled={disabled}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App;
