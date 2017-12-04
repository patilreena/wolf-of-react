import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo';
import { loadQuoteForStock, loadCompanyLogoForStock } from './api/iex';

class App extends Component {
  state = {
    symbol: 'F',
    quote: null
  };

  componentDidMount() {
    this.loadQuote();
  }

  loadQuote() {
    loadQuoteForStock(this.state.symbol)
      .then(quote => {
        console.log(quote);
        this.setState({ quote: quote });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSymbolChange = event => {
    const target = event.target;
    const symbol = target.value;
    this.setState({ symbol: symbol });
    console.log(event);
  };

  handleButtonClick = event => {
    console.log(event.target);
    this.loadQuote();
  };

  render() {
    return (
      <div className="App">
        <h1>Wolf of React</h1>
        <input
          value={this.state.symbol}
          placeholder="Enter symbol"
          onChange={this.handleSymbolChange}
        />
        <button onClick={this.handleButtonClick}>Get Quote</button>
        <StockInfo {...this.state.quote} />
      </div>
    );
  }
}

export default App;
