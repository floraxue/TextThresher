import React from 'react';
import { render} from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from 'containers/App';
import TopicHighlighter from 'containers/TopicHighlighter';
import Quiz from 'components/quiz/Quiz';

import $ from 'axios';
/*import routes from 'routes';*/

/*render(
  <Router
    history={ hashHistory }
    routes={ Routes } />,
  document.getElementById('react-root')
);*/

/*ReactRouter.run(Routes, function (Handler) {
  React.render(<Handler/>, document.body);
});*/


var QuizWrapper = React.createClass({
  render() {
    console.log('quiz wrapper')
    return (
      <div>
        DA QUIZ
        <Quiz/>
      </div>
    )
  }
})//<Quiz/>

var RouteWrapper = React.createClass({
  render(){
    console.log('route wrapper');
    console.log(this.propsx)
    return (
      <div>
        DA ROUTER
        //{this.propos.children}
      </div>
    )
  }
})

var AppWrapper = React.createClass({
  displayName: 'AppWrapper',
  render() {
    console.log('app wrapper')
    console.log(this.props)
    return (
      <App>
      {this.props.children}
      </App>
    );
  }
})

var Home = React.createClass({
  displayName: 'Home',
  render() {
    console.log('home')
    console.log(this.props)
    return (
      <div>
      Daaaa Home
      </div>
    )
  }
})

var TopicHighlighterWrapper = React.createClass({

  prepareCurrent: function() {
    var id = this.props.params.articleId
    var urlArticle = 'http://192.168.99.100:5000/api/articles/';
    $.get(urlArticle).then(function(data) {
      console.log('prepare current')
      console.log(data.data)
      return data.data;
    }).catch(function(error){
      console.log(error)
    })
  },

  prepareArticles: function() {
    console.log('prepare articles')
    var id = this.props.params.articleId
    var urlArticle = 'http://192.168.99.100:5000/api/articles/';
    $.get(urlArticle).then(function(data) {
      var results = data.data.results
      var length = results.length
      for (var i = 0; 0 < length; i++) {
        if (results[i].article_id == id) {
          var current = results[i];
          var next = null;
          var last = results.length - 1
          if (i == last) {
            return [current, next]
          } else {
            return [current, results[i+1]]
          }
        }
      }
    }).catch(function(error){
      console.log(error)
      return
    })
  },
  prepareTopics: function() {
    console.log('prepare topics')
    var url_topics = 'http://192.168.99.100:5000/api/topics/';
    $.get(url_topics).then(function(data) {
      return data.data.results
    }).catch(function(error){
      console.log(error)
      return
    })
  },
  render() {
    var current = this.prepareCurrent();
    var topics = this.prepareTopics();

    while (!current) {
      return (
        <div>
        Loading
        </div>
      )
    }


    return (
      <TopicHighlighter
      article={current}
      currentArticle={current}
      nextArticle={current}
      topics={topics}
      />
    );
  }
})


/*
Reference:
https://github.com/reactjs/react-router
http://stackoverflow.com/questions/27864720/react-router-pass-props-to-handler-component
*/

let elem = document.createElement('div');
elem.id = ('react-root');
document.body.appendChild(elem);

const routes = (
  <Router history={ hashHistory } component={ RouteWrapper }>
    <Route path='/' component={AppWrapper}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path='article/:articleId' component={TopicHighlighterWrapper} ></Route>
      <Route path='quiz' component={QuizWrapper} ></Route>
    </Route>
  </Router>
);

render(
  routes,
  document.getElementById('react-root')
  );
