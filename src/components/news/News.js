class News {
  constructor(news, index) {
    this.index = index;
    this.news = news;
    this.newsElement = this.createNews();
  }

  scrollHandler() {}

  createNews() {
    return `<a href='/mock-address' class="news">
    <div class="news__img-wrapper">
      <img class="news__img" src="${this.news.imgSrc}" alt="some image" />
    </div>
    <section class="news__text-wrapper">
      <span class="news__mission">${this.news.name} ${this.index + 1}</span>
      <h2 class="news__mission-title">${this.news.title}</h2>
      <div class="news__description">
        <p>
          ${this.news.description}
        </p>
      </div>
      <div class="news__data">
        <div class="news__data-item">
          <svg class="news__icon">
            <use xlink:href="#calendar"></use>
          </svg>
          <span class="news__data-text news__date">${this.news.date}</span>
        </div>
        <div class="news__data-item news__time">
          <svg class="news__icon">
            <use xlink:href="#time"></use>
          </svg>
          <span class="news__data-text">${this.news.time}</span>
        </div>
        <div class="news__data-item news__rocket">
          <svg class="news__icon">
            <use xlink:href="#rocket"></use>
          </svg>
          <span class="news__data-text">${this.news.rocket}</span>
        </div>
      </div>
    </section>
  </a>`;
  }
}

export default News;
