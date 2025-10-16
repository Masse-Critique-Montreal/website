'use client'

import { useEffect } from "react"
import qs from 'qs'

export default function ClientT() {

    useEffect(() => {
        const query = qs.stringify({
            filters: {
                slug: { $eq: 'SLUG' }
            },
            populate: {
                blocks: {
                    on: {
                        //'blocks.hero': true,
                        'blocks.text': true,
                        'blocks.note': {
                            populate: {
                                shapes:true
                            }
                        },
                        'blocks.buttons': {
                            populate: {
                                buttons:true
                            }
                        },
                        'blocks.image': {
                            populate: {
                                image:true
                            }
                        }
                    }
                }
            },
            locale: 'fr',
        }, { encodeValuesOnly: true });
    }, [])

    return <></>
}