import{useEffect, useState} from 'react'
import { supabase } from './supabaseClient';
import logo from './logo.svg';
import './App.css';

function Library(){
  const[myGame, setMyGame] = useState([])
  async function getGames(){
    let { data: GameRecommendations, error } = await supabase
    .from('GameRecommendations')
    .select('*')
    setMyGame(GameRecommendations);
  }
  getGames();

  return(
    
    <div>
        {myGame.toReversed().map(game => (
          <div className="row justify-content-center">
          <div className="col-4 h1 gradeGreen rounded-pill display-1 my-4 w-75">
            <h1>{game.ranking}</h1>
            <h2>{game.title}</h2>
            <h3>{game.recommendation}</h3>
          </div>
          </div>
        ))
        }
    </div>
    
  );
}

function MyForm() {

  const [name, setName] = useState("");

  let nameResponses = ["That's an Awesome Answer", "Thank you for your feedback"];
  let selectedNameResponse = nameResponses[Math.floor(Math.random() * nameResponses.length)];

  const handleSubmit = (event) => {
    
    event.preventDefault();
    alert("Enter your favorite game here: " + name + ". " + selectedNameResponse);
  }

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      
      <h1 className="fs-3"><u>Before you go, while I talked about all of my games, what is your favorite game of all time.</u></h1>
      <label className="mb-5 mt-4 fs-4">Enter your favorite game here:
        <input className="inputDetail py-2"
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input className="pt-3 px-4 bg-dark text-white submitPadding" type="submit" />
    </form>
  )
}

function HonorableMentions(){
  const[myMentions, setMyMentions] = useState([])
  async function getMentions(){
    let { data: HonorableMentions, error } = await supabase
    .from('HonorableMentions')
    .select('*')
    setMyMentions(HonorableMentions);
  }
  getMentions();

  return(
    
    <div>
        {myMentions.map(mentions => (
          <div className="row justify-content-center">
          <div className="col-4 h1 gradePink rounded-4 display-1 my-3 w-50">
            <h3>{mentions.videoGames}</h3>
            <h5>{mentions.gameDescriptions}</h5>
          </div>
          </div>
        ))
        }
    </div>
    
  );
}

function App() {

  return (
    <div className="App bg-dark text-white">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" integrity="sha256-2TnSHycBDAm2wpZmgdi0z81kykGPJAkiUY+Wf97RbvY=" crossorigin="anonymous"></link>

    <header className="App-header">
      <h1 class="border-5 headerSizing w-75 btn-gradient-2">
        My Top 10 Game's of all time:
      </h1>

      <h2 className="w-50 btn-gradient-3 p-4 mt-3 fs-2">
        This site exists as a sort of game recommendation system. This works as a catalouge to games that have been a strong
        foundation towards me and were important throughout my entire life.
      </h2>
    </header>

  <Library/>

  <h1 className="my-5 headerSizing">Honorable Mentions:</h1>

  <HonorableMentions/>

  <MyForm/>
</div>
  );
}

export default App;
