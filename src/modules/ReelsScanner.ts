import { Program } from "../App"
import { Module } from "./Module"
import { MediaType } from "../model/mediaType"
import getElementInViewPercentage from "../helpers/getElementInViewPercentage"

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

    public getUserName($reactPostNode: { return: { return: { return: { memoizedProps: { post: any } } } } }): string {
        const post = $reactPostNode?.return?.return?.return?.memoizedProps.post

        return post?.owner?.username ?? false
    }

    /** @suppress {uselessCode} */
    public async execute(program: Program, callback?: any): Promise<any> {
        let found = false

        /* =====================================
         =              ReelsScanner            =
         ==================================== */
        try {
            // Define default variables
            let mediaEl = null
            let mediaType: MediaType = MediaType.UNDEFINED

            // All grabed feed posts
            let $articles: any

            // Article
            let $article: any

            let mediaUrl: string

            // Scanner begins
            if (mediaEl == null) {
                $articles = document.querySelectorAll('section > main > div > div:has(*)')

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
            }

            if (typeof $article !== 'undefined' || $article !== null || $article !== '') {
                const $reactPostEl = [...Array.from($article.querySelectorAll('*'))].filter((element) => {
                    const instanceKey = Object.keys(element).find((key) => key.includes('Instance') || key.includes('Fiber'))
                    const $react = element[instanceKey]
                    return $react?.return?.return?.return?.memoizedProps.post ?? false
                })[0]
                const $reactInstanceKey = Object.keys($reactPostEl).find(key => key.includes('Instance') || key.includes('Fiber'))
                const $reactPostNode = $reactPostEl[$reactInstanceKey]

                // DON'T MESS WITH ME INSTA!
                const media = $reactPostNode?.return?.return?.return?.memoizedProps?.post

                if (typeof media.dashInfo.video_dash_manifest !== 'undefined' && media.dashInfo.video_dash_manifest !== null) {
                    found = true
                    mediaType = MediaType.Video

                    mediaUrl = media.videoUrl
                } else {
                    found = true
                    mediaType = MediaType.Image

                    mediaUrl = media.src
                }
            }

            callback(found, mediaType, mediaUrl, program)
        } catch (e) {
            console.error(this.getName() + "()", `[instantgram] ${program.VERSION}`, e)
            callback(false, null, program)
        }
        /* =====  End of ReelsScanner ======*/
    }
}