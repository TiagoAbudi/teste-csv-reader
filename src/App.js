import React from "react";
import Papa from "papaparse"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  labelBotao: {
    width: '11%',
    display: "block",
    margin: "10px auto",
    border: "1px solid black",
    borderRadius: "7px",
    padding: "5px",
    color: "black",
    background: "lightgray",
    textAlign: 'center',
    "&:hover": {
      top: '-0.6px',
      textShadow: '1px 1px 1px rgba(0, 0, 0, .2)',
      boxShadow: '1px 1px 1px rgba(0, 0, 0, .5)',
    },
  },
});

const App = () => {
  const classes = useStyles();
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
    <div>
      <label
        className={classes.labelBotao}
        for="getFile"
        class="btn"
      // onclick={document.getElementById('getFile').click()}
      >Escolher o Arquivo</label>

      <label
        onClick={limparArquivo}
        className={classes.labelBotao}
      >Limpar Arquivo</label>

      <input
        id="getFile"
        type="file"
        name="file"
        accept=".csv"
        onChange={handleFile}
        style={{ display: "block", margin: "10px auto", display: "none" }}
      ></input>

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
