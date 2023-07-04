import { Program } from "../App"
import { MediaType } from "../model/mediaType"
import getReactElement from "./getReactElement"
import localize from "./localize"
import userFilenameFormatter from "./userFilenameFormatter"

export default function generateModalBody(el: any, userName: any, subEl: any = null, program: Program) {
    let found = false
    let mediaType: MediaType = MediaType.UNDEFINED
    let modalBody = ""
    let selectedIndex: number

    const $reactPostNode = getReactElement(el)
    const mediaInfo = $reactPostNode?.return?.return?.return?.memoizedProps?.post
    const mediaPostedAtDateObj = new Date(mediaInfo.postedAt * 1000)

    let formattedFilename

    const settingsListData = program.settings
    if (typeof settingsListData === 'string') {
        let _data = JSON.parse(settingsListData) as InstantgramData

        const fRegexPlaceholders = {
            Username: userName,
            Year: mediaPostedAtDateObj.getFullYear().toString(),
            Month: (mediaPostedAtDateObj.getMonth() + 1).toString().padStart(2, '0'),
            Day: mediaPostedAtDateObj.getDate().toString().padStart(2, '0'),
            Hour: mediaPostedAtDateObj.getHours().toString().padStart(2, '0'),
            Minute: mediaPostedAtDateObj.getMinutes().toString().padStart(2, '0')
        }
        formattedFilename = userFilenameFormatter(_data.settings[1].value, fRegexPlaceholders)
    }


    // Sometimes instagram pre-selects image indexes on carousels
    // to not confuse the user find the selected index
    let controlElements
    if (subEl !== null) {
        controlElements = subEl.querySelectorAll("div._aamj._acvz._acnc._acng div")
    } else {
        controlElements = el.querySelectorAll("div._aamj._acvz._acnc._acng div")
    }
    controlElements.forEach((div: { classList: string | any[] }, i: number) => {
        if (div.classList.length === 2) {
            selectedIndex = i

            return
        }
    })

    // DON'T MESS WITH ME INSTA!
    if (mediaInfo?.isSidecar || (mediaInfo?.sidecarChildren && mediaInfo?.sidecarChildren.length > 0)) {
        found = true
        mediaType = MediaType.Carousel

        modalBody += `<div class="slider-container"><div class="slider">`

        for (let sC = 0; sC < mediaInfo?.sidecarChildren.length; sC++) {
            const scMedia = mediaInfo?.sidecarChildren[sC]

            if (typeof scMedia.dashInfo.video_dash_manifest !== "undefined" && scMedia.dashInfo.video_dash_manifest !== null) {
                modalBody += `<div class="slide"><video style="background:black;" height="450" poster="${scMedia.src}" src="${scMedia.videoUrl}" controls></video>`
                // Add download button
                modalBody += `<button onclick="downloadFromHref('${scMedia.videoUrl}', '${formattedFilename + '_' + Number(sC + 1)}.mp4')" style="font-size:20px;font-weight:600;margin-top:-4px;" class="instantgram-modal-db">${localize("index@download")}</button>`

                modalBody += `</div>`
            } else {
                modalBody += `<div class="slide"><img src="${scMedia.src}" />`
                // Add download button
                modalBody += `<button onclick="downloadFromHref('${scMedia.src}', '${formattedFilename + '_' + Number(sC + 1)}.jpg')" style="font-size:20px;font-weight:600;margin-top:-4px;" class="instantgram-modal-db">${localize("index@download")}</button>`

                modalBody += `</div>`
            }
        }

        modalBody += `</div><div class="slider-controls"></div></div>`
    } else {
        // Single image/video
        if (typeof mediaInfo.dashInfo.video_dash_manifest !== "undefined" && mediaInfo.dashInfo.video_dash_manifest !== null) {
            found = true
            mediaType = MediaType.Video

            modalBody += `<video style="background:black;" width="500" height="450" poster="${mediaInfo.src}" src="${mediaInfo.videoUrl}" controls></video>`
            // Add download button
            modalBody += `<button onclick="downloadFromHref('${mediaInfo.videoUrl}', '${formattedFilename}.mp4')" style="font-size:20px;font-weight:600;margin-top:-4px;" class="instantgram-modal-db">${localize("index@download")}</button>`
        } else {
            found = true
            mediaType = MediaType.Image

            modalBody += `<img width="500" height="450" src="${mediaInfo.src}" />`
            // Add download button
            modalBody += `<button onclick="downloadFromHref('${mediaInfo.src}', '${formattedFilename}.jpg')" style="font-size:20px;font-weight:600;margin-top:-4px;" class="instantgram-modal-db">${localize("index@download")}</button>`
        }
    }

    return { found, mediaType, mediaInfo, modalBody, selectedIndex }
}