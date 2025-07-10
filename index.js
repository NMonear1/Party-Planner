const $app = document.querySelector("#app");

const displayDetails = (parties) => {
  const $container = document.querySelector("#rightDiv");
  $container.innerHTML = `
    <h2>Party Details</h2>
    <h3>${parties.name}</h3>
    <p>Date:</strong> ${new Date(parties.date).toLocaleString()}</p>
    <p>Location:</strong> ${parties.location}</p>
    <p>Description:</strong> ${parties.description}</p>
  `;
};

const getInfo = async (id) => {
  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-FTB-CT-WEB-PT/events/${id}`
    );
    const parties = await response.json();
    console.log(parties.data);
    displayDetails(parties.data);
  } catch (error) {
    console.error(error);
  }
};

const upcomingParties = (parties) => {
  const $container = document.createElement("div");
  const $h2 = document.createElement("h2");
  $container.id = "leftDiv";
  $h2.textContent = "Upcoming Parties";
  $container.append($h2);
  $app.appendChild($container);
  for (const element of parties) {
    const $div = document.createElement("div");
    const $button = document.createElement("button");
    $button.addEventListener("click", () => getInfo(element.id));
    $button.textContent = element.name;
    $div.append($button);
    $container.append($div);
  }
};

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-FTB-CT-WEB-PT/events"
    );
    const parties = await response.json();
    console.log(parties);
    upcomingParties(parties.data);
  } catch (error) {
    console.error(error);
  }
};

const main = () => {
  const $h1 = document.createElement("h1");
  $h1.textContent = "Party Planner";
  $h1.style.textAlign = "center";
  $app.append($h1);
  const $container = document.createElement("div");
  $container.id = "rightDiv";
  const $h2 = document.createElement("h2");
  $h2.id = "pDetails";
  $h2.textContent = "Party Details";
  $container.append($h2);
  $app.appendChild($container);

  alert("Select a party!");
  fetchData();
};

main();
