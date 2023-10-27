import { Program } from "../App"
import { Module } from "./Module"
import { generateModalBody } from "../helpers/utils"

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
            if (document.querySelector('div[role="dialog"] article')) {
                $article = document.querySelector('div[role="dialog"] article')
            } else {
                $article = document.querySelector("section main > div > :first-child > :first-child")
            }

            if (typeof $article !== 'undefined' || $article !== null || $article !== '') {
                let v = await generateModalBody($article, program)

                program.foundMediaObj = {
                    found: v.found,
                    mediaType: v.mediaType,
                    mediaInfo: v.mediaInfo,
                    modalBody: v.modalBody,
                    selectedIndex: v.selectedIndex,
                    userName: v.userName
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
                selectedIndex: undefined,
                userName: undefined
            }
            callback(program)
        }
        /* =====  End of PostScanner ======*/
    }
}