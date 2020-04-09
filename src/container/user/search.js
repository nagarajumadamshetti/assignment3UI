import React,{Component} from 'react';
import {Container} from 'reactstrap';
import { connect } from "react-redux";
class Search extends Component{
    componentDidMount() {
        
    }
    componentDidUpdate(prevProps, prevState) {
        
    }
    render(){
        return(
            <div>
                <h1>search page</h1>
                <Container >
                    <h1>{this.props.match.params.id}</h1>
                </Container>
            </div>
        );
    }
}

export default Search;