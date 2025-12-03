// Object met codes en bijbehorende hints per dag
const dayData = {
    1:  { code: "SNEEUW", answer: "🔑 De sleutel ligt onder de kerstboom. <br>Hint voor morgen: Zoek iets dat brandt..." },
    2:  { code: "KAARS",  answer: "🕯️ Zoek bij het licht... <br>Hint voor morgen: Kijk omhoog!" },
    3:  { code: "STER",   answer: "⭐ Kijk omhoog, naar de top van de boom. <br>Hint voor morgen: Luister goed..." },
    4:  { code: "BEL",    answer: "🔔 Luister goed: het geluid komt uit de keuken. <br>Hint voor morgen: Check de deur..." },
    5:  { code: "KRANS",  answer: "🌿 Check de deur waar de krans hangt. <br>Hint voor morgen: Het kleinste pakje..." },
    6:  { code: "PAKJE",  answer: "🎁 Het kleinste pakje bevat een aanwijzing. <br>Hint voor morgen: Zoek een magisch wezen..." },
    7:  { code: "ELF",    answer: "🧝‍♂️ De elf heeft iets verstopt in de boekenkast. <br>Hint voor morgen: Zing een liedje..." },
    8:  { code: "LIED",   answer: "🎵 Zing het derde couplet van 'Stille Nacht' hardop. <br>Hint voor morgen: Zoek iets lekkers..." },
    9:  { code: "KOOKIE", answer: "🍪 Er zit een briefje in de koekjestrommel. <br>Hint voor morgen: Kijk naar iets roods..." },
    10: { code: "LINT",   answer: "🎀 Het rode lint leidt naar de volgende puzzel. <br>Hint voor morgen: Zoek een dier..." },
    11: { code: "KALF",   answer: "🐄 Zoek waar het kerstkalfje staat (schuur?). <br>Hint voor morgen: Schrijf iets op..." },
    12: { code: "WENS",   answer: "✨ Schrijf je kerstwens op en draai hem om. <br>Hint voor morgen: Open de vriezer..." },
    13: { code: "IJS",    answer: "❄️ In de vriezer ligt meer dan alleen ijs... <br>Hint voor morgen: Kijk naar de tijd..." },
    14: { code: "KLOK",   answer: "⏰ Stel de klok in op 24:00 en kijk wat er gebeurt. <br>Hint voor morgen: Volg sporen..." },
    15: { code: "HERT",   answer: "🦌 Volg de rendiersporen naar de zolder. <br>Hint voor morgen: Kijk naar een kaart..." },
    16: { code: "KAART",  answer: "🗺️ De kerstkaart van oma bevat een geheime boodschap. <br>Hint voor morgen: Warm je handen..." },
    17: { code: "VUUR",   answer: "🔥 Warm je handen bij de open haard - kijk in de as. <br>Hint voor morgen: Vier feest!" },
    18: { code: "FEEST",  answer: "🎉 Gefeliciteerd! De finale is onder de tafel. Proost! 🍾" }
};

// Kalender genereren (ALLE dagen zijn zichtbaar en klikbaar)
function generateCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    for (let day = 1; day <= 18; day++) {
        const dayElement = document.createElement("div");
        dayElement.className = "day current"; // ALLE dagen zijn "current" (blauw en klikbaar)
        dayElement.setAttribute("data-day", day);
        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-status"></div>
        `;

        // Voltooid uit localStorage
        if (localStorage.getItem(`day${day}Completed`)) {
            dayElement.classList.add("completed");
            dayElement.querySelector(".day-status").textContent = "✓";
        }

        // Klikhandler
        dayElement.onclick = () => selectDay(day);
        calendar.appendChild(dayElement);
    }
    console.log("Kalender gegenereerd: alle 18 dagen zijn zichtbaar!");
}

// Dag selecteren
function selectDay(day) {
    document.getElementById("selectedDay").textContent = `dag ${day}`;
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
        resultDiv.innerHTML = dayData[day].answer;
        resultDiv.className = "success";

        // Markeer dag als voltooid
        const dayElement = document.querySelector(`.day[data-day="${day}"]`);
        dayElement.classList.add("completed");
        dayElement.querySelector(".day-status").textContent = "✓";
        localStorage.setItem(`day${day}Completed`, "true");
    } else {
        resultDiv.textContent = "❌ Onjuiste code. Probeer opnieuw!";
        resultDiv.className = "error";
    }
}

// Kalender genereren bij laden
document.addEventListener('DOMContentLoaded', generateCalendar);
