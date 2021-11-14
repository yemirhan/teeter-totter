import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMoving, addShape, gameOver, moveObject } from "../redux/totter.actions"
import useKeyDown from "./useKeyDown"
import useRandomInterval from "./useRandomInterval"

const useShapeFactory = () => {
    const $totter = useSelector(state => state.$totter)
    const dispatch = useDispatch()
    useKeyDown(key => {
        if ($totter.activeShape) {
            const callback = {
                "ArrowLeft": () => moveObject($totter?.activeShape, { ...$totter?.shapes?.[$totter?.activeShape], x: $totter?.shapes?.[$totter?.activeShape]?.x - 30 }),
                "ArrowRight": () => moveObject($totter?.activeShape, { ...$totter?.shapes?.[$totter?.activeShape], x: $totter?.shapes?.[$totter?.activeShape]?.x + 30 }),
                "ArrowUp": () => moveObject($totter?.activeShape, { ...$totter?.shapes?.[$totter?.activeShape], y: $totter?.shapes?.[$totter?.activeShape]?.y - 30 }),
                "ArrowDown": () => moveObject($totter?.activeShape, { ...$totter?.shapes?.[$totter?.activeShape], y: $totter?.shapes?.[$totter?.activeShape]?.y + 30 }),
            }[key]
            dispatch(callback?.())
        }
    });

    useRandomInterval(() => {
        const r = Math.floor(Math.random() * 3)
        dispatch(addShape(["circle", "rectangle", "triangle"][r],
            Math.floor(Math.random() * ($totter.gameboxWidth / 2 - 0 + 1)) + 0,
            Math.floor(Math.random() * ($totter.gameboxHeight / 2 - 0 + 1)) + 0,
            Math.floor(Math.random() * 10000000),
            [3, 6, 10][r]))
    }, 5000, 12000)
    useRandomInterval(() => {
        const r = Math.floor(Math.random() * 3)
        const id = Math.floor(Math.random() * 10000000)
        dispatch(addMoving(["circle", "rectangle", "triangle"][r],
            Math.floor(Math.random() * ($totter.gameboxWidth / 2 - $totter.gameboxWidth - 50 + 1)) + $totter.gameboxWidth,
            Math.floor(Math.random() * ($totter.gameboxHeight / 2 - 0 + 1)) + 0,
            id,
            [3, 6, 10][r]))
    }, 5000, 12000)
    useEffect(() => {
        if (($totter.leftkgm - $totter.rightkgm > 20) || ($totter.leftkgm - $totter.rightkgm < -20)) dispatch(gameOver())
    }, [$totter.leftkgm, $totter.rightkgm])
    return ("!")
}


export default useShapeFactory