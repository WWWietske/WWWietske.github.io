// Object met codes en bijbehorende hints per dag (7 t/m 24 december)
const dayData = {
    7:   { code: "SNEEUW", answer: "🔑 De sleutel ligt onder de kerstboom. <br>Hint voor morgen: Zoek iets dat brandt..." },
    8:   { code: "KAARS",  answer: "🕯️ Zoek bij het licht... <br>Hint voor morgen: Kijk omhoog!" },
    9:   { code: "STER",   answer: "⭐ Kijk omhoog, naar de top van de boom. <br>Hint voor morgen: Luister goed..." },
    10:  { code: "BEL",    answer: "🔔 Luister goed: het geluid komt uit de keuken. <br>Hint voor morgen: Check de deur..." },
    11:  { code: "KRANS",  answer: "🌿 Check de deur waar de krans hangt. <br>Hint voor morgen: Het kleinste pakje..." },
    12:  { code: "PAKJE",  answer: "🎁 Het kleinste pakje bevat een aanwijzing. <br>Hint voor morgen: Zoek een magisch wezen..." },
    13:  { code: "ELF",    answer: "🧝‍♂️ De elf heeft iets verstopt in de boekenkast. <br>Hint voor morgen: Zing een liedje..." },
    14:  { code: "LIED",   answer: "🎵 Zing het derde couplet van 'Stille Nacht' hardop. <br>Hint voor morgen: Zoek iets lekkers..." },
    15:  { code: "KOOKIE", answer: "🍪 Er zit een briefje in de koekjestrommel. <br>Hint voor morgen: Kijk naar iets roods..." },
    16:  { code: "LINT",   answer: "🎀 Het rode lint leidt naar de volgende puzzel. <br>Hint voor morgen: Zoek een dier..." },
    17:  { code: "KALF",   answer: "🐄 Zoek waar het kerstkalfje staat (schuur?). <br>Hint voor morgen: Schrijf iets op..." },
    18:  { code: "WENS",   answer: "✨ Schrijf je kerstwens op en draai hem om. <br>Hint voor morgen: Open de vriezer..." },
    19:  { code: "IJS",    answer: "❄️ In de vriezer ligt meer dan alleen ijs... <br>Hint voor morgen: Kijk naar de tijd..." },
    20:  { code: "KLOK",   answer: "⏰ Stel de klok in op 24:00 en kijk wat er gebeurt. <br>Hint voor morgen: Volg sporen..." },
    21:  { code: "HERT",   answer: "🦌 Volg de rendiersporen naar de zolder. <br>Hint voor morgen: Kijk naar een kaart..." },
    22:  { code: "KAART",  answer: "🗺️ De kerstkaart van oma bevat een geheime boodschap. <br>Hint voor morgen: Warm je handen..." },
    23:  { code: "VUUR",   answer: "🔥 Warm je handen bij de open haard - kijk in de as. <br>Hint voor morgen: Vier feest!" },
    24:  { code: "KADO",   answer: "🎁🎉 Gefeliciteerd! De finale is onder de tafel. Proost! 🍾" }
};

// Huidige datum bepalen
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; // Januari = 1, December = 12

// Kalender genereren (alleen huidige en vorige dagen zijn klikbaar)
function generateCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    // Genereer dagen 7 t/m 24 december
    for (let day = 7; day <= 24; day++) {
        const dayElement = document.createElement("div");
        dayElement.className = "day";

        // Bepaal de status van de dag (verleden, huidige dag, toekomst)
        if (currentMonth === 12) {
            if (day < currentDay) {
                dayElement.classList.add("past"); // Verleden (roze)
            } else if (day === currentDay) {
                dayElement.classList.add("current"); // Huidige dag (blauw)
            } else {
                dayElement.classList.add("future"); // Toekomst (grijs, niet klikbaar)
            }
        } else {
            // Als het niet december is, maak alle dagen klikbaar voor testen
            dayElement.classList.add("current");
        }

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

        // Klikhandler alleen voor huidige en vorige dagen
        if ((currentMonth === 12 && day <= currentDay) || currentMonth !== 12) {
            dayElement.onclick = () => selectDay(day);
        }

        calendar.appendChild(dayElement);
    }
    console.log(`Kalender gegenereerd: vandaag is ${currentDay} december (als het december is).`);
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
