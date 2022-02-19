let isLeap = (year) => {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if ((year / 100) % 4 === 0) {
                return true;
            }
        }
        else {
            return true;
        }
    }
    return false;
}
let isValid = (date, month, leap) => {
    let valid = false;
    if (month > 0 && month <= 12) {
        if ((month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) && date <= 31 && date >= 1) {
            valid = true;
        }
        else if ((month === 4 || month === 6 || month === 9 || month === 11) && date <= 30 && date >= 1) {
            valid = true;
        }
        else if (month === 2) {
            if (leap && date <= 29 && date >= 1) {
                valid = true;
            }
            else if (!leap && date <= 28 && date >= 1) {
                valid = true;
            }
        }
    }
    return valid;
}

let lyErrorFunc = (month, leap) => {
    if (leap && (month == 1 || month == 2)) {
        return -1;
    }
    return 0;
}

let yearConstantFunc = (year) => {
    let year_const0 = (year / 100) % 4;
    let year_const;
    switch (year_const0) {
        case 0:
            year_const = 6;
            break;
        case 1:
            year_const = 4;
            break;
        case 2:
            year_const = 2;
            break;
        default:
            year_const = 0;
            break;
    }

    return year_const;
}

let monthConstantFunc = (month) => {
    let month_const;
    switch (month) {
        case 1:
            month_const = 0;
            break;
        case 2:
            month_const = 3;
            break;
        case 3:
            month_const = 3;
            break;
        case 4:
            month_const = 6;
            break;
        case 5:
            month_const = 1;
            break;
        case 6:
            month_const = 4;
            break;
        case 7:
            month_const = 6;
            break;
        case 8:
            month_const = 2;
            break;
        case 9:
            month_const = 5;
            break;
        case 10:
            month_const = 0;
            break;
        case 11:
            month_const = 3;
            break;
        default:
            month_const = 5;
            break;
    }

    return month_const;
}

let showDay = (sum, leap) => {
    let day = sum % 7;
    switch (day) {
        case 0:
            console.log("SUNDAY\n");
            break;
        case 1:
            console.log("MONDAY\n");
            break;
        case 2:
            console.log("TUESDAY\n");
            break;
        case 3:
            console.log("WEDNESDAY\n");
            break;
        case 4:
            console.log("THURSDAY\n");
            break;
        case 5:
            console.log("FRIDAY\n");
            break;
        default:
            console.log("SATURDAY\n");
            break;
    }
    if (leap) {
        console.log("\n\tYEAR:\n\tLEAP\n");
    }
    else {
        console.log("\n\tYEAR:\n\tNORMAL\n");
    }
}
let showDayJs = (sum, leap, date, month, year) => {
    let day = sum % 7;
    let dayId;
    switch (day) {
        case 0:
            dayId = 'sun';
            break;
        case 1:
            dayId = 'mon';
            break;
        case 2:
            dayId = 'tue';
            break;
        case 3:
            dayId = 'wed';
            break;
        case 4:
            dayId = 'thu';
            break;
        case 5:
            dayId = 'fri';
            break;
        default:
            dayId = 'sat';
            break;
    }
    let yearType;
    if (leap) {
        yearType = "LEAP";
    }
    else {
        yearType = "NON LEAP";
    }
    document.getElementById("dateOutput").innerHTML = date + "/" + month + "/" + year;
    document.getElementById("dayOutput").innerHTML = dayId;
    document.getElementById("yearOutput").innerHTML = yearType;

    highlight(dayId);

}
let highlight = (dayId) => {
    document.getElementById(dayId).setAttribute("class", "highlightedClass");
}
let calender = (date, month, year) => {
    let leap = isLeap(year);
    if (isValid(date, month, leap)) {
        let monthConst = monthConstantFunc(month);
        let yearConst = yearConstantFunc(year);
        let yearCount = year % 100;
        let leapYearCount = yearCount / 4;
        let lyError = lyErrorFunc(year, month, leap);
        let sum = date + monthConst + leapYearCount + yearCount + yearConst + lyError;

        showDay(sum, leap);
        showDayJs(sum, leap, date, month, year);
    }
    else {
        console.log("\n\tERROR! WRONG DATE GIVEN. TRY AGAIN\n");
        alert("ERROR! WRONG DATE GIVEN. TRY AGAIN");
    }
}

// DOM
document.querySelector("#checkForDay").addEventListener("click", () => {
    let date = parseInt(document.getElementById("dateInput").value, 10);
    let month = parseInt(document.getElementById("monthInput").value, 10);
    let year = parseInt(document.getElementById("yearInput").value, 10);

    calender(date, month, year);
});