import { ADD_KPI } from './types'

const addKPI=(KPI,state)=>{
  const newKPI=[...state.KPI,KPI];
  return {...state,KPI:newKPI}


}


export default (state,action) =>{
switch(action.type){
    case ADD_KPI:
        return addKPI(action.payload,state)
    default:
    return state
   }
}
