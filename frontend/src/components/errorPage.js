import React from 'react'
import Header from './header'
import { Link } from 'react-router-dom'

const ErrorPage = (props) => {
    return (
        <div className="row">
            <Header title="Error 404" />
            <div className="col-xs-12">
                <div className="posts">
                    <h3>The page you are looking for was not found.</h3>
                    <p>
                        <Link to="/">
                            Return to home
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage