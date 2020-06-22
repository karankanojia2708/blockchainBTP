/*
live index score
mysql of product id 

*/

import React, { Component } from "react";

import "./App.css";
import web3 from "./web3";
import sup from "./sup";





class App extends Component {
  constructor(props) {
    super(props);

    this.displayData = [];
    this.title = [
      "previous : ", 
            ", creator : ", 
            ", productName : ", 
            ", productId : ", 
            ", date : " ,
            ", username : ", 
            ", location : " ,
            ", temperature : ", 
            ", weight : ",
            ", price : ",
            ", required_temperature : " , 
            ", required_price : ", 
            ", required_previous_time : "  

    ];

    this.state = {
      prr: [],
      size: "",
      message: "Node in sync",
      previous: "",
      productName: "",
      username : "", 
      location : "", 
      temperature : 0, 
      weight : 0, 
      price : 0, 
      required_temperature : 0, 
      required_price: 0,
      required_previous_time : 0,
      index: 0,
      time: 0,
      karan: "ks <br/>",
      data: "",
      showdata: this.displayData,
      postVal: "",
      score : 0, 
      modalShow : false, 
      setModalShow : false
    };
  }

  async componentDidMount() {
    const size = await sup.methods.size().call();
    this.setState({ size });
    const prr = await sup.methods.getPrr().call();
    this.setState({ prr });
    console.log(prr.length);
  }

  addProduct = async (event) => {
    event.preventDefault();
    this.setState({ message: "Node out of sync, wait !" });

    const account = await web3.eth.getAccounts();

    await sup.methods
      .createProduct(
        this.state.previous,
        this.state.productName,
        new Date().getTime().toString(),
        this.state.username, 
        this.state.location,
        this.state.temperature,
        this.state.weight,
        this.state.price,
        this.state.required_temperature,
        this.state.required_price,
        this.state.required_previous_time

      )
      .send({ from: account[0], gas: "1000000" });

    const size = await sup.methods.size().call();
    this.setState({ size });
    const prr = await sup.methods.getPrr().call();
    this.setState({ prr });
    console.log(prr.length);   
    this.setState({ message: "Node in sync" });
  };

  wholeChain = async (event) => {
    event.preventDefault();
    console.log("getting ready");

    

    this.setState({ message: "Node out of sync, wait !" });
    let n = this.state.prr.length;
    let i = 0;
    var elem = document.getElementById("dataId");
    elem.innerHTML = "";
    for (i = n - 1; i >= 0; i--) {

      var parent = document.createElement("LI"); 

      var string = ""; 
      var j =0 ;
      for(j = 0; j<this.title.length; j++){
        string += this.title[j] +" "+this.state.prr[i][j].toString(); 
      }
      console.log(this.state.prr[i]);      
      var textNode = document.createTextNode(string);
      parent.appendChild(textNode);
      elem.appendChild(parent);
    }
    this.setState({ message: "Node in sync" });

    /*var node = document.createElement("LI"); // Create a <li> node
    var textnode = document.createTextNode("Water"); // Create a text node
    node.appendChild(textnode);
    elem.appendChild(node);*/
    console.log(elem);
  };
  backChain = async (event) => {
    event.preventDefault();
    this.setState({ message: "Node out of sync, wait !" });
    var elem = document.getElementById("dataId");
    elem.innerHTML = "";
    var score = 0;
    let i = parseInt(this.state.index);
    while (i != 0) {
      console.log(this.state.prr[i]);
      

      console.log(this.state.prr[i].productName);

      var parent = document.createElement("LI"); 

      var string = ""; 
      var j =0 ;

      
      
      for(j = 0; j<this.title.length; j++){
        string += this.title[j] +" "+this.state.prr[i][j].toString(); 
         
      }
      console.log(this.state.prr[i]);      
      var textNode = document.createTextNode(string);
      parent.appendChild(textNode);
      elem.appendChild(parent);
      elem.appendChild(parent);

      var deltaTemp = 0.3*Math.abs(this.state.prr[i][7]-this.state.prr[i][10]); 
      var deltaPrice = 0.1*Math.abs(this.state.prr[i][9]-this.state.prr[i][11])/this.state.prr[i][8];
      score += deltaTemp+deltaPrice; 
      i = parseInt(this.state.prr[i].previous);

    }

    
    score = -score;
    this.setState({score});

    this.setState({ message: "Node in sync" });
  };

  

  render() {
    return (
      <div className="App container">
      

       
        <h2>Food supply chain</h2>
        <p>
          Current chain size : <b>{this.state.size}</b>
        </p>

        <div className="row">
          <div className="col-sm">
            <form onSubmit={this.addProduct}>
              <h4>Add product </h4>
              <div>
                <div className="form-group">
                  <label htmlFor="previousNode">Previous node</label>
                  <input
                    className="form-control"
                    id="previousNode"
                    aria-describedby="Previous node address"
                    placeholder="Previous node address"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ previous: event.target.value });
                      {
                        this.setState({ time: Date.now() });
                      }
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="productName">Product name</label>

                  <input
                    className="form-control"
                    id="productName"
                    aria-describedby="Product name"
                    placeholder="Product name"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ productName: event.target.value });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">User name</label>

                  <input
                    className="form-control"
                    id="username"
                    aria-describedby="User name"
                    placeholder="User name"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ username: event.target.value });
                    }}
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="location">Location</label>

                  <input
                    className="form-control"
                    id="location"
                    aria-describedby="User name"
                    placeholder="Location"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ location: event.target.value });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="temperature">Temperature</label>

                  <input
                    className="form-control"
                    id="temperature"
                    aria-describedby="Temperature"
                    placeholder="Temperature"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ temperature: event.target.value });
                    }}
                  />
                </div>



                <div className="form-group">
                  <label htmlFor="weight">Weight</label>

                  <input
                    className="form-control"
                    id="weight"
                    aria-describedby="weight"
                    placeholder="weight"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ weight: event.target.value });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>

                  <input
                    className="form-control"
                    id="price"
                    aria-describedby="weight"
                    placeholder="price"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ price: event.target.value });
                    }}
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="required_temperature">Required temperature</label>

                  <input
                    className="form-control"
                    id="required_temperature"
                    aria-describedby="required_temperature"
                    placeholder="required_temperature"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ required_temperature: event.target.value });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="required_price">Required price</label>

                  <input
                    className="form-control"
                    id="required_price"
                    aria-describedby="required_price"
                    placeholder="required_price"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ required_price: event.target.value });
                    }}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="required_previous_time">Required previous time</label>

                  <input
                    className="form-control"
                    id="required_previous_time"
                    aria-describedby="required_previous_time"
                    placeholder="required_previous_time"
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ required_previous_time: event.target.value });
                    }}
                  />
                </div>
                


              </div>
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </form>
           
          </div>
          <div className="col-sm">
            <form onSubmit={this.wholeChain}>
              <h4>Display Whole chain</h4>
              <button type="submit" className="btn btn-primary">
                Whole chain
              </button>
            </form>

            <br />
            <br />
            <br />

            <form onSubmit={this.backChain}>
              <h4>Display Back chain</h4>

              <div>
                <div className="form-group">
                  <label htmlFor="index">Product index</label>
                  <input
                    className="form-control"
                    id="productName"
                    aria-describedby="Product name"
                    placeholder="Product name"
                    ß
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ index: event.target.value });
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Get Chain
              </button>
            </form>
            <br />
            <br />
            <br />
            <div><h4>Current chain : {this.state.score}</h4></div>

            <div className="sync">{this.state.message}</div>
            
          </div>
          <div className="col-sm">
            <h1>Data</h1>
            <p id="dataId"></p>

            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
