import React, { Component } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';

// components
import SearchBox from './components/SearchBox';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundImg: null,
        }

        // this.changeBackgroundImage.bind(this);
    }

    changeBackgroundImage = (newImage) => {
        this.setState({
            backgroundImg: newImage,
        })
    }


    render() {
        var divStyle = {
            backgroundImage: this.state.backgroundImg ? `url(${this.state.backgroundImg})` : `linear-gradient(black, white)`,
            // backgroundSize: 'contain',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
        return (
            <div className="App" style={divStyle}>
                {/* <Container> */}
                < div className="p-4" >
                    <SearchBox changeBackgroundImage={this.changeBackgroundImage} />
                </div>

                {/* </Container> */}
            </div >
        );
    }

}

export default App;
// handleSearchChange = (e, { value }) => {
//     if (value) {
//         if (this.state.results.length === 0) {
//             this.setState({
//                 isLoading: true
//             })
//         }
//         this.setState({ value, results: [] })
//         const url = `https://api.themoviedb.org/3/search/movie?api_key=35d49dd4efba057a21e0e377c33350d3&query=${value}`
//         fetch(url).then(res => res.json()).then(data => {
//             console.log('data: ', data);
//             this.setState({
//                 isLoading: false,
//                 results: data.results
//             }, console.log('CURRENT STATE: ', this.state.results));
//         }).catch(err => {
//             console.log('Error: ', err);
//         })
//     }
// }

// getMovieDetails = (movieId) => {
//     console.log('movie id: ', movieId);
//     const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=35d49dd4efba057a21e0e377c33350d3`;
//     fetch(url).then(res => res.json()).then(data => {
//         console.log('MOVIE DATA: ', data);
//         this.setState({
//             movieData: data
//         });
//     })