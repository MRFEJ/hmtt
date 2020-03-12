import requery from "@/utils/requery.js"

// 获取用户频道
export function userChannels() {
    return requery({
        url: 'user/channels',
        method: 'get'
    })
}

// 获取频道里面数据列表
export function userArticles(params) {
    return requery({
        url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
        method: 'get',
        params
    })
}


// 获取宣布频道
export function userAllChannels() {
    return requery({
        url: 'channels',
        method: 'get'
    })
}
