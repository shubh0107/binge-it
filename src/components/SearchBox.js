import React, { Component } from 'react';
import './SearchBox.css';
import _ from 'lodash';
import { Grid, Segment, Header, Search, Icon, Image, Card, Item } from 'semantic-ui-react';
import Autosuggest from 'react-autosuggest';


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    return new Promise((resolve, reject) => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=35d49dd4efba057a21e0e377c33350d3&query=${value}`
        fetch(url).then(res => res.json()).then(data => {
            console.log('data: ', data.results);
            resolve(data.results.slice(0, 8));
        })
            .catch(err => {
                console.log('Error: ', err);
                reject(err);
            })
    })
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.title;

function renderSuggestionsContainer({ containerProps, children, query }) {
    return (
        <div {...containerProps}>
            {/* <Item.Group> */}
            {children}
            {/* </Item.Group> */}
        </div>
    );
}

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => {
    console.log('suggestion in render: ', suggestion);
    return (
        // <div className="d-flex flex-row justify-content">
        //     {suggestion.title}
        //     <img src={"https://image.tmdb.org/t/p/w200" + suggestion.poster_path} />
        // </div>

        <Item>
            {/* <Item.Image size='tiny' src={'https://image.tmdb.org/t/p/original' + suggestion.poster_path} /> */}
            <Item.Content verticalAlign='middle'>
                <Item.Header as='a'>{suggestion.title}</Item.Header>
            </Item.Content>
        </Item>

    );
}




class SearchBox extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            movieDetails: null
        };
    }

    onChange = (event, { newValue }) => {
        console.log('new value: ', newValue);
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        getSuggestions(value).then(result => {
            // console.log('result from api: ', result);
            this.setState({
                suggestions: result
                // suggestions: getSuggestions(value)
            });
        }).catch(err => {
            console.log('error while getting results ', err);
        })
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        console.log('SUGGESTION IN SELECTED: ', suggestion);
        const url = `https://api.themoviedb.org/3/movie/${suggestion.id}?api_key=35d49dd4efba057a21e0e377c33350d3`;
        fetch(url).then(res => res.json()).then(data => {
            console.log('MOVIE DATA: ', data);
            this.setState({
                movieDetails: data
            });
            this.props.changeBackgroundImage('https://image.tmdb.org/t/p/original' + this.state.movieDetails.backdrop_path)
        })
    }

    render() {
        const { value, suggestions, movieDetails } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Search..',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <Grid divided="vertically">
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestionsContainer={renderSuggestionsContainer}
                            renderSuggestion={renderSuggestion}
                            onSuggestionSelected={this.onSuggestionSelected}
                            inputProps={inputProps}
                        />

                    </Grid.Column>
                    <Grid.Column width={10}>
                        {movieDetails ?
                            // <div className="card-div">
                            //     <Card className="movie-card">
                            //         {/* <Image className="movieImage" src={'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path} ui={false} wrapped /> */}
                            //         <img className="poster" src={'https://image.tmdb.org/t/p/original' + movieDetails.poster_path} name="poster" title="poster" />
                            //         <Card.Content>
                            //             <Card.Header>{movieDetails.original_title}</Card.Header>
                            //             <Card.Meta>{movieDetails.release_date}</Card.Meta>
                            //             <Card.Description>
                            //                 {movieDetails.overview}
                            //             </Card.Description>
                            //         </Card.Content>
                            //     </Card>
                            // </div>

                            <div className="card movie-card">
                                <img className="card-img-top poster" src={'https://image.tmdb.org/t/p/w780' + movieDetails.poster_path} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {movieDetails.original_title}
                                    </h5>
                                    <p className="card-subtitle text-muted">
                                        {movieDetails.release_date}
                                    </p>
                                    <p className="card-text">
                                        {movieDetails.overview}
                                    </p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>


                            :

                            ''

                        }

                    </Grid.Column>

                </Grid.Row>
            </Grid>



        );
    }
}


export default SearchBox;
