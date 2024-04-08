import { Program } from "../App"
import { Module } from "./Module"
import { generateModalBody } from "../helpers/utils"

export class StoriesScanner implements Module {
    public getName(): string {
        return "StoriesScanner"
    }

    public pausePlayCurrentStory(el: any) {
        // Trigger a click event on the pause button if it exists
        let svgElement = el.querySelector("svg[viewBox='0 0 48 48']")
        if (svgElement !== null) {
            if (typeof (<HTMLElement>svgElement).click === "function") {
                (<HTMLElement>svgElement).click()
            } else {
                // Alternative approach for older browsers
                const clickEvent = new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                })
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
            let $container = document.querySelector("body > div:nth-child(5)")

            if (process.env.DEV) {
                console.info(["$container", $container])
            }

            // Scanner begins
            if ($container) {
                // Detect right frontend
                let multipleStoriesCount = $container.querySelector("section > div > div").childElementCount

                // Specific selector for each frontend
                if (multipleStoriesCount > 1) {
                    let stories: any = $container.querySelector("section > div > div").childNodes

                    for (let i = 0; i < (<any>stories).length; i++) {
                        let transformStyle = (<any>stories[i]).style.transform

                        if (<any>stories[i].childElementCount > 0 && transformStyle.includes("scale(1)")) {
                            // Pause any playing videos before show modal
                            const pauseSettings = localStorage.getItem(program.STORAGE_NAME + '_setting2_checkbox')
                            if (pauseSettings !== null && pauseSettings !== undefined && pauseSettings === 'true') {
                                this.pausePlayCurrentStory(stories[i])
                            }

                            let v = await generateModalBody(stories[i], program)
                            modalBody += v.modalBody

                            program.foundMediaObj = {
                                found: v.found,
                                mediaType: v.mediaType,
                                mediaInfo: v.mediaInfo,
                                modalBody: modalBody,
                                selectedSliderIndex: v.selectedSliderIndex,
                                userName: v.userName
                            }
                            break
                        }
                    }
                } else {
                    let story: any = $container.querySelectorAll("section")
                    // Pause any playing videos before show modal
                    const pauseSettings = localStorage.getItem(program.STORAGE_NAME + '_setting2_checkbox')
                    if (pauseSettings !== null && pauseSettings !== undefined && pauseSettings === 'true') {
                        this.pausePlayCurrentStory(story[0])
                    }

                    let v = await generateModalBody(story, program)
                    modalBody += v.modalBody

                    program.foundMediaObj = {
                        found: v.found,
                        mediaType: v.mediaType,
                        mediaInfo: v.mediaInfo,
                        modalBody: modalBody,
                        selectedSliderIndex: v.selectedSliderIndex,
                        userName: v.userName
                    }
                }
            } else {
                program.foundMediaObj = {
                    found: false,
                    mediaType: undefined,
                    mediaInfo: undefined,
                    modalBody: undefined,
                    selectedSliderIndex: undefined,
                    userName: undefined
                }
            }

            callback(program)
        } catch (e) {
            console.error(this.getName() + "()", `[${program.NAME}] ${program.VERSION}`, e)
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
        /* =====  End of StoriesScanner ======*/
    }
}