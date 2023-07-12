import { Program } from "../App"
import { Module } from "./Module"
import generateModalBody from "../helpers/generateModalBody"
import getUserName from "../helpers/getUserName"

export class StoriesScanner implements Module {
    public getName(): string {
        return "StoriesScanner"
    }

    public pauseCurrentStory() {
        let button = document.querySelector("header > div:nth-child(2) > div:nth-child(2) > div:first-child")
        // Trigger a click event on the pause button if it exists
        let svgElement = button.querySelector("svg[viewBox='0 0 48 48']")
        if (svgElement !== null) {
            if (typeof (<HTMLElement>svgElement).click === "function") {
                (<HTMLElement>svgElement).click()
            } else {
                // Alternative approach for older browsers
                const clickEvent = new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                });
                svgElement.dispatchEvent(clickEvent)
            }
        }
    }

    /** @suppress {uselessCode} */
    public async execute(program: Program, callback?: any): Promise<any> {
        /* =====================================
         =            StoriesScanner           =
         ==================================== */
        try {
            // Define default variables
            let modalBody = ""

            // Container
            let $container = document.querySelector("body > div:nth-child(2)")
            // Scanner begins
            if ($container) {
                const userName = getUserName(document, null)

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

                        if (<any>stories[i].childElementCount > 0 && transformStyle.includes("scale(1)")) {
                            // Pause any playing videos before show modal
                            this.pauseCurrentStory()

                            let v = generateModalBody(stories[i], userName, null, program)
                            modalBody += v.modalBody

                            program.foundMediaObj = {
                                found: v.found,
                                mediaType: v.mediaType,
                                mediaInfo: v.mediaInfo,
                                modalBody: modalBody
                            }
                            break
                        }
                    }
                } else {
                    let story: any = $container.querySelector("section section").parentElement.firstChild
                    // Pause any playing videos before show modal
                    this.pauseCurrentStory()

                    let v = generateModalBody(story, userName, null, program)
                    modalBody += v.modalBody

                    program.foundMediaObj = {
                        found: v.found,
                        mediaType: v.mediaType,
                        mediaInfo: v.mediaInfo,
                        modalBody: modalBody
                    }
                }
            } else {
                program.foundMediaObj = {
                    found: false,
                    mediaType: undefined,
                    mediaURL: undefined,
                    mediaInfo: undefined
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
        /* =====  End of StoriesScanner ======*/
    }
}