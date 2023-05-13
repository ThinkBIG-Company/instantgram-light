import { Program } from "../App"
import { Module } from "./Module"
import { MediaType } from "../model/mediaType"

export class StoryScanner implements Module {
  public getName(): string {
    return "StoryScanner"
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
     =            StoryScanner             =
     ==================================== */
    try {
      // Define default variables
      let mediaType: MediaType = MediaType.UNDEFINED

      let mediaUrl: string

      // Container
      let $container = document.querySelector("body > div:nth-child(2)")
      // Scanner begins
      if ($container) {
        let storys = $container.querySelectorAll("section > div > div > div")

        for (let i = 0; i < (<any>storys).length; i++) {
          let scaleX = Number((Math.round((storys[i].getBoundingClientRect().width / (<HTMLElement>storys[i]).offsetWidth) * 100) / 100).toFixed(2))

          if (scaleX >= 1) {
            if (storys[i].classList.length > 1) {
              const $reactPostEl = [...Array.from(storys[i].querySelectorAll('*'))].filter((element) => {
                const instanceKey = Object.keys(element).find((key) => key.includes('Instance') || key.includes('Fiber'))
                const $react = element[instanceKey]
                return $react?.return?.return?.return?.memoizedProps.post ?? false
              })[0]
              const $reactInstanceKey = Object.keys($reactPostEl).find(key => key.includes('Instance') || key.includes('Fiber'))
              const $reactPostNode = $reactPostEl[$reactInstanceKey]
              // END

              // DON'T MESS WITH ME INSTA!
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
              break
            }
          }
        }
      } else {
        console.log("Could not find container element")
      }

      callback(found, mediaType, mediaUrl, program)
    } catch (e) {
      console.error(this.getName() + "()", `[instantgram-light] ${program.VERSION}`, e)
      callback(false, null, program)
    }
    /* =====  End of StoryScanner ======*/
  }
}