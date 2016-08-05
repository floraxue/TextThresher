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

  componentWillMount() {
    console.log('will mount highlight wrapper')
    this.prepareTopics()
    this.prepareArticles()
  },

  prepareTopics: function(this) {
    console.log('prepare topics')
    var url_topics = 'http://192.168.99.100:5000/api/topics/';
    $.get(url_topics).then(function(data) {
      console.log(data)
      this.setState({
        topics: data.data.results
      })
    }).catch(function(error){
      console.log(error)
      return
    })
  },

  prepareArticles: function(this) {
    console.log('prepare articles')
    var url_articles = 'http://192.168.99.100:5000/api/articles/';
    $.get(url_articles).then(function(data) {
      console.log(data)
      this.setState({
        articles: data.data.results
      })
    }).catch(function(error){
      console.log(error)
      return
    })
  },
  render() {
    console.log('render topic highlighter')
    console.log(this.props)
    /*article={current}
    currentArticle={current}
    nextArticle={current}
    topics={topics}*/

    return (
      <TopicHighlighter/>
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
      <IndexRoute component={Home}/>
      <Route path='article/:articleId' component={TopicHighlighterWrapper}/>
      <Route path='quiz' component={Quiz}/>
      <Route path='test/:articleId' component={TopicHighlighterWrapper}/>
    </Route>
  </Router>
);

render(
  routes,
  document.getElementById('react-root')
  );
