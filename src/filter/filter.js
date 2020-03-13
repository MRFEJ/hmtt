import Vue from "vue"
// 导包
import dayjs from "dayjs"
// 导入中文翻译
import 'dayjs/locale/zh-cn' 
dayjs.locale('zh-cn') // 全局使用
// 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)


Vue.filter('filterData', function (data) {

    return dayjs().to(dayjs(data))

})