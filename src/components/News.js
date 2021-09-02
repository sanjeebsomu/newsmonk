import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: "general"
      }
      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
      }
    constructor(){
        super();
        console.log("I am an constructor from News Component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
            
        }
    }
//Here we put the link of our API
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0cf03c8831e94969908e47f04d50b587&page=1&pageSize=${this.props.pageSize}`;//api url, i add page and page size later
        let data = await fetch(url);//using fetch api
        let parsedData = await data.json()//converting
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})//assigning the value of article to parsed data
        console.log(parsedData);
    }

    handleNextClick = async ()=>{
        console.log("next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {//this logic it not necessery because we have disabled the button
            this.setState({loading: true})
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0cf03c8831e94969908e47f04d50b587&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;//api url, this page size term we get from this api documentation
            let data = await fetch(url);//using fetch api
            let parsedData = await data.json()//converting
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }

    }
    handlePrevClick = async ()=>{
        console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0cf03c8831e94969908e47f04d50b587&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;//api url
        this.setState({loading: true})
        let data = await fetch(url);//using fetch api
        let parsedData = await data.json()//converting
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })   
    }

    render() {
        return (
            <div>
                <div className="container my-3 ">
                <h1 className="text-center" style={{margin:'35px'}}>NewsMonk Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                        <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4" key = {element.url} >
                     <NewsItem title = {element.title} description = {element.description} imageUrl = {element.urlToImage} newsUrl = {element.url}/>
                     {/* 
                     if you want to slice the text then we have to use the slice functionality
                     ?element.description.slice(0, 77):" "
                     ?element.title.slice(0, 55):" "
                     */}
                     </div>
                })}
                </div>
                </div>
                <div className="container  d-flex justify-content-between">
                <button type="button" disabled = {this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button type="button" disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
