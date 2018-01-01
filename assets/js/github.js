url1 = "https://api.github.com/repos/sharadbhat/VideoHub";
url2 = "https://api.github.com/repos/sharadbhat/Zomatopy";
url3 = "https://api.github.com/repos/sharadbhat/Recommender-Engine-API";
url4 = "https://api.github.com/repos/OmkarPathak/pygorithm"

url = [url1, url2, url3, url4];

var star = 'star'
var fork = 'fork'

var xhr = new XMLHttpRequest();
for (var i = 1; i < url.length + 1; i++) {
  xhr.open("GET", url[i - 1], false);
  xhr.send();

  json = JSON.parse(xhr.responseText);

  var repoStars = json.stargazers_count;
  var repoForks = json.forks_count;

  document.getElementById(star + i.toString()).innerHTML = repoStars;
  document.getElementById(fork + i.toString()).innerHTML = repoForks;
}
