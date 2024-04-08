import { Program } from "./App"
import { MediaScanner } from "./modules/MediaScanner"
import { Modal } from "./components/Modal"
import { detect } from "detect-browser"
import update from "./modules/Update"
import localize from "./helpers/localize"
import { getUserFromInfoApi, getUserInfoFromWebProfileApi, removeStyleTagsWithIDs } from "./helpers/utils"
import { MediaType } from "./model/mediaType"

console.clear()

const APP_NAME = "instantgram-light"
// Init browser detection
const browser = detect()

export const program: Program = {
    NAME: APP_NAME,
    STORAGE_NAME: APP_NAME.toLocaleLowerCase().replace(/-/g, '_'),
    VERSION: process.env.VERSION as string,
    browser: browser,
    hostname: window.location.hostname,
    path: window.location.pathname,
    regexHostname: /^instagram\.com/,
    regexRootPath: /^\/+$/,
    regexProfilePath: /^\/([A-Za-z0-9._]{2,3})+\/$/,
    regexPostPath: /^\/p\//,
    regexReelURI: /reel\/(.*)+/,
    regexReelsURI: /reels\/(.*)+/,
    regexStoriesURI: /stories\/(.*)+/,
    foundByModule: null,
    foundMediaObj: undefined
}

if (process.env.DEV) {
    console.info(["Developer Mode Caution!", program])
    if (program.browser) {
        console.info(["Browser Name", program.browser.name])
        console.info(["Browser Version", program.browser.version])
        console.info(["Browser OS", program.browser.os])
    }
}

function initSaveSettings(el: any) {
    for (let i = 1; i <= 3; i++) {
        const settingName = `setting${i}`
        // For checkboxes
        const checkbox = el.querySelector(`#${settingName}-checkbox`) as HTMLInputElement
        if (checkbox) {
            const storedData = localStorage.getItem(program.STORAGE_NAME + '_' + settingName + '_checkbox')
            checkbox.checked = storedData === 'true'

            checkbox.addEventListener("change", () => {
                const storedData = localStorage.getItem(program.STORAGE_NAME + '_' + settingName + '_checkbox')
                const checked = String(checkbox.checked)

                // Save merged settings to LocalStorage
                localStorage.setItem(program.STORAGE_NAME + '_' + settingName + '_checkbox', checked)
            })
        }

        // For input text
        const inputText = el.querySelector(`#${settingName}-input`) as HTMLInputElement
        if (inputText) {
            const storedData = localStorage.getItem(program.STORAGE_NAME + '_' + settingName + '_input')
            inputText.value = storedData || "{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}"

            const saveFilenameFormat = el.querySelector("#saveFilenameFormat")
            saveFilenameFormat.addEventListener("click", (event: { preventDefault: () => void }) => {
                event.preventDefault()

                const storedData = localStorage.getItem(program.STORAGE_NAME + '_' + settingName + '_input')
                const input = String(inputText.value)

                // Save merged settings to LocalStorage
                localStorage.setItem(program.STORAGE_NAME + '_' + settingName + '_input', input)

                saveFilenameFormat.textContent = localize("index@saved")
                saveFilenameFormat.style.color = "white"
                saveFilenameFormat.style.backgroundColor = "green"
                setTimeout(() => {
                    saveFilenameFormat.textContent = localize("index@save")
                    saveFilenameFormat.style.color = "black"
                    saveFilenameFormat.style.backgroundColor = "buttonface"
                }, 1000)
            })
        }
    }
}

async function handleProfilePage() {
    try {
        let userInfo: any | null = null
        let userId: any | null = null

        const regex = /instagram.com\/([A-Za-z0-9_.]+)/
        const match = window.location.href.match(regex)
        if (match) {
            const username = match[1]

            userInfo = await getUserInfoFromWebProfileApi(username)
            userId = userInfo.data.user.id
        } else {
            console.log("Could not get the username from insta url.")
        }

        userInfo = await getUserFromInfoApi(userId)
        if (userInfo) {
            let openInNewTab = false
            const storedSetting3Checkbox = localStorage.getItem(program.STORAGE_NAME + "_setting3_checkbox") || "false"
            if (storedSetting3Checkbox !== null && storedSetting3Checkbox !== undefined) {
                openInNewTab = storedSetting3Checkbox === "true"
            }

            const url = userInfo.user.hd_profile_pic_url_info.url
            const username = userInfo.user.username

            let modalBody = ""
            modalBody += `<div class="slide"><img src="${url}" />`
            // Add download button
            if (openInNewTab) {
                modalBody += `<a target="_blank" rel="noopener noreferrer" href="${url}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${localize("index@download")}</a>`
            } else {
                modalBody += `<a href="https://instantgram.1337.pictures/download.php?data=${btoa(url)}:${btoa(username + ".jpg")}" style="width:inherit;font-size:20px;font-weight:600;margin-top:-4px;" class="${program.NAME}-modal-db">${localize("index@download")}</a>`
            }

            modalBody += `</div>`

            program.foundMediaObj = {
                found: true,
                mediaType: MediaType.Image,
                mediaInfo: undefined,
                modalBody: modalBody,
                selectedSliderIndex: undefined,
                userName: username
            }
            handleMediaFound(document, username)
        } else {
            console.log("Failed to fetch user information")
        }
    } catch (e: any) {
        console.log(`Some error in handleProfilePage: ${e}\n${e.stack}`)
        return null
    }
}

function handleMediaNotFound() {
    if (!program.foundByModule) {
        new Modal({
            heading: [
                `<h5>
            <span class="header-text-left">[${program.NAME}]</span>
            <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
          </h5>`
            ],
            body: [localize("index@alert_dontFound")],
            bodyStyle: "text-align:center",
            buttonList: [{ active: true, text: "Ok" }]
        }).open()
    }
}

function handleMediaFound(document: any, userName: any) {
    new Modal({
        heading: [
            `<h5>
          <span class="header-text-middle">@${userName}
            <button class="${program.NAME}-settings">
              <svg style="margin-left: auto; margin-right: auto;" aria-label="Optionen" class="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Optionen</title>
                <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </button>
          </span>
        </h5>`
        ],
        body: [program.foundMediaObj.modalBody],
        bodyStyle: "padding:0!important;text-align:center",
        buttonList: [{ active: true, text: localize("index@close") }],
        callback: (_modal, el) => {
            if (el.querySelector(".slider") !== null) {
                const slider = (<any>el).querySelector(".slider")
                const slides = el.querySelectorAll(".slide")
                const sliderControls = el.querySelector(".slider-controls")
                let sliderIndex = program.foundMediaObj.selectedSliderIndex                

                for (let i = 0; i < slides.length; i++) {
                    const button = document.createElement("button")
                    button.setAttribute("data-index", String(i))
                    button.innerHTML = String(i + 1)
                    button.addEventListener("click", () => {
                        sliderIndex = i
                        updateSliderPosition()
                    })
                    sliderControls.appendChild(button)
                }

                const buttons = el.querySelectorAll(".slider-controls button")

                function updateSliderPosition() {
                    const slideWidth = slides[0].clientWidth
                    const translateX = -slideWidth * sliderIndex
                    slider.style.transform = `translateX(${translateX}px)`
                    buttons.forEach((button, index) => {
                        button.classList.toggle("active", index === sliderIndex)
                    })
                }

                buttons[sliderIndex].classList.add("active")
                updateSliderPosition()
            }

            el.querySelector(`.${program.NAME}-settings`).addEventListener("click", () => {
                new Modal({
                    heading: [
                        `<h5>
                <span class="header-text-left">[${program.NAME}]</span>
                <span class="header-text-middle">${localize("index#program#modal_settings@title")}</span>
                <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
              </h5>`
                    ],
                    body: [
                        `<form style="padding-top: 25px;padding-bottom: 25px;padding-left: 20px;padding-right: 20px;">
                <div class="container">
                  <div class="row mb-20"><strong>${localize("index#program#modal_settings@settings_attention")}</strong></div>
                  <div class="row">
                    <div class="left"><strong>${localize("index#program#modal_settings@settings_1")}:</strong></div>
                    <div class="right">
                      <label class="slideon">
                        <input type="checkbox" id="setting1-checkbox">
                        <span class="slideon-slider"></span>
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="left"><strong>${localize("index#program#modal_settings@settings_2")}:</strong></div>
                    <div class="right">
                      <label class="slideon">
                        <input type="checkbox" id="setting2-checkbox">
                        <span class="slideon-slider"></span>
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="left"><strong>${localize("index#program#modal_settings@settings_3")}:</strong></div>
                    <div class="right">
                      <label class="slideon">
                        <input type="checkbox" id="setting3-checkbox">
                        <span class="slideon-slider"></span>
                      </label>
                    </div>
                  </div>
                  <div class="row">&nbsp;</div>
                  <div class="row">
                    <div class="left" style="text-align: left">
                      <strong>${localize("index#program#modal_settings@settings_4")}</strong><br>
                      {Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}<br><br>
                      <strong>${localize("index#program#modal_settings@settings_4_1")}</strong>
                    </div>
                  </div>
                  <div class="row">
                    <div class="left" style="display: contents">
                      <input type="text" id="setting1-input" value="{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}">
                      <button type="button" id="saveFilenameFormat">${localize("index@save")}</button>
                    </div>
                  </div>
                </div>
              </form>`
                    ],
                    bodyStyle: "padding:0!important;text-align:center",
                    buttonList: [{ active: true, text: localize("index@close") }],
                    callback: (_modal, el) => {
                        initSaveSettings(el)
                    }
                }).open()
            })
            el.querySelector("." + program.NAME + "-modal-footer > ." + program.NAME + "-modal-button").addEventListener("click", () => {
                // Remove previous executed bookmarklet stuff
                const idsToRemove = [
                    program.NAME + '-cssGeneral',
                    program.NAME + '-cssSlideOn',
                    program.NAME + '-cssCarouselSlider'
                ]
                // Call the function to remove <style> tags from the entire DOM
                removeStyleTagsWithIDs(idsToRemove)
            })
        }
    }).open()
}

function handleInstagramSite() {
    new MediaScanner().execute(program, (scannerProgram: Program) => {
        if (process.env.DEV) {
            console.log("scannerFound", scannerProgram.foundMediaObj.found)
            console.log("foundByModule", scannerProgram.foundByModule)
        }

        if (scannerProgram.foundMediaObj.found) {
            handleMediaFound(document, scannerProgram.foundMediaObj.userName)
        } else {
            if (scannerProgram.foundMediaObj.mediaType == MediaType.Ad) {
                return
            }

            if (scannerProgram.regexProfilePath.test(scannerProgram.path)) {
                handleProfilePage()
            } else {
                handleMediaNotFound()
            }
        }
    })

    if (!process.env.DEV) {
        update(program.VERSION)
    }
}

function handleNonInstagramSite() {
    new Modal({
        heading: [
            `<h5>
          <span class="header-text-left">[${program.NAME}]</span>
          <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
        </h5>`
        ],
        body: [localize("index@alert_onlyWorks")],
        bodyStyle: "text-align:center",
        buttonList: [{ active: true, text: "Ok" }]
    }).open()
}

/* ===============================
 =            Program            =
 ===============================*/
// verify if are running on instagram site
if (program.hostname === "instagram.com" || program.hostname === "www.instagram.com") {
    handleInstagramSite()
} else {
    handleNonInstagramSite()
}
/* =====  End of Program  ======*/