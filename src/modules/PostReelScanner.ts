import { Program } from "../App"
import { Module } from "./Module"
import { MediaType } from "../model/mediaType"

export class PostReelScanner implements Module {
  private selectedSidecarIndex: number

  public getName(): string {
    return "PostReelScanner"
  }

  public getPostId(): string {
    const url = window.location.href
    let regex = /\/p\/([a-zA-Z0-9_-]+)/
    let postId = url.match(regex)?.[1]

    // Fallback, is it a reel?
    if (typeof postId === 'undefined') {
      regex = /\/reel\/([a-zA-Z0-9_-]+)/
      postId = url.match(regex)?.[1]
    }

    return postId
  }

  public getUserName($reactPostNode: { return: { return: { return: { memoizedProps: { post: any } } } } }): string {
    const post = $reactPostNode?.return?.return?.return?.memoizedProps.post

    return post?.owner?.username ?? false
  }

  public unixTimestampToDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000)
    const isoDate = date.toISOString().slice(0, 10)
    const time = date.toISOString().slice(11, 16).replace(':', '-')
    return `${isoDate}--${time}`
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

      // All grabed feed posts
      let $articles: Element | HTMLCollectionOf<HTMLElement>

      // Article
      let $article: any

      let mediaUrl: string

      // Scanner begins
      // The order is very important
      const postId = this.getPostId()

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

        const userName = this.getUserName($reactPostNode)

        // Check requirements are met
        if (postId == null || userName == null) {
          return
        }
        // END

        // DON'T MESS WITH ME INSTA!
        if ($reactPostNode?.return?.return?.return?.memoizedProps?.post?.isSidecar || ($reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren && $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren.length > 0)) {
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
      }

      callback(found, mediaType, mediaUrl, program)
    } catch (e) {
      console.error(this.getName() + "()", `[instantgram-light] ${program.VERSION}`, e)
      callback(false, null, program)
    }
    /* =====  End of PostScanner ======*/
  }
}