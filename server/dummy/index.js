const jwtInput = document.querySelector("#jwt");
const connectBtn = document.querySelector("#connect");
const to = document.querySelector("#to");
const messageInput = document.querySelector("#msg");
const sendBtn = document.querySelector("#send");
const messageContainer = document.querySelector("#msg-buffer");

connectBtn.addEventListener("click", async () => {
  const jwt = jwtInput.value;

  const header = new Headers();
  header.set("authorization", jwt);

  const result = await fetch("http://localhost:5050/ws/auth", {
    method: "GET",
    headers: header,
  });
  const json = await result.json();
  const auth = json.data.websocketAuthCode;

  const ws = new WebSocket(`ws://localhost:5050/ws/connect?auth=${auth}`);

  sendBtn.addEventListener("click", async () => {
    const message = {
      type: 0,
      data: {
        to: Math.floor(Number(to.value)),
        message: messageInput.value,
      },
    };
    const json = JSON.stringify(message);
    console.log(json);
    ws.send(json);
  });
  ws.onopen = () => {
    console.log("connected");
  };

  ws.onmessage = (ev) => {
    const msg = ev.data;

    messageContainer.innerHTML += `<p>${msg}</p>`;
  };

  ws.onerror = (err) => {
    console.log(err);
  };
  ws.onclose = (ev) => {
    console.log(ev);
  };
});
