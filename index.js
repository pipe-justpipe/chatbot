const sendBtn = document.getElementById("send");
const iconsDiv = document.querySelector(".icons");
const input = document.getElementById("input");
const chatSection = document.getElementById("chat__section");
const showChat = document.getElementById("all");
const showBtn = document.getElementById("show__btn");
const hideBtn = document.getElementById("hide__btn");
function show() {
  showBtn.style.display = "none";
  hideBtn.style.display = "block";
  showChat.style.display = "block";
}
showBtn.addEventListener("click", show);

function hide() {
  showBtn.style.display = "block";
  hideBtn.style.display = "none";
  showChat.style.display = "none";
}
hideBtn.addEventListener("click", hide);

const aiMessages = [
  "👋 Hi there! How can I help?",
  "No problem! Let me connect you to a customer support agent.",
  "Hi there! I’m Hannah. How can I help you?",
  "Ah, I see. How can I assist you today?",
  "I'm here to help! What do you need?",
];
let count = 0;
let userImage = "Images/chatAvatars.png";

function send() {
  sendBtn.style.display = "none";
  iconsDiv.style.display = "flex";

  if (
    count > 0 &&
    aiMessages[count - 1] ===
      "No problem! Let me connect you to a customer support agent."
  ) {
    createChat(aiMessages[count], userImage, true);
    count++;
  } else {
    createChat(input.value, userImage, false);
    if (input.value === "I’m sorry bot, but you’re wrong") {
      setTimeout(() => {
        // Allow the user to send another message by showing the send button
        sendBtn.style.display = "block";
        iconsDiv.style.display = "none";
      }, 3000);
    } else {
      setTimeout(() => {
        // After a delay, send the next AI message
        if (count < aiMessages.length) {
          createChat(aiMessages[count], userImage, true);
          count++;
        }
      }, 1000);
    }
  }

 // To Check if there are more messages in the array
 if (count < aiMessages.length) {
  sendBtn.style.display = "block";
  input.value = "";
  input.focus();
} else {
  // hiding the send button, if there are no more messages
  sendBtn.style.display = "none";
}
iconsDiv.style.display = "none";
sendBtn.style.display = "block";
}

sendBtn.addEventListener("click", send);

function createChat(message, imageSrc, includeImage) {
  const chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container");

  const imageElement = document.createElement("img");
  imageElement.src = imageSrc;
  imageElement.alt = "Avatar";
  imageElement.classList.add("avatar");
  imageElement.style.width = "32px";
  imageElement.style.height = "32px";

  const chatBubble = document.createElement("div");
  chatBubble.classList.add("chat-bubble");
  chatBubble.style.padding = "16px 18px";
  chatBubble.style.width = "auto";
  chatBubble.style.height = "";

  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  chatBubble.appendChild(messageElement);

  if (includeImage) {
    chatContainer.appendChild(imageElement);
    chatContainer.style.justifyContent = "flex-start";
    chatBubble.style.color = "black";
    chatBubble.style.backgroundColor = "var(--ash)";
  }
  if (
    message === "No problem! Let me connect you to a customer support agent."
  ) {
    userImage = "Images/Avatars.png";
    chatBubble.style.height = "74px";

    if (window.matchMedia("(max-width: 480px)").matches) {
      chatBubble.style.height = "90px";
    }

    setTimeout(send, 500);
  }
  if (message === "Hi there! I’m Hannah. How can I help you?") {
    chatBubble.style.width = "183px";
    chatBubble.style.height = "95px";
    chatBubble.style.padding = "16px 18px";
    chatBubble.style.borderRadius = "10px";
    chatBubble.style.lineHeight = "36px";
    iconsDiv.style.display = "none";
    sendBtn.style.display = "block";
    chatBubble.style.display = "flex";
    chatBubble.style.flexDirection = "column";
    chatBubble.style.justifyContent = "space-between";

    const spanElement = document.createElement("span");
    spanElement.textContent = "Hannah . Just now";
    spanElement.style.alignSelf = "flex-start";
    spanElement.style.fontSize = "0.8em";
    spanElement.style.color = "#888";
    spanElement.style.marginTop = "-50px";

    chatBubble.appendChild(spanElement);
  }
  chatContainer.appendChild(chatBubble);

  if (message === "Oh finally a human, wohoo!") {
    chatContainer.style.alignItems = "flex-end"; 
    chatContainer.style.display = "flex";
    chatContainer.style.flexDirection = "column";
    chatContainer.style.justifyContent = "flex-end";
    const spanElement2 = document.createElement("span");
    spanElement2.textContent = "Just now . Not seen yet";
    spanElement2.style.alignSelf = "flex-end";
    spanElement2.style.fontSize = "0.8em";
    spanElement2.style.color = "#888";
    spanElement2.style.marginTop = "10px";
    chatContainer.appendChild(spanElement2);
  }
  chatSection.appendChild(chatContainer);
  chatSection.scrollTop = chatSection.scrollHeight; 
}

function forInput() {
  iconsDiv.style.display = "none";
  sendBtn.style.display = "block";
}

input.addEventListener("focus", forInput);

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    send();
  }
});
