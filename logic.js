
// to check the year is leap or not
let isLeap = (year) => {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if ((Math.floor(year / 100)) % 4 === 0) {
                return true;
            }
        }
        else {
            return true;
        }
    }
    return false;
}

// to check the validity of the given date
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

// to generate the month constant
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

// to generate the year constant
let yearConstantFunc = (year) => {
    let year_const0 = (Math.floor(year / 100)) % 4;
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

// to correct the leap year error
let lyErrorFunc = (month, leap) => {
    if (leap && (month === 1 || month === 2)) {
        return -1;
    }
    return 0;
}

// displaying day
let display = (sum, leap, date, month, year) => {
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
        yearType = "Leap";
    }
    else {
        yearType = "Non Leap";
    }
    document.getElementById("dateOutput").innerHTML = date + "/" + month + "/" + year;
    document.getElementById("dayOutput").innerHTML = document.getElementById(dayId).innerHTML;
    document.getElementById("yearOutput").innerHTML = yearType;

    highlight(dayId);

}

// to highlight the day box
let highlight = (dayId) => {
    for (var i = 0; i < 7; i++) {
        document.getElementsByClassName('daysToShow')[i].classList.remove("highlightedClass");
        // document.getElementsByClassName('daysToShow')[i].classList.add("black");
    }
    // document.getElementById(dayId).classList.remove("black");
    document.getElementById(dayId).classList.add("highlightedClass");
}

// head function
let calender = (date, month, year) => {
    let leap = isLeap(year);
    if (isValid(date, month, leap)) {
        let monthConst = monthConstantFunc(month);
        let yearConst = yearConstantFunc(year);
        let yearCount = year % 100;
        let leapYearCount = Math.floor(yearCount / 4);
        let lyError = lyErrorFunc(month, leap);
        let sum = date + monthConst + leapYearCount + yearCount + yearConst + lyError;
        display(sum, leap, date, month, year);
    }
    else {
        alert("ERROR! WRONG DATE GIVEN. TRY AGAIN");
        location.reload();
    }
}

// DOM
// int main()
document.querySelector("#checkForDay").addEventListener("click", () => {
    let date = parseInt(document.getElementById("dateInput").value, 10);
    let month = parseInt(document.getElementById("monthInput").value, 10);
    let year = parseInt(document.getElementById("yearInput").value, 10);

    calender(date, month, year);
});