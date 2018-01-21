import React, { Component } from 'react'
import { connect } from 'react-redux'
//import * as Api from '../utils/api'
import { fetchCategories } from '../actions/categories'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    componentDidMount() {
        this.props.getCategories()
    }
    render() {
        const { categories, current } = this.props;
        return (
            <nav className="navbar">
                <ul className="list">
                    <li>CATEGORIES</li>
                    <li><Link className={current === '' ? 'active':''} to="/">ALL</Link></li>
                    {categories && categories.map(c => {
                        const { name, path } = c;
                        return (
                            <li key={name}>
                                <Link className={current === name ? 'active':''} to={`/${path}`}>
                                    {name}
                                </Link>
                            </li>
                        )
                    })}
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
        getCategories: () => fetchCategories()(dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar)