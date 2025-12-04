// Object met codes en bijbehorende hints per dag (7 t/m 24 december)
const dayData = {
    7:   { code: "SNEEUW",   symbol: "sok.png",          answer: "De sleutel ligt onder de kerstboom.",                     hint: "Zoek iets warms om te drinken..." },
    8:   { code: "KAARS",    symbol: "thee.png",         answer: "Zoek bij de theepot in de keuken.",                      hint: "Kijk in de kerstboom..." },
    9:   { code: "STER",     symbol: "kerstbal.png",     answer: "De kerstbal hangt aan de linkerkant van de boom.",        hint: "Zoek iets zoets..." },
    10:  { code: "BEL",      symbol: "zuurstok.png",     answer: "De zuurstok ligt in de snoepkom.",                       hint: "Kijk naar een plant..." },
    11:  { code: "KRANS",    symbol: "takblaadje.png",   answer: "Het blaadje ligt bij de kerstkrans aan de deur.",         hint: "Zoek een mini-huisje..." },
    12:  { code: "PAKJE",    symbol: "huis.png",         answer: "Het kersthuisje staat op de schouw.",                    hint: "Kijk onder de kersttrui..." },
    13:  { code: "ELF",      symbol: "truistrik.png",    answer: "De strik zit aan de kersttrui in de kast.",              hint: "Zoek een kerstboom van papier..." },
    14:  { code: "LIED",     symbol: "truiboom.png",     answer: "De papieren kerstboom hangt aan de koelkast.",           hint: "Zoek een dier dat van kou houdt..." },
    15:  { code: "KOOKIE",   symbol: "ijsbeer.png",      answer: "De ijsbeer staat op de boekenplank.",                    hint: "Zoek een zwart-wit dier..." },
    16:  { code: "LINT",     symbol: "pinguin.png",      answer: "De pinguïn staat naast de tv.",                         hint: "Bouw iets met sneeuw..." },
    17:  { code: "KALF",     symbol: "sneeuwpop.png",    answer: "De sneeuwpop staat in de tuin (of op een foto).",        hint: "Zoek een sluwe vos..." },
    18:  { code: "WENS",     symbol: "vosje.png",        answer: "Het vosje zit verstopt in de kerststal.",               hint: "Zoek iets lekkers om op te eten..." },
    19:  { code: "IJS",      symbol: "koekemannetje.png", answer: "Het koekemannetje hangt aan het raam.",                hint: "Kijk naar kleine boompjes..." },
    20:  { code: "KLOK",     symbol: "boompjes.png",     answer: "De mini-boompjes staan op de vensterbank.",            hint: "Zoek rode bessen..." },
    21:  { code: "HERT",     symbol: "takjebessen.png",  answer: "De tak met bessen ligt op tafel.",                     hint: "Houd je handen warm..." },
    22:  { code: "KAART",    symbol: "wanten.png",       answer: "De wanten hangen bij de deur.",                         hint: "Zet iets op je hoofd..." },
    23:  { code: "VUUR",     symbol: "muts.png",         answer: "De muts ligt op de bank.",                              hint: "Morgen is het kerst!" },
    24:  { code: "KADO",     symbol: "cadeau.png",       answer: "Gefeliciteerd! Het laatste cadeau ligt onder de tafel.", hint: "" }
};

// Huidige datum bepalen
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; // Januari = 1, December = 12

// Kalender genereren (dag 7 altijd beschikbaar, rest volgens datumlogica)
function generateCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    for (let day = 7; day <= 24; day++) {
        const dayElement = document.createElement("div");
        dayElement.className = "day";
        dayElement.setAttribute("data-day", day);

        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-symbol"></div>
            <div class="day-status"></div>
        `;

        // Logica voor verleden/heden/toekomst
        if (day === 7) {
            dayElement.classList.add("current");
        } else if (currentMonth === 12) {
            if (day < currentDay) dayElement.classList.add("past");
            else if (day === currentDay) dayElement.classList.add("current");
            else dayElement.classList.add("future");
        } else {
            dayElement.classList.add("future");
        }

        // Als de dag voltooid is: toon het symbool
        if (localStorage.getItem(`day${day}Completed`)) {
            dayElement.classList.add("completed");
            dayElement.querySelector(".day-status").textContent = "✓";

            const symbolImg = document.createElement("img");
            symbolImg.src = `symbols/${dayData[day].symbol}`;
            symbolImg.alt = `Symbool dag ${day}`;
            symbolImg.className = "symbol-img";
            dayElement.querySelector(".day-symbol").appendChild(symbolImg);
        }

        // Klikhandler
        if (day === 7 || (currentMonth === 12 && day <= currentDay) || currentMonth !== 12) {
            dayElement.onclick = () => selectDay(day);
        }

        calendar.appendChild(dayElement);
    }
}
// Dag selecteren
function selectDay(day) {
    document.getElementById("selectedDay").textContent = `dag ${day} december`;
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
        // Toon het antwoord + hint voor morgen
        resultDiv.innerHTML = `
            <img src="symbols/${dayData[day].symbol}" alt="symbool" class="symbol-img">
            ${dayData[day].answer} <br>
            <strong>Hint voor morgen:</strong> ${dayData[day].hint}
        `;
        resultDiv.className = "success";

        // Markeer dag als voltooid
        localStorage.setItem(`day${day}Completed`, "true");

        // **Toon het symbool van de volgende dag in de kalender (met animatie)**
        if (day < 24) {
            const nextDay = day + 1;
            const nextDayElement = document.querySelector(`.day[data-day="${nextDay}"]`);
            if (nextDayElement) {
                const symbolImg = document.createElement("img");
                symbolImg.src = `symbols/${dayData[nextDay].symbol}`;
                symbolImg.alt = `Symbool dag ${nextDay}`;
                symbolImg.className = "symbol-img new-symbol"; // Animatie-class
                nextDayElement.querySelector(".day-symbol").appendChild(symbolImg);

                // Verwijder de animatie-class na afspelen
                setTimeout(() => {
                    symbolImg.classList.remove("new-symbol");
                }, 500);
            }
        }

        // Vernieuw de kalender
        generateCalendar();
    } else {
        resultDiv.textContent = "❌ Onjuiste code. Probeer opnieuw!";
        resultDiv.className = "error";
    }
}
// Kalender genereren bij laden
document.addEventListener('DOMContentLoaded', generateCalendar);
