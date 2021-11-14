import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/Button'
import { pause, restart, start } from '../redux/totter.actions'

export const Menu = () => {
    const $totter = useSelector(state => state.$totter)
    const dispatch = useDispatch()
    return (
        <div className="h-full w-72 p-2 bg-gray-100 shadow-md flex-grow flex-shrink-0 flex flex-col items-center justify-between">
            <h1 className="text-2xl font-semibold">Trotter Totter</h1>
            <div className="w-full h-auto flex flex-col space-y-2">
                {!$totter.start && <Button onClick={() => dispatch(start())}>START GAME</Button>}
                {$totter.start && <Button onClick={() => dispatch(pause())}>{!$totter.pause ? "Pause" : "Continue"}</Button>}

                <Button onClick={() => window.location.reload()} type={"d"}>Restart</Button>
            </div>
        </div>
    )
}
