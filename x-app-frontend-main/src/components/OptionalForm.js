import { Button, Grid, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import React from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import contants from '../contants'
import { handleDispatchByType, setContractAttributeValueByName, setElementTypeUsage, setElementUsageId } from '../store/contractSlice'

export default function OptionalForm({ id, type, name, isOnContract, attribute }) {

    const [value, setValue] = React.useState('');



    const optionalContractInit = useSelector(state => state.contract.optionalContract.contract)
    const dispatch = useDispatch()

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'card',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        canDrag: () => {
            dispatch(setElementUsageId(id))
            dispatch(setElementTypeUsage(type))

            return true
        },
        end: () => {
            if (isOnContract) {
                dispatch(handleDispatchByType({ is_move_optional_to_contract: false }))
            }
        }
    }))

    const renderFormInit = () => {
        switch (attribute.type) {
            case 'date': 
            return <DateTimePicker
                label={attribute.name}
                value={value}
                onChange={(value) => {dispatch(setContractAttributeValueByName({ name: attribute.name, value: value  })); setValue(value)}}
                renderInput={(params) => <TextField {...params} />}
            />;
            default: 
            return <TextField
                required
                id="outlined-required"
                label={attribute.name}
                onChange={(event) => dispatch(setContractAttributeValueByName({ name: attribute.name, value: event.target.value }))}
            />
        }

    }

    return <div ref={dragRef}>
        <Grid xs={12}>
            {(!isOnContract) && <Button variant="outlined">{name}</Button>}
            {isOnContract && renderFormInit()}
        </Grid>
    </div>
}