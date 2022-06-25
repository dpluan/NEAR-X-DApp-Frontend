import { configureStore } from '@reduxjs/toolkit'
import contractSlice from './contractSlice'

export default configureStore({
  reducer: {
    contract: contractSlice
  },
})