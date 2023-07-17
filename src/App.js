import { Component } from 'react';
import CardList from './components/card_list/CardList'
import SearchBox from './components/search_box/SearchBox';
import './App2.css';

class App extends Component {

  constructor() {
    super()

    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => this.setState(() => {
        return {
          monsters: users
        }
      },
      () => {
        console.log(this.state.monsters)
      }))
      .catch(error => console.log(error))
  }

  onSearchField = e => {
    const searchField = e.target.value.toLocaleLowerCase()
    
    this.setState(() => {
      return { searchField }
    })
  }

  render() {

    const { monsters, searchField } = this.state
    const { onSearchField } = this

    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox onHandleChange={onSearchField} placeholder="Search Box" />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }

}

export default App;
