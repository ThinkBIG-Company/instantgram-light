import { Program } from "../App"
import { Module } from "./Module"
import { MediaType } from "../model/mediaType"

export class StoriesScanner implements Module {
  public getName(): string {
    return "StoriesScanner"
  }

  public getUserName(element: Document): string | undefined {
    let userName: string | undefined

    const userNameContainer = element.querySelectorAll('header a')[1]
    if (userNameContainer) {
      userName = userNameContainer.textContent
    }

    return userName
  }

  public unixTimestampToDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000)
    const isoDate = date.toISOString().slice(0, 10)
    const time = date.toISOString().slice(11, 16).replace(':', '-')
    return `${isoDate}--${time}`
  }

  public pauseCurrentStory() {
    // Select the button element with SVG viewBox="0 0 48 48"
    let button = document.querySelector('button._abl- svg[viewBox="0 0 48 48"]')

    // Trigger a click event on the button if it exists
    if (button) {
      button.closest('button').click()
    }
  }

  /** @suppress {uselessCode} */
  public async execute(program: Program, callback?: any): Promise<any> {
    let found = false

    /* =====================================
     =            StoriesScanner           =
     ==================================== */
    try {
      // Define default variables
      let mediaType: MediaType = MediaType.UNDEFINED

      let mediaUrl: string

      // Container
      let $container = document.querySelector("body > div:nth-child(2)")
      // Scanner begins
      if ($container) {
        const userName = this.getUserName(document)

        // Check requirements are met
        if (userName == null) {
          return
        }
        // END

        // Detect right frontend
        let multipleStoriesCount = $container.querySelector("section > div > div").childElementCount

        // Specific selector for each frontend
        if (multipleStoriesCount > 1) {
          let stories: any = $container.querySelector("section > div > div").childNodes

          for (let i = 0; i < (<any>stories).length; i++) {
            let transformStyle = (<any>stories[i]).style.transform

            if (<any>stories[i].childElementCount > 0 && transformStyle.includes('scale(1)')) {
              // Pause any playing videos before show modal
              this.pauseCurrentStory()

              const $reactPostEl = [...Array.from(stories[i].querySelectorAll('*'))].filter((element) => {
                const instanceKey = Object.keys(element).find((key) => key.includes('Instance') || key.includes('Fiber'))
                const $react = element[instanceKey]
                return $react?.return?.return?.return?.memoizedProps.post ?? false
              })[0]
              const $reactInstanceKey = Object.keys($reactPostEl).find(key => key.includes('Instance') || key.includes('Fiber'))
              const $reactPostNode = $reactPostEl[$reactInstanceKey]

              // DON'T MESS WITH ME INSTA!
              if ($reactPostNode?.return?.return?.return?.memoizedProps?.post?.isSidecar || ($reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren && $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren.length > 0)) {
                found = true
                mediaType = MediaType.Carousel

                for (let sC = 0; sC < $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren.length; sC++) {
                  const node = $reactPostNode?.return?.return?.return?.memoizedProps?.post
                  const scMedia = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren[sC]

                  if (typeof scMedia.dashInfo.video_dash_manifest !== 'undefined' && scMedia.dashInfo.video_dash_manifest !== null) {
                    found = true
                    mediaType = MediaType.Video

                    mediaUrl = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.videoUrl
                  } else {
                    found = true
                    mediaType = MediaType.Image

                    mediaUrl = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.src
                  }
                }
              } else {
                // Single image/video
                const media = $reactPostNode?.return?.return?.return?.memoizedProps?.post

                if (typeof media.dashInfo.video_dash_manifest !== 'undefined' && media.dashInfo.video_dash_manifest !== null) {
                  found = true
                  mediaType = MediaType.Video

                  mediaUrl = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.videoUrl
                } else {
                  found = true
                  mediaType = MediaType.Image

                  mediaUrl = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.src
                }
              }

              break
            }
          }
        } else {
          let story: any = $container.querySelector("section section").parentElement.firstChild
          // Pause any playing videos before show modal
          this.pauseCurrentStory()

          const $reactPostEl = [...Array.from(story.querySelectorAll('*'))].filter((element) => {
            const instanceKey = Object.keys(element).find((key) => key.includes('Instance') || key.includes('Fiber'))
            const $react = element[instanceKey]
            return $react?.return?.return?.return?.memoizedProps.post ?? false
          })[0]
          const $reactInstanceKey = Object.keys($reactPostEl).find(key => key.includes('Instance') || key.includes('Fiber'))
          const $reactPostNode = $reactPostEl[$reactInstanceKey]

          if ($reactPostNode?.return?.return?.return?.memoizedProps?.post?.isSidecar || ($reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren && $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren.length > 0)) {
            found = true
            mediaType = MediaType.Carousel

            for (let sC = 0; sC < $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren.length; sC++) {
              const node = $reactPostNode?.return?.return?.return?.memoizedProps?.post
              const scMedia = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.sidecarChildren[sC]

              if (typeof scMedia.dashInfo.video_dash_manifest !== 'undefined' && scMedia.dashInfo.video_dash_manifest !== null) {
                found = true
                mediaType = MediaType.Video

                mediaUrl = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.videoUrl
              } else {
                found = true
                mediaType = MediaType.Image

                mediaUrl = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.src
              }
            }
          } else {
            // Single image/video
            const media = $reactPostNode?.return?.return?.return?.memoizedProps?.post

            if (typeof media.dashInfo.video_dash_manifest !== 'undefined' && media.dashInfo.video_dash_manifest !== null) {
              found = true
              mediaType = MediaType.Video

              mediaUrl = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.videoUrl
            } else {
              found = true
              mediaType = MediaType.Image

              mediaUrl = $reactPostNode?.return?.return?.return?.memoizedProps?.post?.src
            }
          }
        }
      } else {
        console.log("Could not find container element");
      }

      callback(found, mediaType, mediaUrl, program)
    } catch (e) {
      console.error(this.getName() + "()", `[instantgram-light] ${program.VERSION}`, e)
      callback(false, null, program)
    }
    /* =====  End of StoriesScanner ======*/
  }
}