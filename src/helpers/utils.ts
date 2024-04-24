import { Program } from "../App"
import { MediaType } from "../model/mediaType"
import localize from "./localize"

const mediaInfoCache: Map<string, any> = new Map() // key: media id, value: info json
const mediaIdCache: Map<string, string> = new Map() // key: post id, value: media id

async function fetchVideoURL(articleNode: HTMLElement, videoElem: HTMLVideoElement) {
    const poster = videoElem.getAttribute("poster")
    const timeNodes = articleNode.querySelectorAll("time")
    const posterUrl = (timeNodes[timeNodes.length - 1].parentNode!.parentNode as any).href
    const posterPattern = /\/([^\/?]*)\?/
    const posterMatch = poster?.match(posterPattern)
    const postFileName = posterMatch?.[1]
    const resp = await fetch(posterUrl)
    const content = await resp.text()
    const pattern = new RegExp(`${postFileName}.*?video_versions.*?url":("[^"]*")`, "s")
    const match = content.match(pattern)
    let videoUrl = JSON.parse(match?.[1] ?? "")
    videoUrl = videoUrl.replace(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g, "https://scontent.cdninstagram.com")
    videoElem.setAttribute("videoURL", videoUrl)
    return videoUrl
}

const findAppId = () => {
    const appIdPattern = /"X-IG-App-ID":"([\d]+)"/
    const bodyScripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll("body > script")
    for (let i = 0; i < bodyScripts.length; ++i) {
        const match = bodyScripts[i].text.match(appIdPattern)
        if (match) return match[1]
    }
    return null
}

function findPostId(articleNode: HTMLElement) {
    const pathname = window.location.pathname
    if (pathname.startsWith("/reel/")) {
        return pathname.split("/")[2]
    } else if (pathname.startsWith("/reels/")) {
        return pathname.split("/")[2]
    } else if (pathname.startsWith("/stories/")) {
        return pathname.split("/")[3]
    } else if (pathname.startsWith("/reel/")) {
        return pathname.split("/")[2]
    } else {
        const postIdPattern = /^\/p\/([^/]+)\//
        const aNodes = articleNode.querySelectorAll("a")
        for (let i = 0; i < aNodes.length; ++i) {
            const link = aNodes[i].getAttribute("href")
            if (link) {
                const match = link.match(postIdPattern)
                if (match) return match[1]
            }
        }
        return null
    }
}

const findMediaId = async (postId: string) => {
    const mediaIdPattern = /instagram:\/\/media\?id=(\d+)|["' ]media_id["' ]:["' ](\d+)["' ]/
    const match = window.location.href.match(/www.instagram.com\/stories\/[^\/]+\/(\d+)/)
    if (match) return match[1]
    if (!mediaIdCache.has(postId)) {
        const postUrl = `https://www.instagram.com/p/${postId}/`
        const resp = await fetch(postUrl)
        const text = await resp.text()
        const idMatch = text.match(mediaIdPattern)
        if (!idMatch) return null
        let mediaId = null
        for (let i = 0; i < idMatch.length; ++i) {
            if (idMatch[i]) mediaId = idMatch[i]
        }
        if (!mediaId) return null
        mediaIdCache.set(postId, mediaId)
    }
    return mediaIdCache.get(postId)
}

const getImgOrVedioUrl = (item: Record<string, any>) => {
    if ("video_versions" in item) {
        return item.video_versions[0].url
    } else {
        return item.image_versions2.candidates[0].url
    }
}

const getVideoSrc = async (articleNode: HTMLElement, videoElem: HTMLVideoElement) => {
    let url = videoElem.getAttribute("src")
    if (videoElem.hasAttribute("videoURL")) {
        url = videoElem.getAttribute("videoURL")
    } else if (url === null || url.includes("blob")) {
        url = await fetchVideoURL(articleNode, videoElem)
    }
    return url
}

export async function generateModalBody(el: any, program: Program) {
    let found = false

    let mediaType: MediaType = MediaType.UNDEFINED

    let mediaInfo: any | null = null
    mediaInfo = await getMediaFromInfoApi(el)

    let modalBody = ""
    let selectedSliderIndex: number = 0

    let userName = undefined
    if (mediaInfo && mediaInfo.user && mediaInfo.user.username) {
        userName = mediaInfo.user.username
    } else {
        console.log("Failed to fetch user information")
    }

    let url: string | null = null

    // Check if is an ad
    const storedSetting1Checkbox = localStorage.getItem(program.STORAGE_NAME + "_setting1_checkbox") || "false"
    if (storedSetting1Checkbox !== null && storedSetting1Checkbox !== undefined && storedSetting1Checkbox === "false" && el.textContent.includes(localize("ad"))) {
        mediaType = MediaType.Ad
        return { found, mediaType, mediaInfo, modalBody, selectedSliderIndex, userName }
    }

    const mediaPostedAtDateObj = new Date(mediaInfo.taken_at * 1000)

    let formattedFilename = "{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}"
    const storedSetting1Input = localStorage.getItem(program.STORAGE_NAME + "_setting1_input") || formattedFilename
    if (storedSetting1Input !== null && storedSetting1Input !== undefined) {
        const fRegexPlaceholders = {
            Minute: mediaPostedAtDateObj.getMinutes().toString().padStart(2, "0"),
            Hour: mediaPostedAtDateObj.getHours().toString().padStart(2, "0"),
            Day: mediaPostedAtDateObj.getDate().toString().padStart(2, "0"),
            Month: (mediaPostedAtDateObj.getMonth() + 1).toString().padStart(2, "0"),
            Year: mediaPostedAtDateObj.getFullYear().toString(),
            Username: userName
        }
        formattedFilename = userFilenameFormatter(storedSetting1Input, fRegexPlaceholders)
    }

    let openInNewTab = false
    const storedSetting3Checkbox = localStorage.getItem(program.STORAGE_NAME + "_setting3_checkbox") || "false"
    if (storedSetting3Checkbox !== null && storedSetting3Checkbox !== undefined) {
        openInNewTab = storedSetting3Checkbox === "true"
    }

    if ("carousel_media" in mediaInfo) {
        found = true
        mediaType = MediaType.Carousel

        const isPostView = window.location.pathname.startsWith("/p/")
        let dotsList: any
        if (isPostView) {
            dotsList = el.querySelectorAll(`:scope > div > div > div > div:nth-child(2)>div`)
        } else {
            dotsList = el.querySelectorAll(`:scope > div > div:nth-child(2) >div>div>div>div>div> div:nth-child(2)>div`)
        }

        selectedSliderIndex = [...dotsList].findIndex((i) => i.classList.length === 2)

        modalBody += `<div class="slider-container"><div class="slider">`

        for (let sC = 0; sC < mediaInfo?.carousel_media?.length; sC++) {
            const scMedia = mediaInfo.carousel_media[sC]

            if (typeof scMedia.video_dash_manifest !== "undefined" && scMedia.video_dash_manifest !== null) {
                url = getImgOrVedioUrl(scMedia)
                if (url === null) {
                    const videoElem: HTMLVideoElement | null = el.querySelector("article  div > video")
                    url = await getVideoSrc(el, videoElem)
                }

                modalBody += `<div class="slide"><video style="background:black;" height="450" src="${url}" controls="controls" preload="metadata"></video>`
                // Add download button
                if (openInNewTab) {
                    modalBody += `<a target="_blank" rel="noopener noreferrer" href="${url}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${localize("index@download")}</a>`
                } else {
                    modalBody += `<a href="https://instantgram.1337.pictures/download.php?data=${btoa(url)}:${btoa(formattedFilename + "_" + Number(sC + 1) + ".mp4")}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${localize("index@download")}</a>`
                }

                modalBody += `</div>`
            } else {
                url = getImgOrVedioUrl(scMedia)
                if (url === null) {
                    const imgElem = el.querySelector("article div[role] div > img")
                    if (imgElem) {
                        // media type is image
                        url = imgElem.getAttribute("src")
                    } else {
                        console.log("Err: not find media at handle post single")
                    }
                }

                modalBody += `<div class="slide"><img src="${url}" />`
                // Add download button
                if (openInNewTab) {
                    modalBody += `<a target="_blank" rel="noopener noreferrer" href="${url}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${localize("index@download")}</a>`
                } else {
                    modalBody += `<a href="https://instantgram.1337.pictures/download.php?data=${btoa(url)}:${btoa(formattedFilename + "_" + Number(sC + 1) + ".jpg")}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${localize("index@download")}</a>`
                }

                modalBody += `</div>`
            }
        }

        modalBody += `</div><div class="slider-controls"></div></div>`
    } else {
        // Single video
        if (typeof mediaInfo.video_dash_manifest !== "undefined" && mediaInfo.video_dash_manifest !== null) {
            found = true
            mediaType = MediaType.Video

            url = getImgOrVedioUrl(mediaInfo)
            if (url === null) {
                const videoElem: HTMLVideoElement | null = el.querySelector("article  div > video")
                url = await getVideoSrc(el, videoElem)
            }

            modalBody += `<video style="background:black;" width="500" height="450" src="${url}" controls="controls" preload="metadata"></video>`
            // Add download button
            if (openInNewTab) {
                modalBody += `<a target="_blank" rel="noopener noreferrer" href="${url}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${localize("index@download")}</a>`
            } else {
                modalBody += `<a href="https://instantgram.1337.pictures/download.php?data=${btoa(url)}:${btoa(formattedFilename + ".mp4")}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${localize("index@download")}</a>`
            }
            // Single image
        } else {
            found = true
            mediaType = MediaType.Image

            url = getImgOrVedioUrl(mediaInfo)
            if (url === null) {
                const imgElem = el.querySelector("article div[role] div > img")
                if (imgElem) {
                    // media type is image
                    url = imgElem.getAttribute("src")
                } else {
                    console.log("Err: not find media at handle post single")
                }
            }

            modalBody += `<img width="500" height="450" src="${url}" />`
            // Add download button
            if (openInNewTab) {
                modalBody += `<a target="_blank" rel="noopener noreferrer" href="${url}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${localize("index@download")}</a>`
            } else {
                modalBody += `<a href="https://instantgram.1337.pictures/download.php?data=${btoa(url)}:${btoa(formattedFilename + ".jpg")}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${localize("index@download")}</a>`
            }
        }
    }

    return { found, mediaType, mediaInfo, modalBody, selectedSliderIndex, userName }
}

export function getElementInViewPercentage(el: Element): any {
    let viewport: any
    if (window !== null && window !== undefined) {
        viewport = {
            top: window.pageYOffset,
            bottom: window.pageYOffset + window.innerHeight
        }
    } else {
        viewport = document.documentElement
    }

    const elementBoundingRect = el.getBoundingClientRect()
    const elementPos = {
        top: elementBoundingRect.y + window.pageYOffset,
        bottom: elementBoundingRect.y + elementBoundingRect.height + window.pageYOffset
    }

    if (viewport.top > elementPos.bottom || viewport.bottom < elementPos.top) {
        return 0
    }

    // Element is fully within viewport
    if (viewport.top < elementPos.top && viewport.bottom > elementPos.bottom) {
        return 100
    }

    // Element is bigger than the viewport
    if (elementPos.top < viewport.top && elementPos.bottom > viewport.bottom) {
        return 100
    }

    const elementHeight = elementBoundingRect.height
    let elementHeightInView = elementHeight

    if (elementPos.top < viewport.top) {
        elementHeightInView = elementHeight - (window.pageYOffset - elementPos.top)
    }

    if (elementPos.bottom > viewport.bottom) {
        elementHeightInView = elementHeightInView - (elementPos.bottom - viewport.bottom)
    }

    const percentageInView = (elementHeightInView / window.innerHeight) * 100

    return Math.round(percentageInView)
}

export const getMediaFromInfoApi = async (articleNode: HTMLElement): Promise<Array<any> | null> => {
    if (process.env.DEV) {
        console.info(["articleNode", articleNode])
    }

    try {
        const appId = findAppId()
        if (!appId) {
            console.log("Cannot find appid")
            return null
        }

        const postId = findPostId(articleNode)
        if (!postId) {
            console.log("Cannot find post id")
            return null
        }

        const mediaId = await findMediaId(postId)
        if (!mediaId) {
            console.log("Cannot find media id")
            return null
        }

        if (!mediaInfoCache.has(mediaId)) {
            const url = "https://i.instagram.com/api/v1/media/" + mediaId + "/info/"
            const resp = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "X-IG-App-ID": appId,
                },
                credentials: "include",
                mode: "cors",
            })

            if (resp.status !== 200) {
                console.log(`Fetch info API failed with status code: ${resp.status}`)
                return null
            }
            const respJson = await resp.json()
            mediaInfoCache.set(mediaId, respJson)
        }

        const infoJson = mediaInfoCache.get(mediaId)
        return infoJson.items[0]
    } catch (e: any) {
        console.log(`Uncatched in getUrlFromInfoApi(): ${e}\n${e.stack}`)
        return null
    }
}

export const getUserFromInfoApi = async (userId: any): Promise<any | null> => {
    try {
        const appId = findAppId()
        if (!appId) {
            console.log("Cannot find appid")
            return null
        }

        const url = "https://i.instagram.com/api/v1/users/" + userId + "/info/"
        const resp = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "*/*",
                "X-IG-App-ID": appId,
            },
            credentials: "include",
            mode: "cors",
        })

        if (resp.status !== 200) {
            console.log(`Fetch info API failed with status code: ${resp.status}`)
            return null
        }
        const infoJson = await resp.json()
        return infoJson
    } catch (e: any) {
        console.log(`Uncatched in getUrlFromInfoApi(): ${e}\n${e.stack}`)
        return null
    }
}

export const getUserInfoFromWebProfileApi = async (userName: any): Promise<any | null> => {
    try {
        const appId = findAppId()
        if (!appId) {
            console.log("Cannot find appid")
            return null
        }

        const url = "https://i.instagram.com/api/v1/users/web_profile_info/?username=" + userName
        const resp = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "*/*",
                "X-IG-App-ID": appId,
            },
            credentials: "include",
            mode: "cors",
        })

        if (resp.status !== 200) {
            console.log(`Fetch info API failed with status code: ${resp.status}`)
            return null
        }
        const infoJson = await resp.json()
        return infoJson
    } catch (e: any) {
        console.log(`Uncatched in getUrlFromInfoApi(): ${e}\n${e.stack}`)
        return null
    }
}

export function removeStyleTagsWithIDs(idsToRemove) {
    const styleTags = document.querySelectorAll("style[id]")
    styleTags.forEach(styleTag => {
        if (idsToRemove.includes(styleTag.id)) {
            styleTag.parentNode.removeChild(styleTag)
        }
    })
}

export function sleep(ms: number): Promise<void> {
    return new Promise(function (resolve) { setTimeout(resolve, ms) })
}

export function userFilenameFormatter(filename: string, placeholders: Record<string, string>): string {
    // Replace placeholders with corresponding values
    for (const placeholder in placeholders) {
        const regex = new RegExp(`{${placeholder}}`, "g")
        filename = filename.replace(regex, placeholders[placeholder])
    }

    // Replace spaces with dashes (-)
    filename = filename.replace(/\s+/g, "-")

    // Remove any special characters except dashes, underscores, and dots
    filename = filename.replace(/[^\w-.]/g, "")

    return filename
}