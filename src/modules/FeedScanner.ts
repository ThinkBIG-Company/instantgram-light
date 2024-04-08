import { Program } from "../App"
import { Module } from "./Module"
import { getElementInViewPercentage, generateModalBody } from "../helpers/utils"

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
                // DON'T MESS WITH ME INSTA!
                // If any adblocker active dont grab it
                if ($article.getBoundingClientRect().height < 40) {
                    return
                }

                let v = await generateModalBody($article, program)

                program.foundMediaObj = {
                    found: v.found,
                    mediaType: v.mediaType,
                    mediaInfo: v.mediaInfo,
                    modalBody: v.modalBody,
                    selectedSliderIndex: v.selectedSliderIndex,
                    userName: v.userName
                }
            }

            callback(program)
        } catch (e) {
            //console.error(this.getName() + "()", `[${program.NAME}] ${program.VERSION}`, e)
            console.error(this.getName() + "()", e)
            program.foundMediaObj = {
                found: false,
                mediaType: undefined,
                mediaInfo: undefined,
                modalBody: undefined,
                selectedSliderIndex: undefined,
                userName: undefined
            }
            callback(program)
        }
        /* =====  End of FeedScanner ======*/
    }
}