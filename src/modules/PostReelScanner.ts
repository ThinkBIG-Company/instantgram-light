import { Program } from "../App"
import { Module } from "./Module"
import generateModalBody from "../helpers/generateModalBody"
import getReactElement from "../helpers/getReactElement"
import getUserName from "../helpers/getUserName"

export class PostReelScanner implements Module {
    public getName(): string {
        return "PostReelScanner"
    }

    /** @suppress {uselessCode} */
    public async execute(program: Program, callback?: any): Promise<any> {
        /* =====================================
         =              PostScanner            =
         ==================================== */
        try {
            // Define default variables

            // Article
            let $article: any

            // Scanner begins

            // For modal
            // Will be in the future completly removed
            if (document.querySelectorAll('[role="dialog"]').length > 0) {
                $article = document.querySelectorAll('[role="dialog"]')[1]
            } else {
                $article = document.querySelector("section main > div > :first-child > :first-child")
            }

            if (typeof $article !== 'undefined' || $article !== null || $article !== '') {
                const $reactPostNode = getReactElement(document)
                const mediaInfo = $reactPostNode?.return?.return?.return?.memoizedProps?.post

                const userName = getUserName(document, mediaInfo)
                let v = generateModalBody(document, userName, $article, program)

                program.foundMediaObj = {
                    found: v.found,
                    mediaType: v.mediaType,
                    mediaInfo: v.mediaInfo,
                    modalBody: v.modalBody,
                    selectedIndex: v.selectedIndex
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
        /* =====  End of PostScanner ======*/
    }
}