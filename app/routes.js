/*import React from 'react';
import { Route } from 'react-router';

import App from 'containers/App';
import { TopicHighlighter } from 'containers/TopicHighlighter';

import Quiz from 'components/quiz/Quiz';

var AppWrapper = React.createClass({
  render: function () {
    console.log('app wrapper')
    return (
        <App/>
    );
  }
});

var QuizWrapper = React.createClass({
  render: function () {
    console.log('quiz wrapper')
    return (
        <Quiz/>
    );
  }
});

var TopicHighlighterWrapper = React.createClass({

  prepareArticle: function() {
    console.log(this.props)
    var xml = new XMLHttpRequest();
    var url = 'http://localhost:5000/api/articles/';
    xml.open("GET", url, true);
    console.log(xml)
    console.log('router')
  },

  prepareCurrentArticle: function() {

  },
  prepareNextArticle: function() {

  },
  prepareTopics: function() {

  },

  /* props include:
  article: state.article.article,
  currentArticle: state.article.currentArticle,
  nextArticle: state.article.nextArticle,
  topics: state.article.topics
  */
  /*render: function () {
    console.log('router')
    console.log(this.props)
    return (
        <TopicHighlighter
        article={prepareArticle()}
        currentArticle={prepareCurrentArticle()}
        nextArticle={prepareNextArticle()}
        topics={prepareTopics()}
        />
    );
  }
});

export default (
  <Route path='/' handler={AppWrapper}>
    <Route path='article/:articleId' handler={TopicHighlighterWrapper} />
    <Route path='quiz' handler={QuizWrapper} />
  </Route>
);
// <Route path='article/:articleId' component={TopicHighlighter} />
