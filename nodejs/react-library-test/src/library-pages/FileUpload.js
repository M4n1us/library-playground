import * as React from "react";
import axios from "axios";

export default class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: {}
        }

    }

    render() {
        return (
            <div>
                <h2>File Upload</h2>
                <input type="file" onChange={(event => this.fileUploadChange("BOM", event))}/>
                <input type="file" onChange={(event => this.fileUploadChange("Gerber", event))}/>
                <button type="button" onClick={() => this.uploadFiles("http://localhost:3001/upload")}>Upload
                </button>
            </div>
        )
    }

    uploadFiles(targetUrl){
        console.log("Uploading..")
        console.log(this.state.files)
        const data = new FormData();
        Object.entries(this.state.files).forEach((uploadTarget) =>{
            let [targetName, files] = uploadTarget;
            console.log(`Iterating over entry ${targetName}`);
            console.log(files)
            Array.from(files).forEach(file => {
                console.log(file);
                data.append('file', file);
            })
        })
        axios.post(targetUrl, data).then(res =>{
            console.log(res);
        }).catch(err => {
            console.log(err)
            }
        )

    }

    fileUploadChange(fieldName, event){
        let currentFiles = this.state.files;
        currentFiles[fieldName] = event.target.files;
        this.setState({
            file: currentFiles
        });
    }
}