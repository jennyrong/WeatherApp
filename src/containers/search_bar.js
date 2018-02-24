import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component{
    constructor(props) {
        super(props);

        this.state = { term: '' };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value});
    }

    onFormSubmit(event) {
        event.preventDefault();

        this.props.fetchWeather(this.state.term);
        this.setState({ term: ''});
    }
    
    render() {
        //const {  weather } = this.props;
        let message = "";
        if (this.props.weather[0] !=null){
            message = "you got it!";
        }
        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
               <input 
                  placeholder="Get a five-day forecast in your favorite cities"
                  className="form-control"
                  value={this.state.term}
                  onChange={this.onInputChange} />
               <span className="input-group-btn">
                 <button type="submit" className="btn btn-secondary">Submit</button>
               </span> 
               <div> 
                  {message}
               </div>
            </form>   
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeather }, dispatch);
}

function mapStateToProps({ weather }) {
    return { weather }; // { weather } === { weather: weather }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);