import React from 'react';
import * as XLSX from 'xlsx';
import FileUploader from "../../../components/FileUploader"

class ImportAccountEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: '',
    };
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    this.setState({ file }, () => {
      this.readFile()
    });
  }


  readFile() {
    var f = this.state.file;
    if (f) {
      var name = f.name;
      const reader = new FileReader();
      reader.onload = (evt) => {
        // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

        let jsonString = this.convertToJson(data)

        let jsonData = JSON.parse(jsonString);

        this.props.fileImport && this.props.fileImport(jsonData);
      };
      reader.readAsBinaryString(f);
    }
  }

  convertToJson(csv) {
    var lines = csv.split('\n');

    var result = [];

    var headers = lines[0].split(',');

    console.log(headers);

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  render() {
    return (
      <div>
        <FileUploader
          handleChange={this.filePathset.bind(this)}
          hiddenFileInput={this.props.hiddenFileInput}
          className={this.props.className}
        />
      </div>
    );
  }
}



export default ImportAccountEntry;
