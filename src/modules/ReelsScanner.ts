import { Program } from "../App"
import { Module } from "./Module"
import { MediaType } from "../model/mediaType"
import getElementInViewPercentage from "../helpers/getElementInViewPercentage"
import generateModalBody from "../helpers/generateModalBody"
import getReactElement from "../helpers/getReactElement"
import getUserName from "../helpers/getUserName"

export class ReelsScanner implements Module {
    public getName(): string {
        return "ReelsScanner"
    }

    public getPostId(): string {
        const url = window.location.href
        const regex = /\/p\/([a-zA-Z0-9_-]+)/
        const postId = url.match(regex)?.[1]

        return postId
    }

    /** @suppress {uselessCode} */
    public async execute(program: Program, callback?: any): Promise<any> {
        /* =====================================
         =        ReelsScanner                 =
         ==================================== */
        try {
            // Define default variables
            let modalBody = ""

            // All grabed feed posts
            let $articles: any

            // Article
            let $article: any

            // Scanner begins
            $articles = document.querySelectorAll('section > main > div > div')
            $articles = Array.from($articles).filter(function (element) {
                return (<any>element).children.length > 0
            })

            let mediaElInfos: any[] = []
            // Find needed post
            for (let i1 = 0; i1 < $articles.length; i1++) {
                let mediaEl = $articles[i1]

                if (mediaEl != null && typeof mediaEl.getBoundingClientRect() != null) {
                    let elemVisiblePercentage = getElementInViewPercentage(mediaEl)
                    mediaElInfos.push({ i1, mediaEl, elemVisiblePercentage })
                } else {
                    mediaElInfos.push({ i1, mediaEl, elemVisiblePercentage: 0 })
                }
            }

            let objMax = mediaElInfos.reduce((max, current) => max.elemVisiblePercentage > current.elemVisiblePercentage ? max : current)
            $article = $articles[objMax.i1]

            if (typeof $article !== 'undefined' || $article !== null || $article !== '') {
                const $reactPostNode = getReactElement($article)
                const mediaInfo = $reactPostNode?.return?.return?.return?.memoizedProps?.post
                const userName = getUserName(document, mediaInfo)

                let v = generateModalBody($article, userName, null, program)
                modalBody += v.modalBody

                program.foundMediaObj = {
                    found: v.found,
                    mediaType: v.mediaType,
                    mediaInfo: v.mediaInfo,
                    modalBody: modalBody,
                    selectedIndex: v.selectedIndex
                }
            }

            callback(program)
        } catch (e) {
            console.error(this.getName() + "()", `[instantgram] ${program.VERSION}`, e)
            program.foundMediaObj = {
                found: false,
                mediaType: undefined,
                mediaURL: undefined,
                mediaInfo: undefined
            }
            callback(program)
        }
        /* =====  End of ReelsScanner ======*/
    }
}