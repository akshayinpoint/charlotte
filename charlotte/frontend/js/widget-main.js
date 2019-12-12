// C.H.A.R.L.O.T.T.E widget main javascript
// Scroll to the bottom of the conversations after new message appears
function goToLatestConversation() {
    var lastMessageDiv = document.getElementById("conversations");
    lastMessageDiv.scrollTop = lastMessageDiv.scrollHeight;
}

// Typing indicator
function showTypingIndicator() {
    var typingIndicator = '<div class="typingIndicator">' + '<div class="typingIndicatorLeft"></div>' + '<div class="typingIndicatorCenter"></div>' + '<div class="typingIndicatorRight"></div>' + '</div>'
    $(typingIndicator).appendTo(".conversations").show("slow");
    $('.typingIndicator').show().fadeIn(1000);
    goToLatestConversation();
}

function hideTypingIndicator() {
    $('.typingIndicator').remove().fadeOut(1000);;
}

// C.H.A.R.L.O.T.T.E's conversational icebreaker
$(document).ready(function() {
    // showTypingIndicator();
    // $("#xaInput").prop('disabled', true);

    action_name = "action_responding_to_greet_message";
    user_id = "xames3";
    // loadConversations();
    // conversation_icebreaker();
})

// Icebreaker function
function conversation_icebreaker() {
    $.ajax({
        url: `http://localhost:5005/conversations/${user_id}/execute`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ "name": action_name }),
        success: function(charlotteResponse, status) {
            console.log("C.H.A.R.L.O.T.T.E's response:", charlotteResponse, "\nStatus:", status);
            console.log(charlotteResponse["messages"]);
            if (charlotteResponse.hasOwnProperty("messages")) {
                sendCharlotteResponse(charlotteResponse["messages"]);
            }
            $("#xaInput").prop('disabled', false);
        },
        error: function(charlotteError, textStatus, errorThrown) {
            sendCharlotteResponse("");
            console.log("C.H.A.R.L.O.T.T.E's error status:", textStatus);
            $("#xaInput").prop('disabled', false);
        }
    });
}

// XA's input message text field
$(".xaInputClass").on("keyup keypress", function(e) {
    var keyCode = e.keyCode || e.which;
    var text = $(".xaInputClass").val();
    if (keyCode === 13) {
        if (text == "" || $.trim(text) == "") {
            e.preventDefault();
            return false;
        } else {
            $(".xaInputClass").blur();
            sendXaMessage(text);
            send(text);
            e.preventDefault();
            return false;
        }
    }
});

// Send button, duh...
$("#sendButton").on("click", function(e) {
    var text = $(".xaInputClass").val();
    if (text == "" || $.trim(text) == "") {
        e.preventDefault();
        return false;
    } else {
        $(".xaInputClass").blur();
        sendXaMessage(text);
        send(text);
        e.preventDefault();
        return false;
    }
})

// XA's input messages
function sendXaMessage(message) {
    var xaResponse = '<div class="clearfix"></div><p class="xaInputMessage">' + message + ' </p><p class="xaMessageTimestamp">' + messageTimestamp() + ' </p><div class="clearfix"></div>';
    $(xaResponse).appendTo(".conversations").show("slow");

    $(".xaInputClass").val("");
    goToLatestConversation();
    showTypingIndicator();
}

// Sending actual input to C.H.A.R.L.O.T.T.E's server
function send(message) {
    $.ajax({
        url: "http://localhost:5005/webhooks/rest/webhook",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ message: message, sender: user_id }),
        success: function(charlotteResponse, status) {
            console.log("C.H.A.R.L.O.T.T.E's response:", charlotteResponse, "\nStatus:", status);
            sendCharlotteResponse(charlotteResponse);
        },
        error: function(charlotteError, textStatus, errorThrown) {
            sendCharlotteResponse("");
            console.log("C.H.A.R.L.O.T.T.E's error status:", textStatus);
        }
    });
}

// Loading all conversation history from C.H.A.R.L.O.T.T.E's server ----> This bitch doesn't work yet.
function loadConversations() {
    $.ajax({
        url: `http://localhost:5005/conversations/${user_id}/tracker`,
        type: "GET",
        contentType: "application/json",
        data: JSON.stringify({ user_id }),
        success: function(user_id, status) {
            console.log(typeof user_id["latest_event_time"]);
            console.log("Restoring previous conversations:", user_id["latest_event_time"]);
        },
        error: function(charlotteError, textStatus, errorThrown) {
            console.log("Restoring error status:", textStatus);
        }
    });
}

// Sending C.H.A.R.L.O.T.T.E's response back to XA
function sendCharlotteResponse(response) {
    setTimeout(function() {
        hideTypingIndicator();
        if (response.length < 1) {
            var fallbackMsg = "Pardon me, but could you please rephrase that again?";
            var charlotteResponse = '<p class="charlotteOutputResponse">' + fallbackMsg + '</p><p class="charlotteMessageTimestamp">' + messageTimestamp() + ' </p><div class="clearfix"></div>';
            $(charlotteResponse).appendTo(".conversations").hide().fadeIn(1000);
            goToLatestConversation();
        } else if (response.length === 1) {
            var charlotteResponse = '<p class="charlotteOutputResponse">' + response[0].text + '</p><p class="charlotteMessageTimestamp">' + messageTimestamp() + ' </p><div class="clearfix"></div>';
            $(charlotteResponse).appendTo(".conversations").hide().fadeIn(1000);
            goToLatestConversation();
        } else {
            var lastChildCheck = response.length - 1
            for (var i = 0; i < response.length; i++) {
                if (response[i].hasOwnProperty("text")) {
                    if (i === lastChildCheck) {
                        var charlotteResponse = '<div class="charlotteOutputResponse">' + response[i].text + '</div><p class="charlotteMessageTimestamp">' + messageTimestamp() + ' </p><div class="clearfix"></div>';
                    } else {
                        var charlotteResponse = '<div class="charlotteSingleOutputResponse">' + response[i].text + '</div><div class="miniclearfix"></div>';
                    }
                    $(charlotteResponse).appendTo(".conversations").hide().fadeIn(1000);
                }
            }
            goToLatestConversation();
        }
    }, 500);
}

// Toggle C.H.A.R.L.O.T.T.E's miniview UI
$("#charlotte_fab_div").click(function() {
    $(".charlotte_fab_div").toggle();
    $(".charlotte_miniview_widget").toggle();
});

// Close function for charlotte_miniview_widget
$("#close").click(function() {
    $(".charlotte_fab_div").toggle();
    $(".charlotte_miniview_widget").toggle();
    goToLatestConversation();
});

// Placeholder values
$(document).ready(function() {
    var placeHolderValues = ['Talk to Charlotte...', 'Say "Hi, Charlotte"', 'Ask for weather...', "Try saying, \"What's the weather like?\"", 'Say Hello to Charlotte...'];
    var counterIdx = 0;
    var loopLength = placeHolderValues.length;

    setInterval(function() {
        if (counterIdx < loopLength) {
            var newPlaceholder = placeHolderValues[counterIdx];
            counterIdx++;
            $('textarea').attr('placeholder', newPlaceholder);
        } else {
            $('textarea').attr('placeholder', placeHolderValues[0]);
            counterIdx = 0;
        }
    }, 3000);
});


// Switch user theme (Dark mode - Light mode)
// $("#switch_theme").click(function getStylesheet() {
//     document.getElementById('switch_theme').onclick = function() {
//         var theme = document.getElementById("theme_user_mode");
//         console.log(theme);
//         if (theme.getAttribute("href") === './frontend/css/colors-light.css') {
//             theme.setAttribute("href", './frontend/css/colors-dark.css');
//         } else {
//             theme.setAttribute("href", './frontend/css/colors-light.css');
//         }
//     };
// });

// Timestamp converter
function messageTimestamp() {
    var currTime = new Date();
    var hours = currTime.getHours();
    var minutes = currTime.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}