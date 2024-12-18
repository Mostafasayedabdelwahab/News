let date = new Date();
let pDate = document.getElementById("date");
let head2 = document.getElementById("head2");
let icon = document.getElementById("click");
let menu = document.getElementById("menu");
var x = window.matchMedia("(max-width: 761px)");
pDate.innerHTML += date.toDateString();
const apiKey = "63a78827b811de0f0de654aeea9da601";
const apiUrl = "https://gnews.io/api/v4/";

menu.addEventListener("click", function () {
  if (head2.classList.contains("show")) {
    head2.classList.remove("show");
  } else {
    head2.classList.add("show");
  }
  if (x.matches) {
    menu.style.display = "none";
  }
});



icon.onclick = function () {
  head2.classList.remove("show");
  if (x.matches) {
    menu.style.display = "block";
  }
};

const fetchLatestNews = async () => {
  const response = await fetch(`${apiUrl}top-headlines?lang=ar&token=${apiKey}`);
  const data = await response.json();
  displayNews(data.articles);
};

const searchNews = async (value) => {
  const query = value;
  if (!query) return;
  const response = await fetch(
    `${apiUrl}search?q=${encodeURIComponent(query)}&lang=en,ar&token=${apiKey}`
  );
  const data = await response.json();
  displayNews(data.articles);
};

const displayNews = (articles) => {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "";

  if (articles.length === 0) {
    newsContainer.innerHTML = "<p>لا توجد أخبار متاحة.</p>";
    return;
  }

  articles.forEach((article) => {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");

    newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || "لا توجد تفاصيل متاحة"}</p>
            <a href="${article.url}" target="_blank">اقرأ المزيد</a>
        `;

    newsContainer.appendChild(newsItem);
    newsContainer.scrollIntoView({ behavior: "smooth" });
  });
};

document.getElementById("news").addEventListener("click", fetchLatestNews);
document.getElementById("searchButton").addEventListener("click", () =>searchNews(document.getElementById("searchQuery").value));
document.getElementById("sport").addEventListener("click", () => searchNews("كرة القدم اليوم"));
document.getElementById("arts").addEventListener("click", () => searchNews("الفن"));
document.getElementById("incidents").addEventListener("click", () => searchNews("حادث اليوم مصر"));
document.getElementById("wether").addEventListener("click", () => searchNews("اخبار الطقس"));
document.getElementById("health").addEventListener("click", () => searchNews("الصحة"));


function hide (){
    if (x.matches) {
      head2.classList.remove("show");
      menu.style.display = "block";
    }
}

up = document.getElementById("up");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    up.style.display = "block";
  } else {
    up.style.display = "none";
  }
});
