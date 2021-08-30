import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl} = this.props;//declaring title and description
        return (
                <div className= "my-3">
                    <div className="card" style={{width: "18rem"}}>
                        <img src={imageUrl}/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            {/* here we recive title and description values in News.js */}
                            <p className="card-text">{description}</p>
                            <a href="/newsDetail" className="btn btn-sm btn-primary">Read More</a>
                        </div>
                    </div>   
            </div>
        )
    }
}

export default NewsItem
