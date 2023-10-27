import { Program } from "../App"
import { Module } from "./Module"
import { getElementInViewPercentage, generateModalBody } from "../helpers/utils"

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
                let v = await generateModalBody($article, program)
                modalBody += v.modalBody

                program.foundMediaObj = {
                    found: v.found,
                    mediaType: v.mediaType,
                    mediaInfo: v.mediaInfo,
                    modalBody: modalBody,
                    selectedIndex: v.selectedIndex,
                    userName: v.userName
                }
            }

            callback(program)
        } catch (e) {
            console.error(this.getName() + "()", `[${program.NAME}] ${program.VERSION}`, e)
            program.foundMediaObj = {
                found: false,
                mediaType: undefined,
                mediaInfo: undefined,
                modalBody: undefined,
                selectedIndex: undefined,
                userName: undefined
            }
            callback(program)
        }
        /* =====  End of ReelsScanner ======*/
    }
}