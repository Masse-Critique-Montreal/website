'use client'

export default function NextLastFriday({ locale = 'en', text }: { locale: 'en' | 'fr', text: string }) {

    const ordinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const getLastFriday = (year: number, month: number): Date => {
        const lastDay = new Date(year, month + 1, 0);
        const day = lastDay.getDay();
        const diff = (day >= 5) ? day - 5 : day + 2;
        const lastFriday = new Date(year, month + 1, 0 - diff);
        lastFriday.setHours(17, 0, 0, 0);
        return lastFriday;
    };

    const getNextLastFriday = (): Date => {
        const now = new Date();
        const lastFriday = getLastFriday(now.getFullYear(), now.getMonth());

        // If we've passed this month's last friday, get next month's
        if (now > lastFriday) {
            const nextMonth = now.getMonth() === 11 ? 0 : now.getMonth() + 1;
            const nextYear = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
            return getLastFriday(nextYear, nextMonth);
        }

        return lastFriday;
    };

    const formatDate = (locale: 'fr' | 'en' = 'fr'): string => {
        const d = getNextLastFriday();
        const day = d.getDate();
        const monthLongFr = new Intl.DateTimeFormat('fr-CA', { month: 'long' }).format(d);
        const monthLongEn = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(d);

        const hours24 = d.getHours();
        const hours12 = hours24 % 12 || 12;
        const ampm = hours24 < 12 ? "am" : "pm";

        if (locale === 'fr') {
            return `${day} ${monthLongFr} à ${hours24}h`;
        }

        if (locale === 'en') {
            return `${ordinal(day)} of ${monthLongEn} at ${hours12} ${ampm}`;
        }

        return '';
    };

    return <span className="text-secondary brightness-125">{text.replace('[next-last-friday]', formatDate(locale))}</span>;
}