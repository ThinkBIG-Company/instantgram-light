import { Program } from "../App"
import { Module } from "./Module"
import { MediaType } from "../model/mediaType"
import getElementInViewPercentage from "../helpers/getElementInViewPercentage"

export class FeedScanner implements Module {
  private selectedSidecarIndex: number

  public getName(): string {
    return "FeedScanner"
  }

  /** @suppress {uselessCode} */
  public async execute(program: Program, callback?: any): Promise<any> {
    let found = false

    /* =====================================
     =              FeedScanner            =
     ==================================== */
    try {
      // Define default variables
      let mediaEl = null
      let mediaType: MediaType = MediaType.UNDEFINED
      let mediaUrl: string
      let mediaInfo: any

      // All grabed feed posts
      let $articles: Element | HTMLCollectionOf<HTMLElement>

      // Article
      let $article: any

      // Scanner begins
      if (mediaEl == null) {
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
      }

      if (typeof $article !== 'undefined' || $article !== null || $article !== '') {
        const $reactPostEl = [...Array.from($article.querySelectorAll('*'))].filter((element) => {
          const instanceKey = Object.keys(element).find((key) => key.includes('Instance') || key.includes('Fiber'))
          const $react = element[instanceKey]
          return $react?.return?.return?.return?.memoizedProps.post ?? false
        })[0]
        const $reactInstanceKey = Object.keys($reactPostEl).find(key => key.includes('Instance') || key.includes('Fiber'))
        const $reactPostNode = $reactPostEl[$reactInstanceKey]
        const post = $reactPostNode?.return?.return?.return?.memoizedProps?.post

        // DON'T MESS WITH ME INSTA!
        // If any adblocker active dont grab it
        if ($article.getBoundingClientRect().height < 40) {
          return
        }
        if (program?.settingsJSON?.settings?.[0]?.value === false && post?.isSponsored) {
          return
        }

        if (post?.isSidecar || (post?.sidecarChildren && post?.sidecarChildren.length > 0)) {
          mediaInfo = post

          found = true
          mediaType = MediaType.Carousel

          // Sometimes instagram pre-selects image indexes on carousels
          // to not confuse the user find the selected index
          const controlElements = $article.querySelectorAll("div._aamj._acvz._acnc._acng div")
          controlElements.forEach((div: { classList: string | any[] }, i: number) => {
            if (div.classList.length === 2) {
              this.selectedSidecarIndex = i
              return
            }
          })

          if (typeof post?.sidecarChildren[this.selectedSidecarIndex].dashInfo.video_dash_manifest !== 'undefined' && post?.sidecarChildren[this.selectedSidecarIndex].dashInfo.video_dash_manifest !== null) {
            mediaUrl = post?.sidecarChildren[this.selectedSidecarIndex].videoUrl
          } else {
            mediaUrl = post?.sidecarChildren[this.selectedSidecarIndex].src
          }
        } else {
          // Single image/video
          mediaInfo = post

          if (typeof mediaInfo.dashInfo.video_dash_manifest !== "undefined" && mediaInfo.dashInfo.video_dash_manifest !== null) {
            found = true
            mediaType = MediaType.Video

            mediaUrl = mediaInfo.videoUrl
          } else {
            found = true
            mediaType = MediaType.Image

            mediaUrl = mediaInfo.src
          }
        }
      }

      callback(found, mediaType, mediaUrl, mediaInfo, program)
    } catch (e) {
      console.error(this.getName() + "()", `[instantgram-light] ${program.VERSION}`, e)
      callback(false, null, null, null, program)
    }
    /* =====  End of FeedScanner ======*/
  }
}