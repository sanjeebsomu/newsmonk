import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News =(props)=>{

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState([true])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //Here we put the link of our API
  const updateNews = async ()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; //api url, i add page and page size later
    setLoading(true)
    let data = await fetch(url); //using fetch api
    props.setProgress(50);
    let parsedData = await data.json(); //converting
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonk`;

  }, [])
  const fetchMoreData = async () => {//code taken from codesandbox.com
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`; //in this url we have increament page with 1, then setPage(page+1) because setpage is an asynchronous function so its take some time to run.
    setPage(page+1)
    let data = await fetch(url); //using fetch api
    let parsedData = await data.json(); //converting
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)  
    setLoading(false)
  };
    return (
      <>
          <h1 className="text-center" style={{ margin: "35px", paddingTop: "70px"}}>
            NewsMonk - Top {capitalizeFirstLetter(props.category)} Headlines
          </h1>
          {loading && <Spinner />}
          <InfiniteScroll
          dataLength={articles.length} next={fetchMoreData} hasMore={articles.length!==totalResults}>
          <div className="container">

          <div className="row">
            
            {articles.map((element) => {
                  return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title ? element.title: ""} description={element.description ? element.description: ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} bCol={"bg-danger"}
                    />
                    {/* 
                     if you want to slice the text then we have to use the slice functionality
                     ?element.description.slice(0, 77):" "
                     ?element.title.slice(0, 55):" "
                     */}
                  </div>
              })}
          </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  title: "No Title Available",
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
