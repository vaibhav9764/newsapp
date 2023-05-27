import React from 'react'

const NewsItem =(props) =>{

        let { title, description, imgurl, newsurl, author, date, source } = props;
        return (
            <>
                <div className="card my-3" >
                    <div className="container">
                        <span className=" badge rounded-pill bg-danger" style={{
                            display: 'flex',
                            justifyContent: 'end',
                            position: 'absolute',
                            right: '0'
                        }}>{source}
                        </span>
                    </div>
                    <img src={imgurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className=" text-danger">by {author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsurl} target="_blank" className="btn btn-dark btn-sm btn-primary " >Read More</a>

                    </div>

                </div>

            </>
        )
    
}

export default NewsItem
