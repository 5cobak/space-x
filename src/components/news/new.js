import News from './News';
import newsState from './news-state';

const newsRoot = document.querySelector('.news-root');

const newsArray = [];
newsState.map((news, index) => newsArray.push(new News(news, index).newsElement));

newsRoot.insertAdjacentHTML('beforeend', newsArray);
