import { Program } from "../App"
import { Module } from "./Module"
import { MediaType } from "../model/mediaType"

export class PostReelScanner implements Module {
  private selectedSidecarIndex: number

  public getName(): string {
    return "PostReelScanner"
  }

  /** @suppress {uselessCode} */
  public async execute(program: Program, callback?: any): Promise<any> {
    let found = false

    /* =====================================
     =              PostScanner            =
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

        // For modal
        // Will be in the future completly removed
        if (document.querySelectorAll('[role="dialog"]').length > 0) {
          $article = document.querySelectorAll('[role="dialog"]')[1]
        } else {
          $article = document.querySelector("section main > div > :first-child > :first-child")
        }
      }

      if (typeof $article !== 'undefined' || $article !== null || $article !== '') {
        const $reactPostEl = [...Array.from(document.querySelectorAll('*'))].filter((element) => {
          const instanceKey = Object.keys(element).find((key) => key.includes('Instance') || key.includes('Fiber'))
          const $react = element[instanceKey]
          return $react?.return?.return?.return?.memoizedProps.post ?? false
        })[0]
        const $reactInstanceKey = Object.keys($reactPostEl).find(key => key.includes('Instance') || key.includes('Fiber'))
        const $reactPostNode = $reactPostEl[$reactInstanceKey]

        // DON'T MESS WITH ME INSTA!
        if ($reactPostNode?.return?.return?.return?.memoizedProps?.post?.isSidecar || ($reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren && $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren.length > 0)) {
          mediaInfo = $reactPostNode?.return?.return?.return?.memoizedProps?.post

          found = true
          mediaType = MediaType.Carousel

          // Sometimes instagram pre-selects image position on carousels
          // to not confuse the user find the selected index
          const controlElements = $article.querySelectorAll('div._aamj._acvz._acnc._acng div')
          controlElements.forEach((div: { classList: string | any[] }, i: number) => {
            if (div.classList.length === 2) {
              this.selectedSidecarIndex = i
              return
            }
          })

          if (typeof $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren[this.selectedSidecarIndex].dashInfo.video_dash_manifest !== 'undefined' && $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren[this.selectedSidecarIndex].dashInfo.video_dash_manifest !== null) {
            mediaUrl = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren[this.selectedSidecarIndex].videoUrl
          } else {
            mediaUrl = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren[this.selectedSidecarIndex].src
          }
        } else {
          // Single image/video
          mediaInfo = $reactPostNode?.return?.return?.return?.memoizedProps?.post

          if (typeof mediaInfo.dashInfo.video_dash_manifest !== 'undefined' && mediaInfo.dashInfo.video_dash_manifest !== null) {
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
      callback(false, null, program)
    }
    /* =====  End of PostScanner ======*/
  }
}