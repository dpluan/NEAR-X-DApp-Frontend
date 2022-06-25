import { Backdrop, Box, Button, Card, CircularProgress, Grid, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postSubmitContract } from '../api'
import contants from '../contants'
import { requestDeploy, setOpenOverlay } from '../store/contractSlice'
import CardWrapper from './CardWrapper'
import OptionalCard from './OptionalCard'
import OptionalForm from './OptionalForm'

function renderCardSlot(cardId, cardType) {
    const piece = <OptionalCard isOnContract={true} type={cardType} cardId={cardId} />

    return (
        piece ? <CardWrapper isSlot={true} cardType={cardType} isOptional={false} cardId={cardId} key={`contract-${cardId}`} >{piece}</CardWrapper> : null
    )
}

function renderCardWrapperChoosed(cardId, cardType) {
    const piece = <OptionalCard isOnContract={true} type={cardType} cardId={cardId} />

    return (
        piece ? <CardWrapper isSlot={false} cardType={cardType} isOptional={true} cardId={cardId} key={`contract-${cardId}`} >{piece}</CardWrapper> : null
    )
}

function renderFormWrapper(id, name, cardType, attribute) {
    const piece = <OptionalForm id={id} attribute={attribute} isOnContract={true} type={cardType} name={name} />

    return (
        piece ? <CardWrapper isSlot={false} cardType={cardType} isOptional={true} cardId={id} key={`optional-${name}`} >{piece}</CardWrapper> : null
    )
}

export default function ContractBoard() {

    const [linkWeb, setLinkWeb] = useState('')
    const dispatch = useDispatch()

    const openOvelay = useSelector((state) => state.contract.open_overlay)
    const choosedAttributes = useSelector((state) => state.contract.contract.attributes)
    const choosedFunctions = useSelector((state) => state.contract.functions)
    const choosedImplEntities = useSelector((state) => state.contract.impl_entities)

    const contract = useSelector((state) => state.contract.contract)
    const entities = useSelector((state) => state.contract.entities)
    const functions = useSelector((state) => state.contract.functions)
    const impl_entities = useSelector((state) => state.contract.impl_entities)

    let attributes = []
    let functionRender = []
    let implEntityRender = []

    choosedAttributes.map((attribute, index) => {
        const cardElement = renderFormWrapper(index, attribute.name, contants.CONTRACT_LAYOUT.CONTRACT, attribute)
        if (!!cardElement) {
            attributes.push(cardElement)
        }
    })


    choosedFunctions.map(fnId => {
        const cardElement = renderCardWrapperChoosed(fnId, contants.CONTRACT_LAYOUT.FUNCTION)
        if (!!cardElement) {
            functionRender.push(cardElement)
        }
    })

    choosedImplEntities.map(implEntityId => {
        const cardElement = renderCardWrapperChoosed(implEntityId, contants.CONTRACT_LAYOUT.IMPL_ENTITY)
        if (!!cardElement) {
            implEntityRender.push(cardElement)
        }
    })

    return (
        <Grid xs={12} container
            justifyContent="center"
            alignItems="center">
            <Grid xs={12} container
                justifyContent="center"
                alignItems="center">

                <Card style={{
                    padding: '20px',
                    marginTop: '20px',
                    width: '80%'
                }} variant="outlined">
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        Init Contract
                    </Typography>
                    {attributes}
                    {renderCardSlot(1, contants.CONTRACT_LAYOUT.CONTRACT)}
                </Card>
            </Grid>

            <Grid xs={12} container
                justifyContent="center"
                alignItems="center">

                <Card style={{
                    padding: '20px',
                    marginTop: '20px',
                    width: '80%'
                }} variant="outlined">
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        Functions
                    </Typography>
                    {functionRender}
                    {renderCardSlot(1, contants.CONTRACT_LAYOUT.FUNCTION)}
                </Card>
            </Grid>

            <Grid xs={12} container
                justifyContent="center"
                alignItems="center">

                <Card style={{
                    padding: '20px',
                    marginTop: '20px',
                    width: '80%'
                }} variant="outlined">
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        Entities
                    </Typography>
                    {implEntityRender}
                    {renderCardSlot(2, contants.CONTRACT_LAYOUT.IMPL_ENTITY)}
                </Card>
            </Grid>
            <Grid xs={12}
                style={{
                    marginTop: '20px',
                }} container
                justifyContent="center">
                <Button loading onClick={async () => {
                    dispatch(setOpenOverlay(true))
                    const payload = {
                        contract,
                        entities,
                        functions,
                        impl_entities,
                    }
                    const resDeploy = await postSubmitContract(JSON.parse(JSON.stringify(payload)))
                    setLinkWeb(resDeploy.data.web)
                    dispatch(setOpenOverlay(false))
                }} variant="contained">Deploy</Button>
            </Grid>

            {linkWeb && <Grid xs={12}
                style={{
                    margin: '20px',
                }} container
                justifyContent="center">
                <span style={{marginRight: '10px'}}>Deployed: </span><Link href={linkWeb}> My dApp</Link>
            </Grid>}

            <Backdrop
                sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openOvelay}
            > <CircularProgress color="inherit" /> Deploying...</Backdrop>
        </Grid>
    )
}