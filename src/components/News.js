import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

import PropTypes from 'prop-types'

const News =(props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
  
    



    const update = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.categroy}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true);
        
        let data = await fetch(url);
        props.setProgress(30);

        // console.log(data);
        let parsedata = await data.json();
        props.setProgress(60);

       
     
        setArticles(parsedata.articles);
        setTotalResults(parsedata.totalResults);
        setLoading(false);
        props.setProgress(100);

    }
    useEffect(()=>{
        update();
        document.title = `NewsMonkey : ${props.categroy.charAt(0).toUpperCase() + props.categroy.slice(1)}`;
    },[]);


    const handlePrevOnClick = async () => {
        // console.log("prev clicked");
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.categroy}&apiKey=${props.apiKey}&page=${page - 1}&pagesize=${props.pageSize}`;
        // .setState({
        //     loading:true

        // })
        // let data = await fetch(url);

        // // console.log(data);
        // let parsedata = await data.json();

        // .setState({
        //     page: page - 1,
        //     articles: parsedata.articles,
        //     loading:false

        // })
        // .setState({
        //     page: page - 1
        // })
        // .update();


    }
    const handleNextOnClick = async () => {



        // console.log("next clicked");


        // .setState({
        //     page: page + 1
        // })
        // .update();


    }
    const fetchMoreData = async () => {
      
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.categroy}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
        setPage( page + 1 )


        let data = await fetch(url);
    
        // setLoading(true);
        let parsedata = await data.json();

        
        setArticles(articles.concat(parsedata.articles));
        setTotalResults(parsedata.totalResults);
        // setLoading(false);

    };
 

        return (
            <>


                <div className="container" style={{marginTop:"80px"}}><h2 className='text-center my-3'>NewsMonkey - Top {props.categroy.charAt(0).toUpperCase() + props.categroy.slice(1)} Headline </h2> </div>
                {/* {loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={articles.length}

                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}

                    loader={<Spinner />}


                >

                    <div className="container">


                        <div className="row">
                            {articles.map((element) => {
                                return <div key={element.url} className="col-md-4">
                                   

                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 72) : ""} imgurl={element.urlToImage ? element.urlToImage : "https://i.cbc.ca/1.6842528.1683943993!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/1254312620.jpg"} newsurl={element.url ? element.url : ""} author={element.author ? element.author : "unknown"} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>

                    </div>
                    {/* {loading&& <Spinner/>} */}


                </InfiniteScroll>






                {/* <div className="container d-flex justify-content-between">
                    <button type="button" className="btn btn-dark my-2" disabled={page <= 1} onClick={handlePrevOnClick}>&larr;Prev</button>
                    <button type="button" className="btn btn-dark my-2" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} onClick={.handleNextOnClick}>Next&rarr;</button>



                </div> */}
            </>
        )
    
}

News.defaultProps = {
    country: "in",
    pageSize: 10,
    categroy: "genreal"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    categroy: PropTypes.string

}

export default News


