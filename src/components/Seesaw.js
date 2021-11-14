import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import useRandomInterval from '../hooks/useRandomInterval'
import { seesawBound } from '../redux/totter.actions'
import '../styles/triangle.css'
import Shape, { Mounted } from './Shape'
export const Seesaw = () => {
    const d = useRef(null)
    const $totter = useSelector(state => state.$totter)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(seesawBound(d.current?.getBoundingClientRect()))
    }, [])

    return (
        <div className="absolute bottom-10 top-10 left-0 right-0 w-full h-auto flex flex-col items-center justify-end px-5">
            {_($totter.shapes).map(shape => <Shape.Controllable key={shape.id} id={shape.id} />).value()}
            {_($totter.moving).map(shape => <Shape.Moving key={shape.id} id={shape.id} />).value()}
            <WoodBlock ref={d} onTransitionEnd={() => dispatch(seesawBound(d.current?.getBoundingClientRect()))} rotation={($totter.leftkgm - $totter.rightkgm) / 2} >
                {_($totter.mounted).map(shape => <Shape.Mounted key={shape.id} id={shape.id} />).value()}
            </WoodBlock>
            <div className="triangle"></div>
        </div>
    )
}

const WoodBlock = styled.div`
    width: 100%;
    height: 16px;
    background-color: brown;
    transform: ${props => `rotate(${props?.rotation || "0"}deg)`};
    transition: all 0.3s ease-out;
    position: relative
`