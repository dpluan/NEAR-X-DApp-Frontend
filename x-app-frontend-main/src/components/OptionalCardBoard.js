import { Grid } from '@mui/material'
import React from 'react'
import CardWrapper from './CardWrapper'
import OptionalCard from './OptionalCard'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import counter from '../templates/counter';
import contants from '../contants';
import { useSelector } from 'react-redux';
import OptionalForm from './OptionalForm';

function renderCardWrapper(cardId, cardType) {
    const piece = <OptionalCard isOnContract={false} type={cardType} cardId={cardId} />

    return (
        piece ? <CardWrapper isSlot={false} cardType={cardType} isOptional={true} cardId={cardId} key={`optional-${cardId}`} >{piece}</CardWrapper> : null
    )
}

function renderFormWrapper(id, name, cardType, attribute) {
    const piece = <OptionalForm id={id} attribute={attribute} isOnContract={false} type={cardType} name={name} />

    return (
        piece ? <CardWrapper isSlot={false} cardType={cardType} isOptional={true} cardId={id} key={`optional-${name}`} >{piece}</CardWrapper> : null
    )
}


export default function OptionalCardBoard({ cardIds }) {
    const [expanded, setExpanded] = React.useState(false);

    const contractAttributes = useSelector((state) => state.contract.optionalContract.contract.attributes)
    const functions = useSelector((state) => state.contract.optionalContract.functions)
    const implEntities = useSelector((state) => state.contract.optionalContract.impl_entities)

    let contractAttributeRender = []
    let functionRender = []
    let implEntityRender = []

    contractAttributes.map((attribute, index) => {
        const cardElement = renderFormWrapper(index, attribute.name, contants.CONTRACT_LAYOUT.CONTRACT, attribute)
        if (!!cardElement) {
            contractAttributeRender.push(cardElement)
        }
    })


    functions.map(fnId => {
        const cardElement = renderCardWrapper(fnId, contants.CONTRACT_LAYOUT.FUNCTION)
        if (!!cardElement) {
            functionRender.push(cardElement)
        }
    })

    implEntities.map(implEntityId => {
        const cardElement = renderCardWrapper(implEntityId, contants.CONTRACT_LAYOUT.IMPL_ENTITY)
        if (!!cardElement) {
            implEntityRender.push(cardElement)
        }
    })

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const styledAccordion = {
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        border: '1px solid',
        borderColor: '#8d99a3',
        marginTop: '20px'
    }

    return (
        <Grid
            xs={12}
            style={{
                textAlign: 'center',
            }}
            container
            justifyContent="center">

            <Grid style={styledAccordion} xs={12}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            General Initialize
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Smartcontract Init</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {contractAttributeRender}
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <Grid style={styledAccordion} xs={12}>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            General Functions
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Smartcontract Function</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {functionRender}
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <Grid xs={12}>
                <Accordion style={styledAccordion} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            General Entiies
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Smartcontract Impl Entiies</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {implEntityRender}
                    </AccordionDetails>
                </Accordion>
            </Grid>


        </Grid>

    )
}