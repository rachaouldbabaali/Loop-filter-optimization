import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { setFilter, clearFilter } from "../store/slices/filterSlice";
import { setOptions } from "../store/slices/optionsSlice";
import _ from "lodash";
import "../styles/Filter.css";
interface CSVDataRow {
  [key: string]: string;
}

const generateOptions = (filteredData: CSVDataRow[], columns: string[]) => {
  const uniqueOptions = _.map(columns, (column: string) => {
    const uniqueValues = _.uniq(_.map(filteredData, column));
    return { [column]: uniqueValues };
  });

  return uniqueOptions;
};

const FilterComp: React.FC = () => {
  const options = useSelector((state: any) => state.options);
  const data = useSelector((state: any) => state.data.dataTable);
  const dispatch = useDispatch();

  const handleChange = (selectedOptions: any, column: string) => {
    dispatch(setFilter({ column, value: selectedOptions[0].value }));
  };

  const handleRemove = (column: string) => {
    dispatch(clearFilter(column));
  };

  useEffect(() => {
    if (data.length) {
      const columns = Object.keys(data[0]);
      const options = generateOptions(data, columns);

      _.forEach(options, (option, index) => {
        dispatch(
          setOptions({
            column: columns[index],
            options: option[columns[index]],
          })
        );
      });
    }
  }, [data, dispatch]);

  const filters = Object.keys(options).map((column) => (
    <Multiselect
      key={column}
      options={options[column].map((option: string) => ({
        value: option,
        label: option,
      }))}
      onSelect={(selectedOptions) => handleChange(selectedOptions, column)}
      onRemove={() => handleRemove(column)}
      closeOnSelect={true}
      displayValue="label"
      placeholder={column}
      showCheckbox={true}
      className="selectStyle"
    />
  ));

  return <div className="containerStyle">{filters}</div>;
};

export default FilterComp;
