import { createSlice } from '@reduxjs/toolkit'
import { postSubmitContract } from '../api';
import contants from '../contants';
import counter from '../templates/counter'
import loan from '../templates/loan';

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function arrayAttributesRemove(arr, name) {
  return arr.filter(function (ele) {
    return name != ele.name;
  });
}

function __setFunction(functionId, stateFunctions, stateOptionalContractFunctions, isOptionalToContract) {
  let stateFunctionUpdated = stateFunctions
  let stateOptionalContractFunctionsUpdated = stateOptionalContractFunctions

  if (!isOptionalToContract) {
    stateOptionalContractFunctionsUpdated.push(functionId)
    stateFunctionUpdated = arrayRemove(stateFunctions, functionId)
  } else {
    stateFunctionUpdated.push(functionId)
    stateOptionalContractFunctionsUpdated = arrayRemove(stateOptionalContractFunctionsUpdated, functionId)
  }

  return {
    stateFunctions: stateFunctionUpdated,
    stateOptionalContractFunctions: stateOptionalContractFunctionsUpdated
  }
}

function __setAttributeInit(index, objAttribute, stateContractAttributes, stateOptionalContractAttributes, isOptionalToContract) {
  let stateContractAttributesUpdated = stateContractAttributes
  let stateOptionalContractAttributesUpdated = stateOptionalContractAttributes
  if (!isOptionalToContract) {
    stateOptionalContractAttributesUpdated.push(objAttribute)
    stateContractAttributesUpdated = arrayAttributesRemove(stateContractAttributesUpdated, objAttribute.name)
  } else {
    stateContractAttributesUpdated.push(objAttribute)
    stateOptionalContractAttributesUpdated = arrayAttributesRemove(stateOptionalContractAttributesUpdated, objAttribute.name)
  }

  return {
    stateContractAttributes: stateContractAttributesUpdated,
    stateOptionalContractAttributes: stateOptionalContractAttributesUpdated
  }
}

function __setImplEntity(functionId, stateImplEntities, stateOptionalImplEntities, isOptionalToContract) {
  stateImplEntities.push(functionId)
  return {
    stateImplEntities: stateImplEntities,
    stateOptionalImplEntities: arrayRemove(stateOptionalImplEntities, functionId)
  }
}

export const contractSlice = createSlice({
  name: 'contract',
  elementUsageId: '',
  elementTypeUsage: '',
  elementUsageName: '',
  initialState: {
    templates: {
      loan: loan
    },
    contract: {
      name: '',
      attributes: []
    },
    entities: [],
    functions: [],
    impl_entities: [],
    optionalContract: {
      contract: {
        name: loan.contract.name,
        attributes: loan.contract.attributes
      },
      entities: [],
      functions: loan.functions,
      impl_entities: loan.impl_entities,
    },
    open_overlay: false
  },
  reducers: {
    setContract: (state, contractDetail) => {
      state.contract = contractDetail
    },
    setEntity: (state, entityDetail) => {
      state.entities.push(entityDetail)
    },
    setFunction: (state) => {
      const functionId = state.elementUsageId
      if (functionId) {
        const {
          stateFunctions,
          stateOptionalContractFunctions
        } = __setFunction(functionId, state.functions, state.optionalContract.functions)

        state.functions = stateFunctions
        state.optionalContract.functions = stateOptionalContractFunctions
        state.elementUsageId = ''
      }

    },
    setImplEntity: (state) => {
      const cardId = state.elementUsageId
      if (cardId) {
        const {
          stateImplEntities,
          stateOptionalImplEntities
        } = __setImplEntity(cardId, state.impl_entities, state.optionalContract.impl_entities)

        state.impl_entities = stateImplEntities
        state.optionalContract.impl_entities = stateOptionalImplEntities
        state.elementUsageId = ''
      }

    },

    handleDispatchByType(state, context) {
      const cardType = state.elementTypeUsage
      const cardId = state.elementUsageId

      const isMoveOptionalToContract = context.payload.is_move_optional_to_contract ?? true

      if (isMoveOptionalToContract && cardType != context.payload.card_type) {
        return;
      }
      if (cardId !== null) {
        switch (cardType) {
          case contants.CONTRACT_LAYOUT.FUNCTION:
            const {
              stateFunctions,
              stateOptionalContractFunctions
            } = __setFunction(cardId, state.functions, state.optionalContract.functions, isMoveOptionalToContract)

            state.functions = stateFunctions
            state.optionalContract.functions = stateOptionalContractFunctions
            state.elementTypeUsage = ''
            state.elementUsageId = ''

            return;
          case contants.CONTRACT_LAYOUT.IMPL_ENTITY:
            const {
              stateImplEntities,
              stateOptionalImplEntities
            } = __setImplEntity(cardId, state.impl_entities, state.optionalContract.impl_entities, isMoveOptionalToContract)

            state.impl_entities = stateImplEntities
            state.optionalContract.impl_entities = stateOptionalImplEntities
            state.elementTypeUsage = ''
            state.elementUsageId = ''
            return;
          case contants.CONTRACT_LAYOUT.CONTRACT:
            const {
              stateContractAttributes,
              stateOptionalContractAttributes
            } = __setAttributeInit(cardId, state.templates.loan.contract.attributes[cardId], state.contract.attributes, state.optionalContract.contract.attributes, isMoveOptionalToContract)

            state.contract.attributes = stateContractAttributes
            state.optionalContract.contract.attributes = stateOptionalContractAttributes
            state.elementTypeUsage = ''
            state.elementUsageId = ''
          default:
        }
      }

    },
    setElementUsageName(state, context) {
      state.elementUsageName = context.payload
    },
    setElementUsageId(state, context) {
      state.elementUsageId = context.payload
    },
    setElementTypeUsage(state, context) {
      state.elementTypeUsage = context.payload
    },
    setContractAttributeValueByName(state, context) {
      const value = context.payload.value
      const name = context.payload.name

      console.log(value, name);

      state.contract.attributes.map((attr, index) => {
        console.log('-------', attr.name, index);
        if (attr.name == name) {
          state.contract.attributes[index].value = value
        }
      })
    },
    requestDeploy(state) {
      // state.open_overlay = true
      //  postSubmitContract(JSON.parse(JSON.stringify({
      //   contract: state.contract,
      //   entities: state.entities,
      //   functions: state.functions,
      //   impl_entities: state.impl_entities,
      // }))).then(res => {
      //   console.log('xxx')
      //   state.open_overlay = false
      // })
    },
    setOpenOverlay(state, context) {
      state.open_overlay = context.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setContract, setEntity, setImplEntity, handleDispatchByType, setElementUsageId, setOpenOverlay, setElementUsageName, setElementTypeUsage, setContractAttributeValueByName, requestDeploy } = contractSlice.actions

export default contractSlice.reducer