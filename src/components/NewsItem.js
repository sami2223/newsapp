import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div>
                <div className="card my-3">
                    <div className="" style={{ display: 'flex', justifyContent: 'flex-end', position:'absolute', right:0}}>
                    <span className='badge rounded-pill bg-danger'>
                        {source}
                    </span>
                    </div>
                    <img src={!imageUrl ? "https://images.axios.com/JAEh3PDz7FdaqE6NP73BmqvhyP4=/0x0:1920x1080/1366x768/2022/06/07/1654639823063.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem 
