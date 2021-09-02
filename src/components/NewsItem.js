import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;//declaring title and description
        return (
                <div className= "my-3">
                    <div className="card">
                        <img src={imageUrl?imageUrl:"https://cdn.kalingatv.com/wp-content/uploads/2021/06/Windows-11.jpg"} alt="defaultImg"/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            {/* here we recive title and description values in News.js */}
                            <p className="card-text">{description}</p>
                            <a rel="noreferrer" href={newsUrl} target= '_blank' className="btn btn-sm btn-dark">Read More</a>
                        </div>
                    </div>   
            </div>
        )
    }
}

export default NewsItem
