const socket = window.io();

const sendButton = document.querySelector('.sendButton');
const nicknameSaveButton = document.querySelector('.nicknameSaveButton');
const chatMessageValue = document.querySelector('.messageInput');
const nicknameValue = document.querySelector('.nicknameInput');

let nickname = '';
