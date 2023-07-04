import { Program } from "../App"
import { Module } from "./Module"
import { cssCarouselSlider, cssGeneral, cssSlideOn } from "../components/Interconnect"
import { FeedScanner } from "./FeedScanner"
import { PostReelScanner } from "./PostReelScanner"
import { ReelsScanner } from "./ReelsScanner"
import { StoriesScanner } from "./StoriesScanner"

export class MediaScanner implements Module {
    public getName(): string {
        return "MediaScanner"
    }

    /** @suppress {uselessCode} */
    public async execute(program: Program, callback?: any): Promise<any> {
        /* =====================================
         =         MediaScanner                =
         ==================================== */
        try {
            // Scanner begins
            // Cancel execution when modal already opened
            const instantgramRunning = document.querySelector("div.instantgram-modal-overlay.instantgram-modal-visible.instantgram-modal-show")
            if (instantgramRunning) {
                let iModal: any = document.querySelector(".instantgram-modal")
                iModal.style.animation = "horizontal-shaking 0.25s linear infinite"

                // Stop shaking
                setTimeout(function () {
                    iModal.style.animation = null
                }, 1000)
                return
            }
            // Remove previous executed bookmarklet stuff
            const dataScripts = document.querySelectorAll("#instantgram-cssGeneral, #instantgram-cssSlideOn, #instantgram-cssCarouselSlider, #instantgram-jsDataDownload")
            // loop through each element and remove any inline style attributes or class names
            dataScripts.forEach((el) => {
                el.remove()
            })

            // Create new needed stuff
            const generalStyle = document.createElement("style")
            generalStyle.id = "instantgram-cssGeneral"
            // Set the innerHTML property to the JavaScript code
            generalStyle.innerHTML = cssGeneral
            // Append the script element to the document
            document.body.appendChild(generalStyle)

            // Switch css
            const switchStyle = document.createElement("style")
            switchStyle.id = "instantgram-cssSlideOn"
            // Set the innerHTML property to the JavaScript code
            switchStyle.innerHTML = cssSlideOn
            // Append the script element to the document
            document.body.appendChild(switchStyle)

            const carouselSliderStyle = document.createElement("style")
            carouselSliderStyle.id = "instantgram-cssCarouselSlider"
            // Set the innerHTML property to the JavaScript code
            carouselSliderStyle.innerHTML = cssCarouselSlider
            // Append the script element to the document
            document.body.appendChild(carouselSliderStyle)

            // const carouselSliderScript = document.createElement("script")
            // carouselSliderScript.id = "instantgram-jsCarouselSlider"
            // // Set the innerHTML property to the JavaScript code
            // carouselSliderScript.innerHTML = jsCarouselSlider
            // // Append the script element to the document
            // document.body.appendChild(carouselSliderScript)

            const dataDownloadScript = document.createElement("script")
            dataDownloadScript.id = "instantgram-jsDataDownload"
            // Set the innerHTML property to the JavaScript code
            dataDownloadScript.innerHTML = `async function toDataURL(url) {
          const blob = await fetch(url).then(res => res.blob());
          return URL.createObjectURL(blob);
      }
      async function downloadFromHref(url, filename) {
          const a = document.createElement("a");
          a.href = await toDataURL(url);
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }`
            // Append the script element to the document
            document.body.appendChild(dataDownloadScript)

            // Handle specific modules
            // Detect profile root path
            if (program.regexProfilePath.test(program.path)) {
                program.foundMediaObj = {
                    found: false,
                    mediaType: undefined,
                    mediaURL: undefined,
                    mediaInfo: undefined
                }
                callback(program)
                return
            }

            // Detect story video/image
            if (program.regexStoriesURI.test(program.path)) {
                new StoriesScanner().execute(program, function (scannerProgram: Program) {
                    if (scannerProgram.foundMediaObj.found) {
                        scannerProgram.foundByModule = new StoriesScanner().getName()
                    }

                    callback(scannerProgram)
                })
            }

            // Detect feed posts
            if (program.regexRootPath.test(program.path)) {
                new FeedScanner().execute(program, function (scannerProgram: Program) {                    
                    if (scannerProgram.foundMediaObj.found) {
                        scannerProgram.foundByModule = new FeedScanner().getName()
                    }

                    callback(scannerProgram)
                })
            }

            // Detect reels
            if (program.regexReelsURI.test(program.path)) {
                new ReelsScanner().execute(program, function (scannerProgram: Program) {
                    if (scannerProgram.foundMediaObj.found) {
                        scannerProgram.foundByModule = new ReelsScanner().getName()
                    }

                    callback(scannerProgram)
                })
            }

            // Detect modal posts, reels
            if (program.regexPostPath.test(program.path) || program.regexReelURI.test(program.path)) {
                new PostReelScanner().execute(program, function (scannerProgram: Program) {
                    if (scannerProgram.foundMediaObj.found) {
                        scannerProgram.foundByModule = new PostReelScanner().getName()
                    }

                    callback(scannerProgram)
                })
            }
            return
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
        /* =====  End of MediaScanner ======*/
    }
}