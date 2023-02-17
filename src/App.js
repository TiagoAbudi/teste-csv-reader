import React from "react";
import './App.css';
import Papa from "papaparse"
import logo from './logo.svg';

const App = () => {

  const [data, setData] = React.useState([]);
  const [columnArray, setColumnArray] = React.useState([]);
  const [valuesArray, setValuesArray] = React.useState([]);

  const handleFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnArray = [];
        const valuesArray = [];

        result.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setData(result.data);
        setColumnArray(columnArray[0]);
        setValuesArray(valuesArray);
      }
    })
  }

  const limparArquivo = () => {
    setData([]);
    setColumnArray([]);
    setValuesArray([]);
  }
  return (
    <div className="App-header">
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={handleFile}
        style={{ display: "block", margin: "10px auto" }}
      ></input>
      <button onClick={limparArquivo} style={{ display: "block", margin: "10px auto" }}>Limpar Arquivo</button>
      

      <table style={{ borderCollapse: "collapse", border: "1px solid black", margin: "5px auto" }}>
        <thead>
          <tr>
            {columnArray.map((col, i) => (
              <th style={{ border: "1px solid black" }} key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {valuesArray.map((v, i) => (
            <tr key={i}>
              {v.map((value, i) => (
                <td style={{ border: "1px solid black" }} key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
