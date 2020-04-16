import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import PlayerBlock from "./Components/PlayerBlock";
import Deck from "./Utils/deck";
import DisplayDeck from "./Components/DisplayDeck";
import Board from "./Components/Board";
import "./OddsCalculator.css";
import shortid from "shortid";
import { TexasHoldem } from "poker-odds-calc";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const INITIAL_BOARD_STATE = { cards: [], index: "board" };
const INITIAL_PLAYER_STATE = { cards: [], winPercent: null, tiePercent: null };

const INITIAL_DECK_STATE = new Deck();

const OddsCalculator = () => {
  const [players, setPlayers] = useState([
    { ...INITIAL_PLAYER_STATE, index: shortid() },
    { ...INITIAL_PLAYER_STATE, index: shortid() },
  ]);
  const [focusIndex, setFocusIndex] = useState(players[0].index);
  const [board, setBoard] = useState(INITIAL_BOARD_STATE);
  const [deck, setDeck] = useState(INITIAL_DECK_STATE);

  const setHoleCard = (card) => {
    const MAX_SIZE = focusIndex === "board" ? 5 : 2;
    if (card.location === focusIndex) {
      removeCard(card);
    } else if (card.location === "deck") {
      let sizeOfHand = deck.cards.filter((card) => card.location === focusIndex)
        .length;
      if (sizeOfHand < MAX_SIZE) {
        addCard(card);
      }
    }
  };

  const resetResults = () => {
    let newPlayers = [...players];
    newPlayers.forEach((player) => {
      player.winPercent = null;
      player.tiePercent = null;
    });
  };

  const removeCard = (card, indexToRemoveFrom = focusIndex) => {
    players.forEach((player) => {
      if (player.winPercent) {
        resetResults();
      }
    });
    card.location = "deck";
    let newPlayers = [...players].map((player) => {
      if (player.index === indexToRemoveFrom) {
        let newPlayerCards = [...player.cards].filter((obj) => obj !== card);
        return {
          ...player,
          cards: newPlayerCards,
        };
      } else {
        return player;
      }
    });
    setPlayers(newPlayers);
    if (indexToRemoveFrom === "board") {
      let newBoard = {
        ...board,
        cards: [...board.cards].filter((obj) => obj !== card),
      };
      setBoard(newBoard);
    }
  };

  const addCard = (card) => {
    if (players[0].winPercent) resetResults();

    card.location = focusIndex;

    let newPlayers = [...players].map((player) => {
      if (player.index === card.location) {
        let newPlayerCards = [...player.cards, card];
        return {
          ...player,
          cards: newPlayerCards,
        };
      } else {
        return player;
      }
    });
    setPlayers(newPlayers);

    if (focusIndex === "board") {
      let newBoard = {
        ...board,
        cards: [...board.cards, card],
      };
      setBoard(newBoard);
    }
  };

  const handleAddPlayer = () => {
    if (players.length < 6) {
      let newPlayer = { ...INITIAL_PLAYER_STATE, index: shortid() };
      let newPlayers = [...players, newPlayer];
      setPlayers(newPlayers);
    }
  };

  const handleDeletePlayer = (event, playerToDelete) => {
    event.stopPropagation();
    deletePlayer(playerToDelete);
  };

  const deletePlayer = (playerToDelete) => {
    if (players.length > 2) {
      playerToDelete.cards.forEach((card) => {
        removeCard(card, playerToDelete.index);
      });
      let newPlayers = players.filter(
        (player) => player.index !== playerToDelete.index
      );
      if (focusIndex === playerToDelete.index) {
        setFocusIndex(newPlayers[0].index);
      }

      setPlayers(newPlayers);
    }
  };

  const handleCalculate = () => {
    if (board.cards.length === 1 || board.cards.length === 2) {
      alert(
        "The Board cannot have an incomplete flop.  Try again with no board cards or at least 3"
      );
      return;
    }
    players.forEach((player) => {
      if (player.cards.length === 0) {
        console.log("welp");
        deletePlayer(player);
      }
    });
    let Table = new TexasHoldem();
    let numOfEligiblePlayers = 0;
    players.forEach((player) => {
      if (player.cards.length === 2) {
        let hand = [player.cards[0].name, player.cards[1].name];
        Table.addPlayer(hand);
        numOfEligiblePlayers++;
      }
    });
    if (numOfEligiblePlayers < 2) {
      alert("Must have at least 2 playes with 2 cards each");
      return;
    }
    if (board.cards.length > 0) {
      let boardCards = board.cards.reduce((accum, card) => {
        accum.push(card.name);
        return accum;
      }, []);
      Table.setBoard(boardCards);
    }

    const results = Table.calculate();

    console.log(results);
    let newPlayers = [...players];
    let iterations = results.result.iterations;
    results.result.players.forEach((playerResult, index) => {
      newPlayers.forEach((newPlayer) => {
        if (newPlayer.cards.length > 0) {
          if (playerResult.player.hand[0].str === newPlayer.cards[0].name) {
            newPlayer.winPercent = (
              (playerResult.wins / iterations) *
              100
            ).toFixed(2);
            newPlayer.tiePercent = (
              (playerResult.ties / iterations) *
              100
            ).toFixed(2);
          }
        }
      });
    });

    setPlayers(newPlayers);
  };

  const handleClearCards = () => {
    setPlayers([
      { ...INITIAL_PLAYER_STATE, index: shortid() },
      { ...INITIAL_PLAYER_STATE, index: shortid() },
    ]);
    setDeck(new Deck());
    setBoard({ cards: [], key: shortid() });
  };

  const handleFocusClick = (event, index) => {
    setFocusIndex(index);
  };

  const handleHoleCardClick = (event, card, index) => {
    event.stopPropagation();
    if (card.rank) removeCard(card, index);
    else setFocusIndex(index);
  };

  useEffect(() => {
    handleClearCards();
  }, []);
  return (
    <div className="Calculator">
      <Row>
        <Col xs={12} md={6} className="mb-4">
          <Header />
        </Col>
        <Col className="mb-4 d-flex align-items-center justify-content-around">
          <ButtonGroup>
            <Button onClick={handleAddPlayer}>ADD PLAYER</Button>
            <Button variant="success" onClick={handleCalculate}>
              RUN
            </Button>
            <Button variant="danger" onClick={handleClearCards}>
              CLEAR
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        {players.map((player, index) => (
          <PlayerBlock
            player={player}
            key={player.index}
            handleClick={(event) => handleFocusClick(event, player.index)}
            handleDeletePlayer={handleDeletePlayer}
            handleHoleCardClick={handleHoleCardClick}
            isFocused={player.index === focusIndex}
            index={index}
          />
        ))}
        <Board
          board={board}
          handleClick={(event) => handleFocusClick(event, "board")}
          handleHoleCardClick={handleHoleCardClick}
          isFocused={focusIndex === "board"}
        />
      </Row>
      <Row className="mt-5">
        <DisplayDeck
          setHoleCard={setHoleCard}
          players={players}
          focusIndex={focusIndex}
          deck={deck}
        />
      </Row>
    </div>
  );
};

export default OddsCalculator;