import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {RootState} from '../store'

//customized hook that allows getting data from store
//RootState is cutomized type created in ../store/index.ts
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector