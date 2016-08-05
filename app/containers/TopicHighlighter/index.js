import React, {Component} from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import ReactCSSTransitionsGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import * as articleActionCreators from 'actions/article';

const assembledActionCreators = Object.assign({}, articleActionCreators)

import Article from 'components/Article';
import TopicPicker from 'components/TopicPicker';

import { styles } from './styles.scss';

import $ from 'axios';

const mapStateToProps = state => {
  return {
    article: state.article.article,
    currentArticle: state.article.currentArticle,
    nextArticle: state.article.nextArticle,
    topics: state.article.topics,
    articles: state.article.articles,
    currentIndex: state.article.currentIndex
  };
}

@connect (
    mapStateToProps,
    dispatch => bindActionCreators(assembledActionCreators, dispatch)
)
export class TopicHighlighter extends Component {
  constructor(props) {
    super(props);
  }



  componentWillMount() {

    console.log('prepare props')
    /*var url_topics = 'http://192.168.99.100:5000/api/topics/';
    var url_articles = 'http://192.168.99.100:5000/api/articles/'
    var current_id = this.props.params.articleId
    var topics;
    var current;
    var articles;
    var article_index;
    var nextArticle;

    $.get(url_topics).then(function(data) {
      topics = data.data.results
    }).catch(function(error){
      console.log(error)
    })

    $.get(url_articles).then(function(data) {
      articles = data.data.results
    }).catch(function(error){
      console.log(error)
    })

    for (var i = 0; i < articles.length; i++) {
      if(articles[i].article_id == current_id) {
        current = articles[i]
        article_index = i
        nextArticle = articles[i+1]
      }
    }

    this.setState({
      article: current,
      topics: topics,
      currentArticle: current,
      nextArticle: nextArticle,
      articles: articles,
      currentIndex: article_index
    })
*/
  }

  prepareTopics() {
    console.log('prepare topics')
    var url_topics = 'http://192.168.99.100:5000/api/topics/';
    $.get(url_topics).then(function(data) {
      return data.data.results
    }).catch(function(error){
      console.log(error)
      return
    })
  }


  componentWillReceiveProps(nextProps) {
    /*console.log('receive')
    console.log(nextProps)
    if (this.props.currentArticle != nextProps.routeParams.articleId && !nextProps.article.isFetching){
      this.props.fetchArticle(nextProps.routeParams.articleId);
      console.log('fetch success')
    }*/
  }

  render() {

    let current_article = this.props.currentArticle;
    console.log('topic highlighter')
    console.log(this.props)

    let article = this.props.article;
    let topics = this.props.topics[current_article];

    console.log('topic highlighter')
    console.log(article)
    console.log(topics)
    console.log(this.props)


    if (this.props.nextArticle == undefined) {
      return (<div>DONE</div>) // TODO: Clean this up.
    }

    return (
      <ReactCSSTransitionsGroup transitionName='fadein'
                                transitionAppear
                                transitionAppearTimeout={500}
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>
        <div className='topic-picker-wrapper'>
          <TopicPicker {...this.props}/>
        </div>
        <div className='article-wrapper'>
            <ReactCSSTransitionsGroup transitionName='fade-between'
                                      transitionAppear
                                      transitionAppearTimeout={500}
                                      transitionEnterTimeout={500}
                                      transitionLeaveTimeout={500}>
            {<Article article={article} key={current_article}/>}
            </ReactCSSTransitionsGroup>
            <br/>
            <button><Link to={`/article/${this.props.nextArticle}`}>Next Article</Link></button>
        </div>
      </ReactCSSTransitionsGroup>
    );
  }
};
