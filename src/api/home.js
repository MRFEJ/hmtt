import requery from "@/utils/requery.js"

export function userChannels() {
    return requery({
        url: 'user/channels',
        method: 'get'
    })
}