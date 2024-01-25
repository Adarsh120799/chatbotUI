$(document).ready(function () {

    

    $('#send-btn').click(sendMessage);

    $('#user-input').keypress(function (e) {
        if (e.which === 13) {
            sendMessage();
        }
    });

    $('#refresh-btn').click(clearChat);

    function sendMessage() {
        var userMessage = $('#user-input').val().trim();
        if (userMessage === '') {
            return;
        }

        appendMessage('user', userMessage);

        callApi(userMessage, function (botResponse) {
            appendMessage('bot', botResponse);
        });

        $('#user-input').val('');
    }

    function appendMessage(sender, message) {
        var messageClass = (sender === 'user') ? 'user-message' : 'bot-message';
        var messageElement = $('<div class="' + messageClass + '"></div>').text(message);
        $('#chat-body').append(messageElement);

        $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
    }

    function callApi(userMessage, callback) {
        var apiUrl = 'http://localhost:8080/api/bot/chatAssistant';
        var requestData = {
            prompt: userMessage
        };
        showLoadingEffect();
        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function (response) {
                hideLoadingEffect();
                printResponseDynamically(response, callback);
            },
            error: function (error) {
                hideLoadingEffect();
                console.error('Error calling API:', error);
                callback('Sorry, an error occurred.');
            }
        });
    }

    function printResponseDynamically(response, callback) {
        var lines = response.split('\n');
        lines.forEach(function (line, index) {
            setTimeout(function () {
                callback(line);
            }, index * 1000);
        });
    }

    function showLoadingEffect() {
        $('#loading-spinner').show();
    }

    function hideLoadingEffect() {
        $('#loading-spinner').hide();
    }

    function clearChat() {
        $('#chat-body').empty();
    }

});
