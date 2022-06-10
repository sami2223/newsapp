import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    // static defaultProps = {
    //     country: 'us',
    //     pageSize: 9,
    //     category: 'general',
    // }
    // static propTypes = {
    //     country:  PropTypes.string,
    //     category:  PropTypes.string,
    //     pageSize: PropTypes.number
    // }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        // console.log("Constructor from news component");
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            totalResults: 0,
        }
        document.title = `NewsApp - ${this.capitalizeFirstLetter(this.props.category)}`
    }
    async componentDidMount() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(60);
        // console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    fetchMoreData = async () => {
        // this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            page: this.state.page + 1 
        });

    }

    // handleNextClick = async () => {
    //     console.log("Next");
    //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}
    //         &pageSize=${this.props.pageSize}`;
    //         this.setState({ loading: true });
    //         let data = await fetch(url);
    //         let parsedData = await data.json();
    //         console.log(parsedData);
    //         this.setState({
    //             articles: parsedData.articles,
    //             page: this.state.page + 1,
    //             loading: false
    //         })
    //     }
    // }

    // handlePrevClick = async () => {
    //     console.log("Prev");
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}
    //         &pageSize=${this.props.pageSize}`;
    //     this.setState({
    //         loading: true
    //     });
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //         articles: parsedData.articles,
    //         page: this.state.page - 1,
    //         loading: false
    //     })
    // }


    render() {
        return (
            <>
                <h3 className='text-center' style={{ margin: "40px 0px" }}>News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h3>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        {/* <h2>{this.state.page}</h2> */}
                        <div className="row">
                            {
                                // !this.state.loading && 
                                this.state.articles.map((element) => {
                                    return <div key={element.url} className="col-md-4">
                                        <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                                            description={element.description ? element.description.slice(0, 88) : ""}
                                            imageUrl={element.urlToImage} newsUrl={element.url} author={element.author}
                                            date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })
                            }

                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </>
        )
    }
}

export default News