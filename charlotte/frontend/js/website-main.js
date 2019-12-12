// C.H.A.R.L.O.T.T.E webpage main javascript

function getStylesheet() {
    var currentTime = new Date().getHours();
    if (7 <= currentTime && currentTime < 18) {
        document.write("<link rel='stylesheet' href='frontend/css/colors-light.css' type='text/css' id='theme_user_mode'>");
    } else {
        document.write("<link rel='stylesheet' href='frontend/css/colors-dark.css' type='text/css' id='theme_user_mode'>");
    }
}
getStylesheet()