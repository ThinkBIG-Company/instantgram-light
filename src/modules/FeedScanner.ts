import { Program } from "../App"
import { Module } from "./Module"
import { MediaType } from "../model/mediaType"
import getElementInViewPercentage from "../helpers/getElementInViewPercentage"
import getUserName from "../helpers/getUserName"
import generateModalBody from "../helpers/generateModalBody"
import getReactElement from "../helpers/getReactElement"

export class FeedScanner implements Module {
    public getName(): string {
        return "FeedScanner"
    }

    /** @suppress {uselessCode} */
    public async execute(program: Program, callback?: any): Promise<any> {
        /* =====================================
         =              FeedScanner            =
         ==================================== */
        try {
            // Define default variables
            // All grabed feed posts
            let $articles: Element | HTMLCollectionOf<HTMLElement>

            // Article
            let $article: any

            // Scanner begins
            $articles = document.getElementsByTagName("article")

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

                // DON'T MESS WITH ME INSTA!
                // If any adblocker active dont grab it
                if ($article.getBoundingClientRect().height < 40) {                    
                    return
                }
                if (program?.settingsJSON?.settings?.[0]?.value === false && mediaInfo?.isSponsored) {                    
                    program.foundMediaObj = {
                        found: true,
                        mediaType: MediaType.Ad,
                        mediaURL: undefined,
                        mediaInfo: undefined
                    }

                    callback(program)
                    return false
                }

                let v = generateModalBody($article, userName, null, program)

                program.foundMediaObj = {
                    found: v.found,
                    mediaType: v.mediaType,
                    mediaInfo: v.mediaInfo,
                    modalBody: v.modalBody,
                    selectedIndex: v.selectedIndex
                }
            }

            callback(program)
        } catch (e) {
            console.error(this.getName() + "()", `[instantgram-light] ${program.VERSION}`, e)
            program.foundMediaObj = {
                found: false,
                mediaType: undefined,
                mediaURL: undefined,
                mediaInfo: undefined
            }
            callback(program)
        }
        /* =====  End of FeedScanner ======*/
    }
}