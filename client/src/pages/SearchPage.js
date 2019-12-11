import React from "react";
import apiUrl from "../fetchAPI";
import { ItemList } from "../components/Items";

export class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.fetchSearchedItems = this.fetchSearchedItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    componentDidMount() {
        this.fetchSearchedItems();
        this.fetchSearchedItems();
    }
    fetchSearchedItems(searchQuery) {
        fetch(apiUrl + `/search/${searchQuery}`, {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {this.setState({ items: data })
            .then()
    })
            .catch(error => console.log(error));
            
    }
   
    render() {
        return (<>
            <div className="level">
                <div className="level-item">
                    <p className="title">Search</p>
                </div>
            </div>
            <div className="field is-grouped">
                <div className="field">
                    <label className="label">Search</label>
                    <div className="control">
                        <input className="input"
                            type="text" name="searchQuery" 
                            placeholder="Search by Category or Keyword" 
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="control">
                        <label className="label">&nbsp;</label>
                        <button className="button is-primary" onClick={this.fetchSearchedItems}>
                            Search
              </button>
                    </div>
                </div>
            </div>

        </>
        );
    }
}

export default SearchPage;