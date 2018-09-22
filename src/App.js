import React, { Component } from 'react';
// Components
import ImageCard from './components/click-image.js';

// Images
import * as Images from './components/images/index';

// CSS
import { Grid, Container, Progress, Header } from 'semantic-ui-react';

let imgArray = [];

imgArray = Object.keys(Images).map((key, index) => {
  return Images[key]
})

shuffleArray(imgArray)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
}

class App extends Component {

  state = {
    images: imgArray,
    guesses: [],
    score: 0,
    hasPlayed: false
  }

  handleClick = (src) => {
    shuffleArray(imgArray);
    let isInArray = this.state.guesses.includes(src);
    let newGuesses = this.state.guesses.concat(src)

    if (isInArray) {
      this.setState({
        guesses: [],
        score: 0,
        hasPlayed: true
      })
      console.log('try again', this.state);
    } else {
      this.setState({
        images: imgArray,
        guesses: newGuesses,
        score: this.state.guesses.length + 1,
        hasPlayed: true
      })
    }

    console.log(this.state.guesses);
  }

  render() {
    const playerHasPlayed = this.state.hasPlayed;
    const score = this.state.score;

    let header;
    if (!playerHasPlayed) {
      header = <Header as='h3'>Click any bird to start. Click all twelve birds once to win.</Header>
    } else if (playerHasPlayed && score === 0) {
      header = <Header as='h3'>Click to try again</Header>
    } else if (score === 9) {
      header = <Header as='h3'>You're almost there</Header>

    }


    return (
      <div className="App">
        <Container>
          <br />
          <Progress size='large' value={this.state.score} total={12} progress={'ratio'}>Number Correct</Progress>
          <Grid >
            <Grid.Row>
              <Grid.Column>
                {header}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {this.state.images.map((image, index) => (
                <Grid.Column width='4' >
                  <ImageCard imagesrc={image} key={index} clickProp={this.handleClick.bind(null, image)} />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Container>

      </div>
    );
  }
}

export default App;

/* turn the object into an array
on click:
    randomize array

    if state doesn't contain clicked picture's source
        setState "picture source": "picture source", numberCorrect: numberCorrect++

    if state contains clicked picture's source:
        setState to empty, numberCorrect: 0
 */

