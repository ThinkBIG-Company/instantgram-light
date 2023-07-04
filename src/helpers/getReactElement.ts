export default function getReactElement(el: any) {
    const $reactPostEl = [...Array.from(el.querySelectorAll("*"))].filter((element) => {
        const instanceKey = Object.keys(element).find((key) => key.includes("Instance") || key.includes("Fiber"))
        const $react = element[instanceKey]
        return $react?.return?.return?.return?.memoizedProps.post ?? false
    })[0]
    const $reactInstanceKey = Object.keys($reactPostEl).find(key => key.includes("Instance") || key.includes("Fiber"))
    const $reactPostNode = $reactPostEl[$reactInstanceKey]

    return $reactPostNode
}