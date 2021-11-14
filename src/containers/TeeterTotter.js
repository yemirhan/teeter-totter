import _ from 'lodash'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Seesaw } from '../components/Seesaw'
import Shape from '../components/Shape'
import useRandomInterval from '../hooks/useRandomInterval'
import useShapeFactory from '../hooks/useShapeFactory'
import { addShape, bounds } from '../redux/totter.actions'

export const TeeterTotter = () => {
    const canvas = useRef(null)
    const $totter = useSelector(state => state.$totter)
    const dispatch = useDispatch()
    useShapeFactory()
    useLayoutEffect(() => {
        dispatch(bounds(canvas.current.clientWidth, canvas.current.clientHeight));
    }, [])
    // useRandomInterval(() => dispatch(addShape("circle", 10, 10, Math.random(), 3)), 3000, 7000)

    return (
        <div ref={canvas} className="w-full h-full bg-gray-300 relative">
            <div className={`absolute inset-0 backdrop-filter backdrop-blur-xl flex items-center justify-center bg-gray-700 z-10 bg-opacity-60 text-white text-3xl font-semibold ${$totter.start ? "invisible pointer-events-none" : ""}`}>Start the game!</div>
            <div className={`absolute inset-0 backdrop-filter backdrop-blur-xl flex flex-col items-center justify-center bg-gray-700 z-10 bg-opacity-60 text-white text-3xl font-semibold ${!$totter.gameover ? "invisible pointer-events-none" : ""}`}>
                <div>{":("}</div>
                <div className="w-auto h-auto p-2 bg-gray-300 hover:bg-gray-400 rounded-lg mt-2 cursor-pointer" onClick={() => window.location.reload()}>Restart the game</div>
            </div>

            <Seesaw />
        </div>
    )
}
