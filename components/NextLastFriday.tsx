'use client'

export default function NextLastFriday({ locale = 'en', text }: { locale: 'en' | 'fr', text: string }) {

    // Helper to add "st / nd / rd / th"
    const ordinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const getLastFriday = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
      
        // Start at the last day of the month
        const lastDay = new Date(year, month + 1, 0);
      
        // Find how many days to go back to reach Friday (5)
        const day = lastDay.getDay();
        const diff = (day >= 5) ? day - 5 : day + 2;
      
        // Create final date
        const lastFriday = new Date(year, month + 1, 0 - diff);
      
        // Set time to 17:00 (5pm)
        lastFriday.setHours(17, 0, 0, 0);
      
        return lastFriday;
    };

    const formatDate = (locale: 'fr' | 'en' = 'fr'): string => {
        const d = getLastFriday();
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