const handleCatagories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const loaddata = await response.json();
    const catagories = loaddata.data.news_category;
    catagories.forEach(catagory => {
        const id = catagory.category_id;
        const name = catagory.category_name;
        createBtn(id, name);
    });
}
handleCatagories();

// Tab create for every catagory
const btnContainer = document.getElementById('btn-container');
const createBtn = (id, name) => {
    const singleBtn = document.createElement('button');
    singleBtn.innerHTML=`<button class="btn btn-success">${name}</button>`
    btnContainer.appendChild(singleBtn);
    singleBtn.addEventListener("click", function () {
        createNews(id);
    })
}
// show news by clicking button
const noNews = document.getElementById("no-news");
const createNews = async (id) => {
    const loadNews = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const news = await loadNews.json();
    const newsData = news.data;
    if (news.data.length == 0) {
        noNews.classList.remove('hidden')
    }
    else {
        noNews.classList.add('hidden');
    }
    cardContainer.innerHTML = ``;
    newsData.forEach(content => {
        createCard(content);
    })
}
// card creation
const cardContainer = document.getElementById('news-container');

const createCard = (content) => {
    const singleCard = document.createElement('div');
    console.log(content);
    singleCard.innerHTML = `
    <div class="card bg-base-100 shadow-xl rounded-none">
        <figure class="relative">
            <img h-80 src="${content.image_url}" alt="Shoes" />
            <div class="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1">${content.total_view} views</div>
        </figure>
        <div class="card-body p-2 overflow-hidden relative">
        <h1 class="font-bold">${content.title.slice(0,30)}</h1>
        <p class="mb-4">${content.details.slice(0, 110)}</p>
            <div class=" font-semibold flex gap-2">
                <div><img class="w-14 h-14 rounded-full" src="${content.author.img}" alt=""></div>
                <div>
                    <p>${content.author.name}</p>
                    <p>${content.author.published_date}</p>
                </div>
            </div>
        </div>
    </div>
    `
    cardContainer.appendChild(singleCard);
}
// for default news
createNews('01')