import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SortBy } from '../actions'

class Header extends Component {
    render() {
        const { title, sortBy, Sort, sorting } = this.props;
        return (
            <header>
                <h1>{title}</h1>
                {(!sorting && sorting !== false) && (
                    <div className="options">
                        <span>Sort by</span>
                        <ul className="list-inline">
                            <li><a onClick={() => Sort('date')} className={sortBy === 'date' ? 'active' : ''}>Date</a></li>
                            <li><a onClick={() => Sort('score')} className={sortBy === 'score' ? 'active' : ''}>Score</a></li>
                        </ul>
                    </div>
                )}
            </header>
        )
    }
}

const mapStateToProps = ({ postData }) => {
    return {
        sortBy: postData.sortBy
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Sort: (sort) => dispatch(SortBy(sort))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)