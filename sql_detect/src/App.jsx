import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const InputForm = () => {
  const [formData, setFormData] = useState({
    dpkts: "",
    doctets: "",
    srcaddr: "",
    dstaddr: "",
    input: "",
    output: "",
    srcport: "",
    dstport: "",
    prot: "",
    tos: "",
    tcp_flags: "",
  });
  const [sqlknnoutput, setSqlknnoutput] = useState("");
  const [sqllroutput, setSqllroutput] = useState("");
  const [sqlregoutput, setSqlregoutput] = useState("");
  const [isMalicious, setisMalicious] = useState(false);
  const [errorssql, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const newErrors = {};
    if (formData.dpkts.trim() === "" || isNaN(formData.dpkts)) {
      newErrors.dpkts = "Must be a number";
    }
    if (formData.doctets.trim() === "" || isNaN(formData.doctets)) {
      newErrors.doctets = "Must be a number";
    }
    if (formData.srcport.trim() === "" || isNaN(formData.srcport)) {
      newErrors.srcport = "Must be a number";
    }
    if (formData.dstport.trim() === "" || isNaN(formData.dstport)) {
      newErrors.dstport = "Must be a number";
    }
    if (formData.prot.trim() === "" || isNaN(formData.prot)) {
      newErrors.prot = "Must be a number";
    }
    if (formData.tos.trim() === "" || isNaN(formData.tos)) {
      newErrors.tos = "Must be a number";
    }
    if (formData.tcp_flags.trim() === "" || isNaN(formData.tcp_flags)) {
      newErrors.tcp_flags = "Must be a number";
    }
    if (formData.input.trim() === "" || isNaN(formData.input)) {
      newErrors.input = "Must be a number";
    }
    if (formData.output.trim() === "" || isNaN(formData.output)) {
      newErrors.output = "Must be a number";
    }
    if (formData.srcaddr.trim() === "" || isNaN(formData.srcaddr)) {
      newErrors.srcaddr = "Must be a number";
    }
    if (formData.dstaddr.trim() === "" || isNaN(formData.dstaddr)) {
      newErrors.dstaddr = "Must be a number";
    }
    setErrors(newErrors);

  
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      
      const response = await axios.post(
        "http://localhost:8000/api/calculate",
        formData
      );
     
      const parts = response.data.split("\r\n");
      console.log(parts);
      const numbers = parts
        .filter((part) => part.trim() !== "") 
        .map((part) => parseInt(part.replace(/\D/g, ""), 10)); 
      console.log(numbers);
      if (numbers[0] == 1) {
        setSqlknnoutput("Malicious");
        setisMalicious(true);
      } else {
        setSqlknnoutput("Not Malicious");
      }
      if (numbers[1] == 1) {
        setSqllroutput("Malicious");
        setisMalicious(true);
      } else {
        setSqllroutput("Not Malicious");
      }
      if (numbers[2] == 1) {
        setSqlregoutput("Malicious");
        setisMalicious(true);
      } else {
        setSqlregoutput("Not Malicious");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
 

  return (
    <div>
      <div className="namescontainer">
        <h1>IT352 PROJECT</h1>
        <div className="minimaincontainer">
          <div className="namesminicontainer">
            <h3>ADISH 211IT004</h3>
            <h3>MANJUNATH 211IT039</h3>
            <h3>KARTIK 211IT029</h3>
          </div>
          <div className="imgcontainer">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              srcset=""
              width={'150px'}
            />
          </div>
        </div>
      </div>

      <div className="mainformcontainer">
        <h2>Enter Input</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="dpkts"
            value={formData.dpkts}
            onChange={handleChange}
            placeholder="dpkts"
          />
             <li>{errorssql.dpkts}</li>
          <input
            type="text"
            name="doctets"
            value={formData.doctets}
            onChange={handleChange}
            placeholder="doctets"
          />
           <li>{errorssql.doctets}</li>
          <input
            type="text"
            name="srcaddr"
            value={formData.srcaddr}
            onChange={handleChange}
            placeholder="srcaddr"
          />
            <li>{errorssql.srcaddr}</li>
          <input
            type="text"
            name="dstaddr"
            value={formData.dstaddr}
            onChange={handleChange}
            placeholder="dstaddr"
          />
            <li>{errorssql.dstaddr}</li>
          <input
            type="text"
            name="input"
            value={formData.input}
            onChange={handleChange}
            placeholder="input"
          />
           <li>{errorssql.input}</li>
          <input
            type="text"
            name="output"
            value={formData.output}
            onChange={handleChange}
            placeholder="output"
          />
            <li>{errorssql.output}</li>
          <input
            type="text"
            name="srcport"
            value={formData.srcport}
            onChange={handleChange}
            placeholder="srcport"
          />
           <li>{errorssql.srcport}</li>
          <input
            type="text"
            name="dstport"
            value={formData.dstport}
            onChange={handleChange}
            placeholder="dstport"
          />
                  <li>{errorssql.dstport}</li>
          <input
            type="text"
            name="prot"
            value={formData.prot}
            onChange={handleChange}
            placeholder="prot"
          />
          
          <li>{errorssql.prot}</li>
          <input
            type="text"
            name="tos"
            value={formData.tos}
            onChange={handleChange}
            placeholder="tos"
          />
          
          <li>{errorssql.tos}</li>
          <input
            type="text"
            name="tcp_flags"
            value={formData.tcp_flags}
            onChange={handleChange}
            placeholder="tcp_flags"
          />
          
          <li>{errorssql.tcp_flags}</li>
        </form>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="outputcontainer">
        <h2>
          KNN{"("}
          {"70%"}
          {")"}:
        </h2>
        <span style={{ color: isMalicious ? "red" : "green" }}>
          {sqlknnoutput}
        </span>

        <h2>
          LR{"("}
          {"79%"}
          {")"}:
        </h2>
        <span style={{ color: isMalicious ? "red" : "green" }}>
          {sqllroutput}
        </span>

        <h2>
          RIDGE{"("}
          {"89%"}
          {")"}:
        </h2>
        <span style={{ color: isMalicious ? "red" : "green" }}>
          {sqlregoutput}
        </span>
       
      </div>
    </div>
  );
};

export default InputForm;
