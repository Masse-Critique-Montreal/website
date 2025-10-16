import { Data } from "@strapi/strapi";

export const uri = {
    img: (url: string) => `${process.env.HOST}${url}`
};

export async function getHome(locale: 'en'|'fr'): Promise<Data.Entity<'api::home.home'> | null> {
    const query = `populate[seo][populate][images]=true&populate[Blocks][on][blocks.hero]=true&populate[Blocks][on][blocks.text]=true&populate[Blocks][on][blocks.note][populate][shapes]=true&populate[Blocks][on][blocks.buttons][populate][buttons]=true&populate[Blocks][on][blocks.image][populate][image]=true&locale=${locale}`

    return (await (fetch(`${process.env.HOST}/api/home?${query}`, {
        method: 'GET',
    })
        .then(r => r.json()))).data
}

export async function getPages(): Promise<Data.Entity<'api::page.page'>[] | null> {
    const query = 'populate[blocks][on][blocks.text]=true&populate[blocks][on][blocks.note][populate][shapes]=true&populate[blocks][on][blocks.buttons][populate][buttons]=true&populate[blocks][on][blocks.image][populate][image]=true&locale=*'
     return (await (fetch(`${process.env.HOST}/api/pages?${query}`, {
        method: 'GET',
    })
        .then(r => r.json()))).data
}

export async function getPage(id:string, locale:'en'|'fr'): Promise<Data.Entity<'api::page.page'> | null> {
    const query = `populate[seo][populate][images]=true&filters[slug][$eq]=${id}&populate[blocks][on][blocks.text]=true&populate[blocks][on][blocks.note][populate][shapes]=true&populate[blocks][on][blocks.buttons][populate][buttons]=true&populate[blocks][on][blocks.image][populate][image]=true&locale=${locale}`

    
    return (await (fetch(`${process.env.HOST}/api/pages?${query}`, {
        method: 'GET',
    })
        .then(r => r.json()))).data[0]
}