// Object met codes en symbolen
const dayData = {
    7:   { code: "313",   symbol: "sok.png",          nextSymbol: "thee.png",     answer: "Raadsel elf wenst jullie succes! Onthoud de letter D.",                     hint: "Zoek iets warms om te drinken..." },
    8:   { code: "432",    symbol: "thee.png",         nextSymbol: "kerstbal.png", answer: "Dat was even puzzelen. Onthoud de letter D.",                      hint: "Kijk in de kerstboom..." },
    9:   { code: "LONDEN",     symbol: "kerstbal.png",     nextSymbol: "zuurstok.png", answer: "De volgend WATJJUS trip staat op de planning, goed geraden! Onthoud de letter E.",        hint: "Zoek iets zoets..." },
    10:  { code: "21-19-36864",      symbol: "zuurstok.png",     nextSymbol: "takblaadje.png", answer: "Knap de logica doorgrond. Onthoud de letter O.",                       hint: "Kijk naar een plant..." },
    11:  { code: "10100111111000",    symbol: "takblaadje.png",   nextSymbol: "huis.png",      answer: "Pfoe, wat een lange code was dat. Onthoud de letter E.",         hint: "Zoek een mini-huisje..." },
    12:  { code: "in een cocktail",    symbol: "huis.png",         nextSymbol: "truistrik.png", answer: "Ik kan er ook wel eentje gebruiken. Onthoud de letter P.",                    hint: "Wat een mooie trui..." },
    13:  { code: "watjjus",      symbol: "truistrik.png",    nextSymbol: "truiboom.png", answer: "Dit moest natuurlijk een dag het antwoord zijn. Onthoud de letter B.",              hint: "Gelukkig is er nog een trui..." },
    14:  { code: "krans",     symbol: "truiboom.png",     nextSymbol: "ijsbeer.png",  answer: "Hangt deze bij jullie op de deur? Onthoud de letter D.",           hint: "Zoek een dier dat van kou houdt..." },
    15:  { code: "vier eieren",   symbol: "ijsbeer.png",      nextSymbol: "pinguin.png",  answer: "Lekker voor het ontbijt zeg. Onthoud de letter E.",                    hint: "Zoek een zwart-wit dier..." },
    16:  { code: "2021",     symbol: "pinguin.png",      nextSymbol: "sneeuwpop.png", answer: "Ahhh de goede ouwe tijd. Onthoud de letter N.",                         hint: "Bouw iets met sneeuw..." },
    17:  { code: "Helaas nog geen cadeau vandaag jullie doen goed je best iedere dag wat dichterbij ga zo door joe",     symbol: "sneeuwpop.png",    nextSymbol: "vosje.png",    answer: "Sorry voor het hele lange antwoord. Onthoud de letter B.",        hint: "Zoek een sluwe vos..." },
    18:  { code: "christmas movie",     symbol: "vosje.png",        nextSymbol: "koekemannetje.png", answer: "Welke is jullie favoriet? Onthoud de letter L.",               hint: "Zoek iets lekkers om op te eten..." },
    19:  { code: "5",      symbol: "koekemannetje.png", nextSymbol: "boompjes.png", answer: "Deze puzzel viel wel mee, toch? Onthoud de letter O.",                hint: "Kijk naar kleine boompjes..." },
    20:  { code: "4524",     symbol: "boompjes.png",      nextSymbol: "takjebessen.png", answer: "Knap gedaan! Onthoud de letter B.",            hint: "Zoek rode bessen..." },
    21:  { code: "sneeuwpop",     symbol: "takjebessen.png",  nextSymbol: "wanten.png",   answer: "Jammer dat we die niet hebben kunnen maken de afgelopen jaren. Onthoud de letter E.",                     hint: "Houd je handen warm..." },
    22:  { code: "The Twelve Days of Christmas",    symbol: "wanten.png",       nextSymbol: "muts.png",     answer: "Mooi nummer toch! Onthoud de letter E.",                         hint: "Zet iets op je hoofd..." },
    23:  { code: "Haha jullie zijn er nog steeds niet",     symbol: "muts.png",          nextSymbol: "cadeau.png",  answer: "Hihi, succes nog eventjes! Onthoud de letter M.",                              hint: "Morgen is het kerst!" },
    24:  { code: "Open de dubbele bodem",     symbol: "cadeau.png",       nextSymbol: "",           answer: "Gefeliciteerd! Het is tijd om het cadeau'tje te pakken. Zoek goed in de doos 🎄🎁", hint: "" }
};

// Huidige datum bepalen
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; // Januari = 1, December = 12

// Tijdelijk overschrijven van de huidige datum voor testdoeleinden
// const today = new Date(2025, 11, 12); // December is maand 11 (0-11), 12 is de dag
// const currentDay = today.getDate();
// const currentMonth = today.getMonth() + 1; // Januari = 1, December = 12

// Kalender genereren
function generateCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    for (let day = 7; day <= 24; day++) {
        const dayElement = document.createElement("div");
        dayElement.className = "day";
        dayElement.setAttribute("data-day", day);

        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-status"></div>
        `;

        // Dag 7 toont altijd het symbool als achtergrond
        if (day === 7) {
            if (currentMonth === 12 && currentDay === 7) {
                dayElement.classList.add("current");
                dayElement.onclick = () => selectDay(day);
            }
            dayElement.style.backgroundImage = `url('symbols/${dayData[day].symbol}')`;
        }
        // Andere dagen: alleen zichtbaar als vorige dag voltooid is
        else if (localStorage.getItem(`day${day-1}Completed`)) {
            dayElement.style.backgroundImage = `url('symbols/${dayData[day].symbol}')`;
        }

        // Status bepalen (verleden/heden/toekomst)
        if (currentMonth === 12) {
            if (day < currentDay) dayElement.classList.add("past");
            else if (day === currentDay) dayElement.classList.add("current");
            else dayElement.classList.add("future");
        } else {
            dayElement.classList.add("future");
        }

        // Als voltooid: markeer als completed
        if (localStorage.getItem(`day${day}Completed`)) {
            dayElement.classList.add("completed");
            dayElement.querySelector(".day-status").textContent = "✓";
        }

        // Klikhandler
        if (day === 7 || (currentMonth === 12 && day <= currentDay) || currentMonth !== 12) {
            // Dag is alleen klikbaar als vorige dag voltooid is (behalve dag 7)
            if (day === 7 || localStorage.getItem(`day${day-1}Completed`)) {
                dayElement.onclick = () => selectDay(day);
            }
        }

        calendar.appendChild(dayElement);
    }
}

function checkCode() {
    const input = document.getElementById("codeInput").value.trim().toUpperCase();
    const day = parseInt(document.getElementById("codeInput").dataset.day);
    const resultDiv = document.getElementById("result");

    if (dayData[day] && input === dayData[day].code.toUpperCase()) {
        const nextDay = day + 1;
        const hasNextDay = nextDay <= 24;

        let resultHTML = `${dayData[day].answer}`;

        if (hasNextDay) {
            resultHTML += `
                <br><br>
                <strong>Hint voor morgen:</strong>
                <div style="text-align: center; margin: 10px 0;">
                    <img src="symbols/${dayData[nextDay].symbol}" class="symbol-img">
                </div>
                ${dayData[day].hint}
            `;
        }

        if (day === 24) {
            resultHTML += `<br><br><strong>🎉 Gefeliciteerd! 🎄</strong>`;
        }

        resultDiv.innerHTML = resultHTML;
        resultDiv.className = "success";

        // Markeer dag als voltooid
        localStorage.setItem(`day${day}Completed`, "true");

        // Update kalender
        generateCalendar();
    } else {
        resultDiv.textContent = "❌ Onjuiste code!";
        resultDiv.className = "error";
    }
}

// Dag selecteren
function selectDay(day) {
    document.getElementById("selectedDay").textContent = `Dag ${day} december`;
    document.getElementById("codeInputSection").style.display = "block";
    document.getElementById("codeInput").dataset.day = day;
    document.getElementById("codeInput").value = "";
    document.getElementById("result").className = "";
    document.getElementById("result").style.display = "none";
}

// Terug naar kalender
function backToCalendar() {
    document.getElementById("codeInputSection").style.display = "none";
}

// Code controleren
function checkCode() {
    const input = document.getElementById("codeInput").value.trim().toUpperCase();
    const day = parseInt(document.getElementById("codeInput").dataset.day);
    const resultDiv = document.getElementById("result");

    if (dayData[day] && input === dayData[day].code) {
        // Toon antwoord + symbool van volgende dag
        const nextDay = day + 1;
        const hasNextDay = nextDay <= 24;

        let resultHTML = `${dayData[day].answer}`;

        if (hasNextDay) {
            resultHTML += `
                <br><br>
                <strong>Hint voor morgen:</strong>
                <div style="text-align: center; margin: 10px 0;">
                    <img src="symbols/${dayData[nextDay].symbol}" class="symbol-img">
                </div>
                ${dayData[day].hint}
            `;
        }

        if (day === 24) {
            resultHTML += `<br><br><strong>🎉 Gefeliciteerd! 🎄</strong>`;
        }

        resultDiv.innerHTML = resultHTML;
        resultDiv.className = "success";

        // Markeer dag als voltooid
        localStorage.setItem(`day${day}Completed`, "true");

        // Update kalender
        generateCalendar();
    } else {
        resultDiv.textContent = "❌ Onjuiste code!";
        resultDiv.className = "error";
    }
}

// Kalender genereren bij laden
document.addEventListener('DOMContentLoaded', generateCalendar);
