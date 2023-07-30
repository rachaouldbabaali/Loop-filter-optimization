import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Papa from "papaparse";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { updateDataTable } from "../store/slices/dataTableSlice";
import _ from "lodash";

const Data = require("../data/dataset_small.csv");

interface CSVDataRow {
  [key: string]: string;
}

const filterDataTable = (data: any, filterOptions: any) => {
  let data_ = _.clone(data);
  for (let key in filterOptions) {
    data_ = _.filter(data_, { [key]: filterOptions[key] });
  }

  return data_;
};

const DataTableComp: React.FC = () => {
  const filter = useSelector((state: any) => state.filter);
  const options = useSelector((state: any) => state.options);
  const dispatch = useDispatch();

  const [data, setData] = useState<CSVDataRow[]>([]);
  const [fetchedData, setFetchedData] = useState<CSVDataRow[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(Data);
        const csvData: any = await response.text();
        const { data } = await Papa.parse<CSVDataRow>(csvData, {
          header: true,
          skipEmptyLines: true,
        });
        setData(data);
        setFetchedData(data);
        dispatch(updateDataTable(data));
        // Generate columns dynamically based on the CSV header
        if (data.length) {
          const header = Object.keys(data[0]);
          const newColumns = _.map(header, (key) => ({
            name: key,
            selector: key,
            sortable: true,
          }));
          setColumns(newColumns);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(filter).length) {
      const filteredData = filterDataTable(fetchedData, filter);
      setData(filteredData);
      dispatch(updateDataTable(filteredData));
    } else {
      setData(fetchedData);
      dispatch(updateDataTable(fetchedData));
    }
  }, [filter, fetchedData, dispatch, options]);

  return (
    <>
      <DataTable
        title="Products List"
        columns={columns}
        data={data}
        pagination
        paginationPerPage={20}
        paginationRowsPerPageOptions={[20, 100, 200, 500]}
        highlightOnHover
        striped
        dense
        fixedHeader
        fixedHeaderScrollHeight="80vh"
        selectableRows
        selectableRowsHighlight

      />
    </>
  );
};

export default DataTableComp;
