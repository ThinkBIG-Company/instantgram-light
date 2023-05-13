import { Program } from "../App"
import { Module } from "./Module"
import { MediaType } from "../model/mediaType"
import { FeedScanner } from "./FeedScanner"
import { PostReelScanner } from "./PostReelScanner"
import { StoryScanner } from "./StoryScanner"

export class MediaScanner implements Module {
  public getName(): string {
    return "MediaScanner"
  }

  /** @suppress {uselessCode} */
  public async execute(program: Program, callback?: any): Promise<any> {
    let found = false

    /* =====================================
     =         MediaScanner                =
     ==================================== */
    try {
      // Define default variables

      let mediaObj = {
        mediaType: MediaType.UNDEFINED,
        mediaEl: undefined,
        mediaURL: undefined,
      }

      // Scanner begins
      // Handle specific modules
      // Detect profile root path
      if (program.regexProfilePath.test(program.path)) {
        found = false
        program.foundByModule = undefined

        callback(found, null, program)
        return
      }

      // Detect story video/image
      if (program.regexStoriesURI.test(program.path)) {
        new StoryScanner().execute(program, function (_scannerFound: boolean, foundMediaType: MediaType, foundMediaUrl: string, _scannerProgram: Program) {
          mediaObj.mediaType = foundMediaType
          mediaObj.mediaURL = foundMediaUrl

          if (_scannerFound) {
            found = true
            program.foundByModule = new StoryScanner().getName()
          }
        })
      }

      if (mediaObj.mediaEl == null) {
        if (program.regexRootPath.test(program.path)) {
          new FeedScanner().execute(program, function (_scannerFound: boolean, foundMediaType: MediaType, foundMediaUrl: string, _scannerProgram: Program) {
            mediaObj.mediaType = foundMediaType
            mediaObj.mediaURL = foundMediaUrl

            if (_scannerFound) {
              found = true
              program.foundByModule = new FeedScanner().getName()
            }
          })
        }

        if (program.regexPostPath.test(program.path) || program.regexReelURI.test(program.path)) {
          new PostReelScanner().execute(program, function (_scannerFound: boolean, foundMediaType: MediaType, foundMediaUrl: string, _scannerProgram: Program) {
            mediaObj.mediaType = foundMediaType
            mediaObj.mediaURL = foundMediaUrl

            if (_scannerFound) {
              found = true
              program.foundByModule = new PostReelScanner().getName()
            }
          })
        }
      }

      callback(found, mediaObj.mediaType, mediaObj.mediaURL, program)
    } catch (e) {
      console.error(this.getName() + "()", `[instantgram] ${program.VERSION}`, e)
      callback(false, null, program)
    }
    /* =====  End of MediaScanner ======*/
  }
}