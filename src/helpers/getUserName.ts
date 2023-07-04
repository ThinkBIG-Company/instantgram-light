export default function getUserName(element: Document, post: any): string {
    if (post?.owner?.username) {
        return post?.owner?.username as string
    } else {
        const userNameContainer = element.querySelectorAll("header a")[1]
        if (userNameContainer) {
            return userNameContainer.textContent
        } else {
            return undefined
        }
    }
}