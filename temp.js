import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 10,
        categroy: "genreal"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        categroy: PropTypes.string

    }


    constructor(props) {
        super(props);
        console.log("Hello I am constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }

        document.title = `NewsMonkey : ${this.props.categroy.charAt(0).toUpperCase() + this.props.categroy.slice(1)}`;
    }
    update = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categroy}&apiKey=09782042194c425ea2ece615a6832baf&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({
            loading: true

        })
        let data = await fetch(url);
        // console.log(data);
        let parsedata = await data.json();
        console.log(parsedata);
        this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults, loading: false })

    }
    async componentDidMount() {
        this.update();
    }

    handlePrevOnClick = async () => {
        // console.log("prev clicked");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categroy}&apiKey=09782042194c425ea2ece615a6832baf&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        // this.setState({
        //     loading:true

        // })
        // let data = await fetch(url);

        // // console.log(data);
        // let parsedata = await data.json();

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedata.articles,
        //     loading:false

        // })
        // this.setState({
        //     page: this.state.page - 1
        // })
        // this.update();


    }
    handleNextOnClick = async () => {



        // console.log("next clicked");


        // this.setState({
        //     page: this.state.page + 1
        // })
        // this.update();


    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categroy}&apiKey=09782042194c425ea2ece615a6832baf&page=${this.state.page}&pagesize=${this.props.pageSize}`;

      
        let data = await fetch(url);
        this.setState({loading:true})
        let parsedata = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedata.articles),
            totalResults: parsedata.totalResults,
            loading:false
        })

    }
    render() {

        console.log("render");
        return (
            <>

             
                    <h2 className='text-center my-3'>NewsMonkey - Top {this.props.categroy.charAt(0).toUpperCase() + this.props.categroy.slice(1)} Headline </h2>
                    {/* { this.state.loading && <Spinner /> } */}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                       
                        loader={<Spinner />}

                    >
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element) => {
                                    return <div key={element.url} className="col-md-4">
                                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 72) : ""} imgurl={element.urlToImage ? element.urlToImage : "https://i.cbc.ca/1.6842528.1683943993!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/1254312620.jpg"} newsurl={element.url ? element.url : ""} author={element.author ? element.author : "unknown"} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>

                        </div>


                    </InfiniteScroll>
                    {/* {this.state.loading&& <Spinner/>} */}




             
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" className="btn btn-dark my-2" disabled={this.state.page <= 1} onClick={this.handlePrevOnClick}>&larr;Prev</button>
                    <button type="button" className="btn btn-dark my-2" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextOnClick}>Next&rarr;</button>



                </div> */}
            </>
        )
    }
}

export default News
