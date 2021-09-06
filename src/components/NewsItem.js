import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, date, source, bCol} = this.props;//declaring title and description
        return (
                <div className= "my-3">
                    <div className="card">
                        <img src={imageUrl?imageUrl:"https://cdn.kalingatv.com/wp-content/uploads/2021/06/Windows-11.jpg"} alt="defaultImg"/>
                        <div className="card-body">
                        <span className={`position-absolute top-0 translate-middle badge rounded-pill ${bCol}`} style={{zIndex: '1', left: '90%'}}>{source}</span>
                            <h5 className="card-title">{title}</h5>
                            {/* here we recive title and description values in News.js */}
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">By {author?author: "Unknown"} on {new Date(date).toGMTString()}</small></p>
                            <a rel="noreferrer" href={newsUrl} target= '_blank' className="btn btn-sm btn-dark">Read More</a>
                        </div>
                    </div>   
            </div>
        )
    }
}

export default NewsItem
