import React, { Component } from "react";
import axios from "axios";
import MainNavigation from "../components/MainNavigation";
import "./URLShortner.css";

class URLShortner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      shortUrl: null,
    };
  }
  onGetShortUrlClick = () => {
    if (this.state.url) {
      //alert(this.state.url);
    }
    axios
      .post(`http://localhost:4000`, {
        longUrl: this.state.url,
      })
      .then((response) => response.data)
      .then((result) => {
        this.setState({ shortUrl: result.shortUrl });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (event) => {
    this.setState({ url: event.target.value });
  };

  render() {
    return (
      <div>
        <MainNavigation />
        <main className="products">
          <h1>Welcome to URL Shorten site</h1>
          <label htmlFor="longUrl">Please enter your URL here</label>
          <br />
          <input
            type="text"
            id="longUrl"
            name="longUrl"
            value={this.state.url}
            onChange={this.handleChange}
            size="60"
            required
          />
          &nbsp;
          <button type="button" onClick={this.onGetShortUrlClick}>
            SHORTEN
          </button>
          <br />
          {this.state.shortUrl ? (
            <p>
              Here's your short URL! <br />
              <a href={`http://localhost:4000/${this.state.shortUrl}`}>
                http://localhost:4000/{this.state.shortUrl}
              </a>
            </p>
          ) : null}
        </main>
      </div>
    );
  }
}

export default URLShortner;
