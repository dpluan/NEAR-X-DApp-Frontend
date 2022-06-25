import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { handleDispatchByType, setContract, setElementTypeUsage, setElementUsageId } from '../store/contractSlice'

export default function OptionalCard({ type, cardId, isOnContract }) {

    const dispatch = useDispatch()

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'card',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        canDrag: () => {
            dispatch(setElementUsageId(cardId))
            dispatch(setElementTypeUsage(type))

            return true
        },
        end: () => {
            if(isOnContract) {
                dispatch(handleDispatchByType({is_move_optional_to_contract: false}))
            }
        }
    }))

    return <div ref={dragRef}>
        <Grid xs={12}>
            <Button variant="outlined">{cardId}</Button>
        </Grid>
    </div>
}