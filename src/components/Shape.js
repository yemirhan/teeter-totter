import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import useKeyDown from '../hooks/useKeyDown'
import { moveDownMoving, onCollideLeft, onCollideRight, selectActiveShape } from '../redux/totter.actions'

const Shape = () => {
    return (
        <div>

        </div>
    )
}

const Controllable = ({ id }) => {
    const $totter = useSelector(state => state.$totter)
    const dispatch = useDispatch()
    const ref = useRef(null)
    const collision = () => {
        const d = ref.current?.getBoundingClientRect()
        if (
            !(((d.y + d.height) < ($totter?.seesawBound?.y)) ||
                (d.y > ($totter?.seesawBound?.y + $totter?.seesawBound?.height)) ||
                ((d.x + d.width) < $totter?.seesawBound?.x) ||
                (d.x > ($totter?.seesawBound?.x + $totter?.seesawBound?.width)))
        ) { dispatch(onCollideRight(id, (d.x + (d.width / 2)) - $totter?.seesawBound?.x)); };
    }
    return <StyledShape
        onClick={() => dispatch(selectActiveShape(id))}
        ref={ref}
        x={$totter.shapes[id].x}
        y={$totter.shapes[id].y}
        active={$totter.activeShape === id}
        onTransitionEnd={collision}
        style={{
            left: $totter.shapes[id].x || 0,
            top: $totter.shapes[id].y,
            borderColor: $totter.activeShape === id ? "gray" : "transparent",
            borderRadius: $totter.shapes[id].shapeType === "circle" ? "100%" : "0%",
            backgroundColor: { circle: "red", triangle: "cyan", rectangle: "purple" }[$totter.shapes[id].shapeType],
        }}
    >{$totter.shapes[id].weight}kg</StyledShape>
}
const Moving = ({ id }) => {
    const $totter = useSelector(state => state.$totter)
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch(moveDownMoving(id))
        }, 1000);

    }, [])
    return <StyledShape
        onTransitionEnd={() => {dispatch(onCollideLeft(id, $totter?.seesawBound?.y))}}
        style={{
            left: $totter.moving[id].x || 0,
            top: $totter.moving[id].y,
            borderColor: $totter.activeShape === id ? "gray" : "transparent",
            borderRadius: $totter.moving[id].shapeType === "circle" ? "100%" : "0%",
            backgroundColor: { circle: "red", triangle: "cyan", rectangle: "purple" }[$totter.moving[id].shapeType],
            transitionDuration: "6s",

        }}
    >{$totter.moving[id].weight}kg</StyledShape>
}



const StyledShape = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transition: all 0.2s;
    border-width: 6px;
    
`

export const Mounted = ({ id }) => {
    const $totter = useSelector(state => state.$totter)
    const dispatch = useDispatch()

    return <StyledShapeMounted
        onClick={() => dispatch(selectActiveShape(id))}
        style={{
            left: $totter.mounted[id].x || 0,
            top: 0,
            borderRadius: $totter.mounted[id].shapeType === "circle" ? "100%" : "0%",
            backgroundColor: { circle: "red", triangle: "cyan", rectangle: "purple" }[$totter.mounted[id].shapeType],
        }}
    >{$totter.mounted[id].weight}kg</StyledShapeMounted>
}
const StyledShapeMounted = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transition: all 0.2s cubic-bezier(1, 0, 0, 1);
    transform: translateY(-100%);
    
`

Shape.Controllable = Controllable
Shape.Moving = Moving
Shape.Mounted = Mounted

export default Shape