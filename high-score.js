let username = $("#username");
let saveBtn = $("#saveScoreBtn");
let scoreSpan = $("#score");
let showScore = $("#showScores");

let scoreKeeper = [];
/**
 if there is saved data in local storage, uses them to show in show high score area, 
 and assingns it to scoreKeeper otherwise, sets the scoreKeeper into an empty arry
 */

if (localStorage.getItem("highScore")) {
  $(showScore).html(
    JSON.parse(localStorage.getItem("highScore")).map(
      (item) =>
        "<li class='scoreListItem'>" + item.name + " - " + item.score + "</li>"
    )
  );
  scoreKeeper = JSON.parse(localStorage.getItem("highScore"));
}

scoreSpan.text(localStorage.getItem("currentScore"));

username.keyup(function () {
  $(saveBtn).attr("disabled", false);
});

$(saveBtn).on("click", function (event) {
  event.preventDefault();

  let recentScore = {
    score: localStorage.getItem("currentScore"),
    name: username.val(),
  };
  scoreKeeper.push(recentScore);
  // this function sorts the array of scoreKeeper and when compares 2 numbers, if b>a, puts b before a. the purpose is to show the usernames in order respected to their score
  scoreKeeper.sort((a, b) => b.score - a.score);
  scoreKeeper = scoreKeeper.slice(0, 5); // only keeps the highest 5 scores and eliminates the rest

  localStorage.setItem("highScore", JSON.stringify(scoreKeeper));
  console.log(scoreKeeper);

  $(showScore).html(
    JSON.parse(localStorage.getItem("highScore")).map(
      (item) =>
        "<li class='scoreListItem'>" + item.name + " - " + item.score + "</li>"
    )
  );

  $(username).val("");
});
