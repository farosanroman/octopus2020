import { createContext } from 'react';

const kpiContext = createContext({
    CANT:0,
  KPI: [],
  dispatchKPI: (kpi) => {}
});

export default kpiContext;