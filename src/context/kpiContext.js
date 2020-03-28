import {createContext} from 'react'

const KpiContext=createContext({
    KPI:[],
    addKpi:(kpi)=>{}
}


)

export default KpiContext