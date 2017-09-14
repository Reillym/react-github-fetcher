import React, { Component } from "react";
// import logo from "../assets/logo.svg";
import axios from "axios";

// CARD Component
const Card = props => {
  return (
    <div style={{ display: "flex", flex: 1, justifyContent: 'flex-start', margin: 20 }}>
      <img height="125" width="125" src={props.avatar_url} alt="Avatar" />
      <div style={{ marginLeft: 10 }}>
        <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
          {props.name}
        </div>
        <div>{props.company}</div>
        <div>{props.location}</div>
        <div>
          <a href={props.html_url || "#"} target="_blank">
            {props.html_url}
          </a>
        </div>
      </div>
    </div>
  );
};

const CardList = props => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.userName}`)
      .then(response => this.props.addCard(response.data));
    this.setState({ userName: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            style={{ padding: 7, margin: 10, fontSize: "1.1em" }}
            type="text"
            value={this.state.userName}
            onChange={e => this.setState({ userName: e.target.value })}
            placeholder="Github Username"
            required
          />
          <button
            style={{ padding: 8, border: "1px solid #06D6A0", fontSize: "1.1em", backgroundColor: '#9BC53D', color: '#FFF'}}
            type="submit"
          >
            Add Card
          </button>
        </form>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          login: "getify",
          id: 150330,
          avatar_url: "https://avatars1.githubusercontent.com/u/150330?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/getify",
          html_url: "https://github.com/getify",
          followers_url: "https://api.github.com/users/getify/followers",
          following_url:
            "https://api.github.com/users/getify/following{/other_user}",
          gists_url: "https://api.github.com/users/getify/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/getify/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/getify/subscriptions",
          organizations_url: "https://api.github.com/users/getify/orgs",
          repos_url: "https://api.github.com/users/getify/repos",
          events_url: "https://api.github.com/users/getify/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/getify/received_events",
          type: "User",
          site_admin: false,
          name: "Kyle Simpson",
          company: "Getify Solutions",
          blog: "",
          location: "Austin, TX",
          email: null,
          hireable: true,
          bio:
            "I teach JavaScript and I'd love to come help your team's developers. If that's interesting to you, please reach out to me getify@gmail.com.",
          public_repos: 44,
          public_gists: 327,
          followers: 10135,
          following: 1,
          created_at: "2009-11-08T06:56:21Z",
          updated_at: "2017-08-29T21:45:47Z"
        }
      ]
    };
  }

  addCard = card => {
    this.setState({
      cards: [...this.state.cards, card]
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25
        }}
      >
        <Form addCard={this.addCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

export default App;
