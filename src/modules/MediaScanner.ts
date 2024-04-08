import { Program } from "../App"
import { Module } from "./Module"
import { cssCarouselSlider, cssGeneral, cssSlideOn } from "../components/Interconnect"
import { FeedScanner } from "./FeedScanner"
import { PostReelScanner } from "./PostReelScanner"
import { ReelsScanner } from "./ReelsScanner"
import { StoriesScanner } from "./StoriesScanner"
import { removeStyleTagsWithIDs } from "../helpers/utils"

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
            const appRunning = document.querySelector("div." + program.NAME + "-modal-overlay." + program.NAME + "-modal-visible." + program.NAME + "-modal-show")
            if (appRunning) {
                let iModal: any = document.querySelector("." + program.NAME + "-modal")
                iModal.style.animation = "horizontal-shaking 0.25s linear infinite"

                // Stop shaking
                setTimeout(function () {
                    iModal.style.animation = null
                }, 1000)
                return
            }
            // Remove previous executed bookmarklet stuff
            const idsToRemove = [
                program.NAME + '-cssGeneral',
                program.NAME + '-cssSlideOn',
                program.NAME + '-cssCarouselSlider'
            ]
            // Call the function to remove <style> tags from the entire DOM
            removeStyleTagsWithIDs(idsToRemove)

            // Create new needed stuff
            const generalStyle = document.createElement("style")
            generalStyle.id = program.NAME + "-cssGeneral"
            // Set the innerHTML property to the JavaScript code
            generalStyle.innerHTML = cssGeneral
            // Append the script element to the document
            document.body.appendChild(generalStyle)

            // Switch css
            const switchStyle = document.createElement("style")
            switchStyle.id = program.NAME + "-cssSlideOn"
            // Set the innerHTML property to the JavaScript code
            switchStyle.innerHTML = cssSlideOn
            // Append the script element to the document
            document.body.appendChild(switchStyle)

            const carouselSliderStyle = document.createElement("style")
            carouselSliderStyle.id = program.NAME + "-cssCarouselSlider"
            // Set the innerHTML property to the JavaScript code
            carouselSliderStyle.innerHTML = cssCarouselSlider
            // Append the script element to the document
            document.body.appendChild(carouselSliderStyle)

            // Handle specific modules
            // Detect profile root path
            if (program.regexProfilePath.test(program.path)) {
                program.foundMediaObj = {
                    found: false,
                    mediaType: undefined,
                    mediaInfo: undefined,
                    modalBody: undefined,
                    selectedSliderIndex: undefined,
                    userName: undefined
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
        /* =====  End of MediaScanner ======*/
    }
}