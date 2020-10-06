import React, { Component } from "react";
import axios from "axios";
import MainNavigation from "../components/MainNavigation";
import "./URLShortner.css";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://localhost:4000/stats",
      data: [],
    };
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    axios
      .get(this.state.url)
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        this.setState({ data: result });
      })
      .catch((err) => {
        console.log({ errorFlag: "Y", error: err.message });
      });
  }

  render() {
    return (
      <div>
        <MainNavigation cartItemNumber={this.props.cartItemCount} />
        <main className="products">
          <h1 style={{ padding: "10px" }}>Analytics</h1>
          {this.state.data &&
            this.state.data.map((stat) => {
              return (
                <div
                  key={stat.shortId}
                  style={{
                    margin: "5px",
                    padding: "7px",
                  }}
                >
                  <span style={{ fontWeight: "bold", lineHeight: "2" }}>
                    {stat.longUrl}
                  </span>
                  <br />
                  http://localhost:4000/{stat.shortUrl}
                  <br />
                  <br />
                  Total clicks: {stat.clicks} <br />
                  {stat.clicks > 0
                    ? `Top countries: ${stat.topCountries}`
                    : null}
                  <hr />
                </div>
              );
            })}
        </main>
      </div>
    );
  }
}

export default Statistics;
