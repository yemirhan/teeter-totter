export const addShape = (shapeType, x, y, id, weight) => {
    return {
        type: "ADD_SHAPE",
        payload: { shapeType, x, y, id, weight }
    }
}

export const addMoving = (shapeType, x, y, id, weight) => {
    return {
        type: "ADD_MOVING",
        payload: { shapeType, x, y, id, weight }
    }
}

export const start = () => ({ type: "START" })

export const bounds = (boundWidth, boundHeight) => {
    return {
        type: "SET_BOUNDS",
        payload: { boundWidth, boundHeight }
    }
}

export const restart = () => ({ type: "RESTART" })
export const pause = () => ({ type: "PAUSE" })
export const gameOver = () => ({ type: "GAME_OVER" })

export const onCollideRight = (id, x) => ({ type: "COLLIDE_RIGHT", payload: { id, x } })
export const onCollideLeft = (id, x) => ({ type: "COLLIDE_LEFT", payload: { id, x } })

export const selectActiveShape = (id) => ({ type: "SELECT_SHAPE", payload: id })
export const moveDownMoving = (id) => ({ type: "MOVE_DOWN_MOVING", payload: id })

export const moveObject = (id, coords) => ({ type: "MOVE_OBJECT", payload: { id, coords } })
export const seesawBound = (bound) => ({ type: "SEESAW_BOUND", payload: bound })
