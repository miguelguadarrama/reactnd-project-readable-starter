import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Api from '../utils/api'
import { SetCategories } from '../actions'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    componentDidMount() {
        Api.getCategories()
            .then(data => this.props.setCategories(data))
    }
    render() {
        const { categories, current } = this.props;
        return (
            <nav className="navbar">
                <ul className="list">
                    <li>CATEGORIES</li>
                    <li><Link className={current === '' ? 'active':''} to="/">ALL</Link></li>
                    {categories && categories.map(c => (
                        <li key={c.name}><Link className={current === c.name ? 'active':''} to={`/${c.path}`}>{c.name}</Link></li>
                    ))}
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = ({ categories }) => {
    //console.log(categories)
    return {
        categories: categories.categories,
        current: categories.current
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
)(Navbar)