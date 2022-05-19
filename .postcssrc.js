module.exports = {
    plugins: {
        // // vurcil 已经内部配置
        // 'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'iOS >= 7']
        // },
        'postcss-pxtorem': {
            // 根据设计稿配置根字号75还是37.5 
            // rootValue:37.5,
            rootValue({ file }) { 
            return file.indexOf("vant") !== -1?37.5:75
            },
            propList: ['*']
        }
    }
}
// module.exports = ({ file }) => {
//     let remUnit
//     if (file.indexOf("vant") !== -1) {
//         remUnit = 37.5
//     } else {
//         remUnit = 75
//     }
//     return {
//         plugins: {
//             'postcss-pxtorem': {
//                 rootValue: remUnit,
//                 propList: ['*']
//             },
//             'autoprefixer': {}
//         }
//     }
// }