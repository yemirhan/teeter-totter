import _ from "lodash"

const initialState = {
    pause: false,
    start: false,
    gameover: false,
    shapes: {},
    mounted: {},
    moving: {},
    gameboxWidth: 0,
    gameboxHeight: 0,
    activeShape: null,
    leftkgm: 0,
    rightkgm: 0,
    seesawBound: null
}
const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "PAUSE":
            return { ...state, pause: !state.pause }
        case "START":
            return { ...state, start: true }
        case "GAME_OVER":
            return { ...state, gameover: true }
        case "MOVE_OBJECT":
            return { ...state, shapes: { ...state.shapes, [payload.id]: { ...state.shapes[payload.id], x: payload.coords.x, y: payload.coords.y } } }
        case "ADD_SHAPE":
            return { ...state, shapes: { ...state.shapes, [payload.id]: { ...payload } } }
        case "ADD_MOVING":
            return { ...state, moving: { ...state.moving, [payload.id]: { ...payload } } }
        case "MOVE_DOWN_MOVING":
            return { ...state, moving: {...state.moving, [payload]: {...state.moving[payload], y: state.gameboxHeight - 250}}  }
        case "RESTART":
            return { ...initialState }
        case "SELECT_SHAPE":
            return { ...state, activeShape: payload }
        case "COLLIDE_LEFT":
            if (payload.x < state.gameboxWidth / 2 + 50) return { ...state }
            const xl = payload.x > 0 ? 0 : payload.x
            const dl = { ...state.moving[payload.id] }
            delete state.moving[payload.id]
            return { ...state, leftkgm: state.leftkgm + dl.weight, mounted: { ...state.mounted, [payload.id]: { ...dl, xl } } }
        case "COLLIDE_RIGHT":
            if (payload.x > state.gameboxWidth / 2 - 50) return { ...state }
            const x = payload.x < 0 ? 0 : payload.x
            const d = { ...state.shapes[payload.id] }
            delete state.shapes[payload.id]
            return { ...state, activeShape: null, rightkgm: state.rightkgm + d.weight, mounted: { ...state.mounted, [payload.id]: { ...d, x } } }
        case "SET_BOUNDS":
            return { ...state, gameboxWidth: payload.boundWidth, gameboxHeight: payload.boundHeight }
        case "SEESAW_BOUND":
            return { ...state, seesawBound: payload }
        default:
            return state
    }
}

export default reducer

