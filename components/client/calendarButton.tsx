'use client'
import { Data } from "@strapi/strapi";
import { Button } from "../ui/button";
import Link from "next/link";

/**
 * Returns the closest last Friday of the month for a given date and sets the time.
 * @param {Date} [date=new Date()] - Reference date (default is now)
 * @param {number} [hour=0] - Hour to set (0-23)
 * @param {number} [minute=0] - Minute to set (0-59)
 * @param {number} [second=0] - Second to set (0-59)
 * @returns {Date} - Date object representing the last Friday of the month at specified time
 */
function getLastFridayOfMonth(date = new Date(), hour = 17, minute = 0, second = 0) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);

    // Find last Friday
    const lastFriday = new Date(lastDay);
    const offset = (lastFriday.getDay() + 2) % 7;
    lastFriday.setDate(lastFriday.getDate() - offset);

    // Set time
    lastFriday.setHours(hour, minute, second, 0);

    return lastFriday;
}

/**
 * Adds hours (can be fractional) to a date and returns a new Date object.
 * @param {Date} date - The date to add hours to
 * @param {number} hours - Number of hours to add (can be negative or fractional)
 * @returns {Date} - New Date object with added hours
 */
function addHours(date: Date, hours: number) {
    const result = new Date(date); // clone to avoid mutating input
    result.setTime(result.getTime() + hours * 60 * 60 * 1000);
    return result;
}


function formatDateForGoogleCal(date: Date) {
    // Google Calendar wants UTC time
    function pad(n) { return n < 10 ? '0' + n : n; }
    return [
        date.getUTCFullYear(),
        pad(date.getUTCMonth() + 1),
        pad(date.getUTCDate()),
        'T',
        pad(date.getUTCHours()),
        pad(date.getUTCMinutes()),
        pad(date.getUTCSeconds()),
        'Z'
    ].join('');
}


export default function CalendarButton({ button }: { button: Data.Component<'inputs.button'> }) {
    const getCalendarLink = () => {
        const cal_title = 'Masse Critique Montreal';
        const cal_description = 'Chaque mois, nous sommes des centaines de cyclistes prenant la rue pour une balade mani-festive afin de célébrer notre amour pour le vélo.' +
            ' Nous revendiquons le droit à des déplacements sécuritaires, une circulation apaisée et une ville plus conviviale.'+
            '\n'+
            'Consultez notre site web: https://massecritiquemtl.ca';
    
        // Example for Montreal - specify actual event location
        const cal_location = "Monument to Sir George-Étienne Cartier, 4200 Av. du Parc, Montréal, QC H2W 1S8, Canada"; // or coordinates as a string
    
        const TIMEZONE = 4; // GMT-4;

        const currentDate = new Date();
        const cal_start = getLastFridayOfMonth(currentDate, 17 + TIMEZONE, 0, 0);
        const cal_end = addHours(cal_start, 3);
    
        return `https://www.google.com/calendar/render?action=TEMPLATE&` +
            `text=${encodeURIComponent(cal_title)}` +
            `&dates=${formatDateForGoogleCal(cal_start)}/${formatDateForGoogleCal(cal_end)}` +
            `&details=${encodeURIComponent(cal_description)}` +
            `&location=${encodeURIComponent(cal_location)}`;
    }

    return (
        <Button
            size="lg"

            variant={button.variant}
            className="normal-case min-w-48 sm:min-w-none"
            asChild
        >
            <Link target="_blank" href={getCalendarLink() || button.href || '#'}>{button.label}</Link>
        </Button>
    )
}