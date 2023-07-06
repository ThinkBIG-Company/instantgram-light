import { Program } from "./App"
import { MediaScanner } from "./modules/MediaScanner"
import { Modal } from "./components/Modal"
import { detect } from "detect-browser"
import update from "./modules/Update"
import localize from "./helpers/localize"
import getUserName from "./helpers/getUserName"

// Init browser detection
const browser = detect()

console.clear()

if (!window.localStorage.getItem("instantgram-light")) {
    // Settings doesn't exists, create it here
    const instantgramData = {
        version: "1.0",
        onlineVersion: "",
        lastVerification: 0,
        dateExpiration: 0,
        settings: [],
    }
    instantgramData.settings = [
        { "name": "Enable ads in posts:", "value": true },
        { "name": "Change the filename format for downloads. The default format is as follows:", "value": "{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}" }
    ]
    window.localStorage.setItem(
        "instantgram-light",
        JSON.stringify(instantgramData)
    )
} else {
    const instantgramData = {
        settings: [
            { "name": "Enable ads in posts:", "value": true },
            { "name": "Change the filename format for downloads. The default format is as follows:", "value": "{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}" }
        ],
    }
    const mergedObject = {
        ...JSON.parse(window.localStorage.getItem("instantgram-light") as string) as InstantgramData,
        ...instantgramData
    }

    window.localStorage.setItem(
        "instantgram-light",
        JSON.stringify(mergedObject)
    )
}

const program: Program = {
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

    settings: window.localStorage.getItem("instantgram-light") as string || [],
    settingsJSON: JSON.parse(window.localStorage.getItem("instantgram-light") as string) as InstantgramData || [],

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

/* ===============================
 =            Program            =
 ===============================*/
// verify if are running on instagram site
if (program.hostname == "instagram.com" || program.hostname == "www.instagram.com") {
    new MediaScanner().execute(program, function (scannerProgram: Program) {
        if (process.env.DEV) {
            console.log("scannerFound", scannerProgram.foundMediaObj.found)
            console.log("foundByModule", scannerProgram.foundByModule)
        }

        if (scannerProgram.foundMediaObj.found == false) {
            if (scannerProgram.regexProfilePath.test(scannerProgram.path)) {
                program.foundByModule = "CUSTOM"

                new Modal({
                    heading: [
                        `<h5>
                            <span class="header-text-left">[instantgram-light]</span>
                            <span class="header-text-middle">ProfilePage downloader</span>
                            <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
                        </h5>
                        `
                    ],
                    body: [
                        localize("index@profilepage_downloader_disabled")
                    ],
                    bodyStyle: "text-align:center",
                    buttonList: [{
                        active: true,
                        text: "Ok"
                    }]
                }).open()
            }

            if (scannerProgram.foundByModule == null || scannerProgram.foundByModule == undefined) {
                new Modal({
                    heading: [
                        `<h5>
                        <span class="header-text-left">[instantgram-light]</span>
                        <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
                    </h5>
                    `
                    ],
                    body: [
                        localize("index#program@alert_dontFound")
                    ],
                    bodyStyle: "text-align:center",
                    buttonList: [{
                        active: true,
                        text: "Ok"
                    }]
                }).open()
            }
        } else {
            // Fix stuttering videos
            const userName = getUserName(document, scannerProgram.foundMediaObj.mediaInfo)

            new Modal({
                heading: [
                    `<h5>
                          <span class="header-text-middle">@${userName}
                          <button class="instantgram-light-settings">
                          <svg style="margin-left: auto; margin-right: auto;" aria-label="Optionen" class="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Optionen</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg></button>
                          </span>
                      </h5>
                    `
                ],
                body: [scannerProgram.foundMediaObj.modalBody],
                bodyStyle: "padding:0!important;text-align:center",
                buttonList: [{
                    active: true,
                    text: localize("index@close")
                }],
                callback: (_modal: Modal, el: HTMLElement) => {
                    if (el.querySelector(".slider") !== null) {
                        const slider = el.querySelector(".slider") as HTMLElement
                        const slides = el.querySelectorAll(".slide")
                        const sliderControls = el.querySelector(".slider-controls")
                        let slideIndex = scannerProgram.foundMediaObj.selectedIndex
                        // Create buttons for each slide
                        for (let i = 0; i < slides.length; i++) {
                            const button = document.createElement("button") as HTMLElement
                            button.setAttribute("data-index", String(i))
                            button.innerHTML = String(i + 1)
                            button.addEventListener("click", () => {
                                slideIndex = i
                                updateSliderPosition()
                            });
                            sliderControls.appendChild(button)
                        }

                        const buttons = el.querySelectorAll(".slider-controls button")

                        function updateSliderPosition() {
                            const slideWidth = slides[0].clientWidth
                            const translateX = -slideWidth * slideIndex
                            slider.style.transform = `translateX(${translateX}px)`
                            buttons.forEach((button, index) => {
                                if (index === slideIndex) {
                                    button.classList.add("active")
                                } else {
                                    button.classList.remove("active")
                                }
                            })
                        }
                        // Set initial active button
                        buttons[slideIndex].classList.add("active")
                        updateSliderPosition()
                    }

                    // Settings modal
                    el.querySelector(".instantgram-light-settings").addEventListener("click", function (_event) {
                        new Modal({
                            heading: [
                                `<h5>
                                      <span class="header-text-left">[instantgram-light]</span>
                                      <span class="header-text-middle">${localize("index#program#modal_settings@title")}</span>
                                      <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
                                  </h5>
                                `
                            ],
                            body: [`<form style="padding-top: 25px;padding-bottom: 25px;padding-left: 20px;padding-right: 20px;"><div class="container"><div class="row mb-20"><strong>${localize("index#program#modal_settings@settings_attention")}</strong></div><div class="row"><div class="left"><strong>${localize("index#program#modal_settings@settings_1")}:</strong></div><div class="right"><label class="slideon"><input type="checkbox" id="enabledAds"><span class="slideon-slider"></span></label></div></div><div class="row">&nbsp;</div><div class="row"><div class="left" style="text-align: left"><strong>${localize("index#program#modal_settings@settings_2")}</strong><br>{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}<br><br><strong>${localize("index#program#modal_settings@settings_2_1")}</strong></div></div><div class="row"><div class="left" style="display: contents"><input type="text" id="customFilename" value="{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}"><button type="button" id="saveFormat">${localize("index@save")}</button></div></div></div></form>`],
                            bodyStyle: "padding:0!important;text-align:center",
                            buttonList: [{
                                active: true,
                                text: localize("index@close")
                            }],
                            callback: (_modal: Modal, el: HTMLElement) => {
                                let elements = el.querySelectorAll(".slideon.slideon-auto")
                                elements.forEach(function (element) {
                                    element.classList.remove("slideon-auto")
                                    let wrapper = document.createElement("label") as any
                                    wrapper.className = element.classList

                                    let slider = document.createElement("span")
                                    slider.className = "slideon-slider"

                                    element.after(wrapper)
                                    wrapper.appendChild(element)
                                    element.after(slider)
                                })

                                const settingsListData = program.settings
                                if (typeof settingsListData === "string") {
                                    let _data = JSON.parse(settingsListData) as InstantgramData

                                    // Fill the switches with the existing settings if available
                                    // ENABLE ADS
                                    (<any>el).querySelector("#enabledAds").checked = (_data.settings[0].value === true)
                                    const enabledAds = (<any>el).querySelector("#enabledAds")
                                    enabledAds.addEventListener("change", function (_event) {
                                        _data.settings = [
                                            { name: "Enable ads in posts:", value: (el.querySelector("#enabledAds") as HTMLInputElement).checked },
                                            { name: "Change the filename format for downloads. The default format is as follows:", value: _data.settings[1].value }
                                        ]
                                        window.localStorage.setItem(
                                            "instantgram-light",
                                            JSON.stringify(_data)
                                        )
                                    })
                                    // END ENABLE ADS
                                    // CUSTOM FILENAME
                                    const customFilename = (<any>el).querySelector("#customFilename")
                                    // Load custom filename
                                    customFilename.value = _data.settings[1].value

                                    const saveFormat = (<any>el).querySelector("#saveFormat")
                                    saveFormat.addEventListener("click", function (event) {
                                        event.preventDefault()

                                        _data.settings = [
                                            { name: "Enable ads in posts:", value: _data.settings[0].value },
                                            { name: "Change the filename format for downloads. The default format is as follows:", value: (el.querySelector("#customFilename") as HTMLInputElement).value }
                                        ]
                                        window.localStorage.setItem(
                                            "instantgram-light",
                                            JSON.stringify(_data)
                                        )

                                        saveFormat.textContent = localize("index@saved")
                                        saveFormat.style.color = "white"
                                        saveFormat.style.backgroundColor = "green"
                                        setTimeout(() => {
                                            saveFormat.textContent = localize("index@save")
                                            saveFormat.style.color = "black"
                                            saveFormat.style.backgroundColor = "buttonface"
                                        }, 1000)
                                    })
                                    // END CUSTOM FILENAME
                                }
                            }
                        }).open()
                    })

                    // Close callback
                    el.querySelector(".instantgram-modal-footer > .instantgram-modal-button").addEventListener("click", function (_event) {
                        // Cleanup stuff
                        // Get all elements that match the specified selector
                        const elements = document.querySelectorAll("[id^='instantgram-']")
                        elements.forEach(element => {
                            element.remove()
                        })
                    })
                }
            }).open()
        }
    })

    // Check everytime for an update on calling this
    if (!process.env.DEV) {
        update(program.VERSION)
    }
} else {
    new Modal({
        heading: [
            `<h5>
                <span class="header-text-left">[instantgram-light]</span>
                <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
            </h5>
            `
        ],
        body: [
            localize("index@alert_onlyWorks")
        ],
        bodyStyle: "text-align:center",
        buttonList: [{
            active: true,
            text: "Ok"
        }]
    }).open()
}
/* =====  End of Program  ======*/