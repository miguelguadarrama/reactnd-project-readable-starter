import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Api from '../utils/api'
import { SetCategories } from '../actions'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    componentDidMount() {
        //Api.getCategories()
            //.then(data => this.props.setCategories(data))
    }
    render() {
        const { categories } = this.props;
        return (
            <div className="sidebar">
                <h2>Categories</h2>
                <ul className="categories list">
                    {categories && categories.map(c => (
                        <li key={c.name}><Link to={`/category/${c.path}`}>{c.name}</Link></li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ categories }) => {
    //console.log(categories)
    return {
        categories: categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCategories: (data) => dispatch(SetCategories(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)