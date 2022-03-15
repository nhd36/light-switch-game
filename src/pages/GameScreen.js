import {Box, Grid, Typography, Button} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useDispatch, useSelector} from "react-redux";
import actionTypes from "../redux/actionTypes";
import {useEffect} from "react";

const useStyles = makeStyles({
    root: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "30px"
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

const playMusic = musicId => {
    console.log("Music playing:", musicId)
}

const GameScreen = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const host = useSelector(state => state.host)
    const user = useSelector(state => state.user)
    const game = useSelector(state => state.game)

    const hostMove = async () => {


    }

    useEffect( () => {
        // If this is host's turn
        if (host.move) {
            hostMove().then(() => console.log("User's turn start"))
        }
    }, [host.move])

    const userClick = (e) => {
        const chosenId = parseInt(e.currentTarget.id)

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
                                    backgroundColor: musicButton.color,
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