import React from "react";
import DataTable from "./components/DataTable";
import Filter from "./components/Filter";

function App(props:any) {
  

  return (
    <div className="App">
      <Filter />
      <DataTable />
    </div>
  );
}

export default App;
