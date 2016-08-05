
export function fetchArticle(articleId) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_ARTICLE', articleId});
    //response = urlopen('http://localhost:5000/api/articles/')
    //check = json.load(response)
    //console.log('dispatch article.js')
    //console.log(check)

    //var xhr = new XMLHttpRequest();
    //xhr.open('GET', 'http://localhost:5000/api/articles/');
    //console.log(xhr)


    //console.log(articleId)
    return fetch(`http://localhost:5000/api/articles/${articleId}/?format=json`) // TODO: resolve this absolute URL issue with backend
      .then(response => response.json())
      .then(
        (response) => dispatch({ type: 'FETCH_ARTICLE_SUCCESS', response}),
        (error) => dispatch({ type: 'FETCH_ARTICLE_FAIL', error})
      );

    /*return fetch('http://localhost:5000/api/articles/') // TODO: resolve this absolute URL issue with backend
      .then(response => response.json())
      .then(
        (response) => dispatch({ type: 'FETCH_ARTICLE_SUCCESS', response}),
        (error) => dispatch({ type: 'FETCH_ARTICLE_FAIL', error})
    );*/
  };
}

export function fetchTopic(topicId) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_TOPIC'});

    return fetch(`http://localhost:5000/api/topics/${topicId}/?format=json`) // TODO: resolve this absolute URL issue with backend
      .then(response => response.json())
      .then(
        (response) => dispatch({ type: 'FETCH_TOPIC_SUCCESS', response}),
        (error) => dispatch({ type: 'FETCH_TOPIC_FAIL', error})
      );
  };
}

export function getArticle(articleId) {
  return {
    type: 'GET_ARTICLE',
    articleId
  };
}

export function addHighlight(start, end, selectedText) {
  return {
    type: 'ADD_HIGHLIGHT',
    selection: {start, end, selectedText}
  };
}

export function activateTopic(topicId) {
  return {
    type: 'ACTIVATE_TOPIC',
    topicId
  }
}
