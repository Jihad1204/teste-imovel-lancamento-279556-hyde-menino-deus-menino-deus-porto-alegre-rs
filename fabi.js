var changeBubble = null;

document.addEventListener("DOMContentLoaded", function(){

  var client = new BlipChat();

  var bubble;
  var bubbleContainer;
  var closeIcon;

  const iconId = "blip-chat-icon";
  const closeId = "blip-chat-close-icon";
  const chatContainer = "blip-chat-container";

  const startingColor = "#820023";
  const displayClassName = "display";
  const hideClassName = "hide";

  const appKey = "bGlhdmVuZGE6ZWZkMDQxNDktZDNhMC00ODI4LWE5MmItMWJjODM4MGEyYmQ1";

  const topImage = "https://blipmediastore.blob.core.windows.net/public-medias/Media_ce5dff3d-3e4b-4ce8-858b-7073d1fdb503";

  const bubbleMessage = "Olá, eu sou a Lia! Como posso te ajudar?";

  const startMessage = {
    type: "text/plain",
    content: "Olá",
    metadata: {
      "#blip.hiddenMessage": true
    }
  }

  function displayBubble(){
    bubble.classList.add(displayClassName);
    bubble.classList.remove(hideClassName);
  }

  function hideBubble(){
    bubble.classList.add(hideClassName);
    bubble.classList.remove(displayClassName);
  }

  changeBubble = function () {
    if (bubble.classList.contains(displayClassName))
      hideBubble();
    else
      displayBubble();
  }

  function createBubble(){

    bubbleContainer = document.createElement("div");
    bubbleContainer.id = "bubble-container";

    bubble = document.createElement("div");
    bubble.id = "message-bubble";
    bubble.onclick = function(){ client.widget._openChat() }

    var triangle = document.createElement("div");
    triangle.id = "triangle";

    var message = document.createElement("div");
    message.id = "message";
    message.innerHTML = bubbleMessage;


    bubble.appendChild(message);
    bubble.appendChild(triangle);

    bubbleContainer.appendChild(bubble);

    document
    .querySelector(`#${chatContainer}`)
    .prepend(bubbleContainer);
   

  }

  function replaceImageStructure() {

    closeIcon = document.querySelector(`#${closeId}`);
    var oldImage = document.querySelector(`#${iconId}`);

    var container = document.createElement("div");
    container.id = iconId;

    var img1 = document.createElement("img");
    img1.src = topImage;
    img1.classList.add("top")

    container.appendChild(img1);
    
    oldImage.parentElement.insertBefore(container, oldImage);
    oldImage.remove();

  }
  
  var url_atual = window.location.href+'/venda/266548/';

  client
    .withAppKey(appKey)
    .withButton({ color: startingColor })
    .withEventHandler(BlipChat.CREATE_ACCOUNT_EVENT, function(){
      client.sendMessage(startMessage);
    })
    .withEventHandler(BlipChat.ENTER_EVENT, function () {
      closeIcon.classList.add(displayClassName);
      closeIcon.classList.remove(hideClassName);
      hideBubble();
    })
    .withEventHandler(BlipChat.LEAVE_EVENT, function () {
      closeIcon.classList.add(hideClassName);
      closeIcon.classList.remove(displayClassName);
    })
    .withEventHandler(BlipChat.CREATE_ACCOUNT_EVENT, function(){ client.sendMessage({ "type": "text/plain", "content": url_atual,  metadata: { "#blip.hiddenMessage": true } }); 
    })
    .build();

  replaceImageStructure();
  createBubble();

});
