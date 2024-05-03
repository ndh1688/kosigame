// キャラクターの画像とランダムなセリフの配列
var character = document.getElementById("character");
var phrases = ["ありがとう！", "嬉しい！", "プレゼントありがとう！", "すごい！", "喜んでるよ！"];

// プレゼントのエリアの要素を取得
var giftAreas = document.querySelectorAll(".gift-area");

// ドラッグイベントの処理
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.parentElement.id);
}

// ドロップイベントの処理
function drop(ev, area) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var present = document.getElementById(data);

    // キャラクターにプレゼントを運ぶ処理
    if (area === "character") {
        present.style.display = "none"; // プレゼントを非表示にする
        character.style.transform = "scale(1.1)"; // キャラクターを拡大する
        setTimeout(function() {
            character.style.transform = "scale(1)"; // アニメーション後に元のサイズに戻す
            sayPhrase(); // ランダムなセリフを発する
        }, 500);
    } else {
        var giftArea = document.getElementById(area);
        giftArea.appendChild(present); // プレゼントを新しいエリアに移動する
    }
}

// ドラッグオーバーイベントの処理
function allowDrop(ev) {
    ev.preventDefault();
}

// ランダムなセリフをキャラクターが発する処理
function sayPhrase() {
    var randomIndex = Math.floor(Math.random() * phrases.length);
    alert(phrases[randomIndex]);
}

// ページ読み込み時にプレゼントをランダムなエリアに配置する処理
document.addEventListener('DOMContentLoaded', function() {
    var presentImages = document.querySelectorAll(".gift-area img");

    presentImages.forEach(function(img) {
        img.setAttribute("draggable", "true");
        img.addEventListener("dragstart", drag);
    });

    giftAreas.forEach(function(area) {
        var randomIndex = Math.floor(Math.random() * giftAreas.length);
        giftAreas[randomIndex].appendChild(area.querySelector("img")); // ランダムなエリアにプレゼントを配置する
    });
});

