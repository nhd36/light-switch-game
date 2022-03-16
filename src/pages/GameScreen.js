import {Box, Grid, Typography, Button} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useDispatch, useSelector} from "react-redux";
import actionTypes from "../redux/actionTypes";
import {useEffect, useState} from "react";

const useStyles = makeStyles({
    root: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "30px"
    },
    activeButton: {
        backgroundColor: "white"
    },
    buttonContainer: {
        display: "flex",
        width: "20vw",
        justifyContent: "space-between"
    },
    gridContainer: {
        width: "80vw",
        display: "flex",
        justifyContent: "center",
        height: "200px",
    },
    itemGrid: {
        display: "flex",
        justifyContent: "center"
    },
    itemContent: {
        width: "250px",
        backgroundColor: "red",
        textAlign: "center"
    }
});

const responsiveTypo = {
    fontSize: {
        lg: 50,
        md: 40,
        sm: 30,
        xs: 20
    }
}

const sleep = delay => {
    return new Promise(resolve => setTimeout(resolve, delay))
}

const GameScreen = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [invoke, setInvoke] = useState(null)

    const host = useSelector(state => state.host)
    const user = useSelector(state => state.user)
    const game = useSelector(state => state.game)

    const playMusic = async musicId => {
        // Play audio button
        let audioPath = game.musicButtons[musicId].music;
        let audioTune = new Audio(audioPath)
        audioTune.play().then(r => console.log(`Play button ${musicId}`))
    }

    const hostMove = async () => {
        // Play old rounds
        await sleep(2000)
        for (let pickedId of host.picked) {
            await playMusic(pickedId)
            // Invoke change color
            setInvoke(pickedId)
            await sleep(200)
            setInvoke(null)
            await sleep(1000)
        }

        // Generate random number
        let randomId = Math.floor(Math.random() * game.musicButtons.length)
        dispatch({
            type: actionTypes.HOST_ADD,
            payload: randomId
        })
        await playMusic(randomId)
        setInvoke(randomId)
        await sleep(200)
        setInvoke(null)
        await sleep(1000)

        // End host turn
        dispatch({
            type: actionTypes.HOST_END
        })

        // Start user turn
        dispatch({
            type: actionTypes.USER_START
        })
    }

    const userMove = chosenId => {
        // User picked the wrong option
        if (chosenId !== host.picked[user.picked.length]) {
            dispatch({
                type: actionTypes.HOST_INIT
            })
            // If user has only 1 life  point left, then Game is over
            if (user.life === 1) {
                dispatch({
                    type: actionTypes.GAME_OVER
                })
            } else {
                // If user has more than 1 life left, then user's life will be deducted and the game continues.
                dispatch({
                    type: actionTypes.USER_LOSE
                })
                dispatch({
                    type: actionTypes.HOST_START
                })
            }
        } else {
            // If user correct and user is in the last option of sequence
            if (user.picked.length + 1 === host.picked.length) {
                // increment score for user
                dispatch({
                    type: actionTypes.USER_SCORE
                })

                // Mark user turn ends
                dispatch({
                    type: actionTypes.USER_END
                })

                // Move on to host turn
                dispatch({
                    type: actionTypes.HOST_START
                })
            } else {
                dispatch({
                    type: actionTypes.USER_ADD,
                    payload: chosenId
                })
            }
        }
    }

    useEffect( () => {
        // If this is host's turn
        if (host.move) {
            hostMove().then(() => console.log("User's turn start"))
        }
    }, [host.move])

    const userClick = (e) => {
        const chosenId = parseInt(e.currentTarget.id)
        playMusic(chosenId)
        if (user.move){
            userMove(chosenId)
        }
    }

    const startButton = () => {
        // Signal game is started
        dispatch({
            type: actionTypes.GAME_START
        })

        dispatch({
            type: actionTypes.HOST_START
        })
    }

    const stopButton = () => {
        dispatch({
            type: actionTypes.GAME_INIT
        })
        dispatch({
            type: actionTypes.HOST_INIT
        })
        dispatch({
            type: actionTypes.USER_INIT
        })
        setInvoke(null)
    }

    return (
        <Box className={classes.root}>
            <Typography sx={responsiveTypo}>
                Light and Sound Memory
            </Typography>
            <br/>

            <Box className={classes.buttonContainer}>
                <Button
                    primary="primary"
                    variant="contained"
                    disabled={game.play !== 0}
                    onClick={startButton}
                >
                    Start
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    disabled={game.play === 0}
                    onClick={stopButton}
                >
                    Stop
                </Button>
            </Box>
            <br/>
            <Box>
                {game.play === 0 && <Typography> Game is not started </Typography>}
                {game.play === 1 && <Typography>Your current score: {user.score}. You have {user.life} life left</Typography>}
                {game.play === 2 && <Typography>Game is Over. Your Total Score is: {user.score}</Typography>}
            </Box>
            <br/>
            {game.play === 1 && (
                <Box>
                    <br/>
                    <Typography><b>{!host.move ? "User Turn" : "Host Turn"}</b></Typography>
                    <br/>
                </Box>
            )}
            <Box className={classes.gridContainer}>
                <Grid container spacing={5}>
                    {game.musicButtons.map((musicButton, index) => {
                        return (
                            <Grid item md={4} lg={3} xl={2} className={classes.itemGrid} key={index}>
                                <Button style={{
                                    backgroundColor: invoke !== index ? musicButton.color : "white",
                                    width: "250px"
                                }} variant="contained"
                                    primary="primary"
                                    id={index}
                                    disabled={!user.move}
                                    onClick={userClick}
                                >
                                    <Typography>
                                        My name is Nam Dao
                                    </Typography>
                                </Button>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            <br/>
        </Box>
    )
}

export default GameScreen;