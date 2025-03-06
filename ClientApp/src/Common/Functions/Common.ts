export const ObjectToMap = (obj : any) => {
    let map = new Map()
    for (let k of Object.keys(obj)) {
        if (obj[k] instanceof Object) {
            map.set(k, ObjectToMap(obj[k]))
        }
        else {
            map.set(k, obj[k])
        }
    }
    return map
}