/*Kanha Bhawani*/
#include <iostream>
using namespace std;

/* FUNCTIONS */
/*
    isLeap()
    ly_error_func()
    year_constant_func()
    month_constant_func()
    show_day()
    isValid()
    calender()
    main()
*/

bool isLeap(int *year)
{
    bool leap = false;
    if (*year % 4 == 0)
    {
        if (*year % 100 == 00)
        {
            if ((*year / 100) % 4 == 0)
            {
                leap = true;
            }
        }
        else
        {
            leap = true;
        }
    }

    return leap;
}

int ly_error_func(int *year, int *month, bool leap)
{
    if (leap && (*month == 1 || *month == 2))
    {
        return -1;
    }
    return 0;
}

int year_constant_func(int *year)
{
    int year_const0 = (*year / 100) % 4;
    int year_const;
    switch (year_const0)
    {
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

int month_constant_func(int *month)
{
    int month_const;
    switch (*month)
    {
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

void show_day(int *sum, bool leap)
{
    int day = *sum % 7;
    cout << "\n\t";
    switch (day)
    {
    case 0:
        cout << "SUNDAY\n";
        break;
    case 1:
        cout << "MONDAY\n";
        break;
    case 2:
        cout << "TUESDAY\n";
        break;
    case 3:
        cout << "WEDNESDAY\n";
        break;
    case 4:
        cout << "THURSDAY\n";
        break;
    case 5:
        cout << "FRIDAY\n";
        break;
    default:
        cout << "SATURDAY\n";
        break;
    }
    if (leap)
    {
        cout << "\n\tYEAR:\n\tLEAP\n";
    }
    else
    {
        cout << "\n\tYEAR:\n\tNORMAL\n";
    }
}

bool isValid(int *date, int *month, bool leap)
{
    bool valid = false;
    if (*month > 0 && *month <= 12)
    {
        if ((*month == 1 || *month == 3 || *month == 5 || *month == 7 || *month == 8 || *month == 10 || *month == 12) && *date <= 31 && *date >= 1)
        {
            valid = true;
        }
        else if ((*month == 4 || *month == 6 || *month == 9 || *month == 11) && *date <= 30 && *date >= 1)
        {
            valid = true;
        }
        else if (*month == 2)
        {
            if (leap && *date <= 29 && *date >= 1)
            {
                valid = true;
            }
            else if (!leap && *date <= 28 && *date >= 1)
            {
                valid = true;
            }
        }
    }
    return valid;
}

void calender(int *date, int *month, int *year)
{
    bool leap = isLeap(year);
    if (isValid(date, month, leap))
    {
        int month_const = month_constant_func(month);
        int year_const = year_constant_func(year);
        int year_count = *year % 100;
        int leap_year_count = year_count / 4;
        int ly_error = ly_error_func(year, month, leap);
        int sum = *date + month_const + leap_year_count + year_count + year_const + ly_error;

        show_day(&sum, leap);
    }
    else
    {
        cout << "\n\tERROR! WRONG DATE GIVEN. TRY AGAIN\n";
    }
}

/*  MAIN FUNCTION */
int main()
{
repeat:
    int date, month, year; // date , month, year
    system("cls");
    cout << "\n\n========================================================\n\t\t\tCALENDER\n========================================================\n";
    cout << "\n\n\t'DD/MM/YYYY'";
    cout << "\n\n\tENTER DD: ";
    cin >> date;
    cout << "\n\tENTER MM: ";
    cin >> month;
    cout << "\n\tENTER YYYY: ";
    cin >> year;
    cout << "\n\n\t=========================";
    cout << "\n\tDATE:\n\t" << date << "/" << month << "/" << year << "\n\n\tDAY:";
    calender(&date, &month, &year);
    cout << "\t=========================\n";

    int again;
    cout << "\n\tAGAIN: PRESS 1";
    cout << "\n\tEXIT: PRESS 0\n\t";
    cin >> again;
    if (again)
    {
        goto repeat;
    }

    return 0;
}