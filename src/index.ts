import { Program } from './App'
import { MediaType } from './model/mediaType'
import { MediaScanner } from './modules/MediaScanner'
import { Modal } from './components/Modal'
import localize from './helpers/localize'
import { detect } from "detect-browser"
import update from './modules/Update'

// Init browser detection
const browser = detect()

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

    settings: window.localStorage.getItem('instantgram-light') as string || [],
    settingsJSON: JSON.parse(window.localStorage.getItem('instantgram-light') as string) as InstantgramData || [],

    foundByModule: null
}

function unixTimestampToDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000)
    const isoDate = date.toISOString().slice(0, 10)
    const time = date.toISOString().slice(11, 16).replace(':', '-')
    return `${isoDate}--${time}`
}

function getUserName(element: Document, post: any): string {
    if (post?.owner?.username) {
        return post?.owner?.username as string
    } else {
        const userNameContainer = element.querySelectorAll("header a")[1]
        if (userNameContainer) {
            return userNameContainer.textContent
        } else {
            return undefined
        }
    }
}

if (process.env.DEV) {
    console.info(['Developer Mode Caution!', program])

    if (program.browser) {
        console.info(['Browser Name', program.browser.name])
        console.info(['Browser Version', program.browser.version])
        console.info(['Browser OS', program.browser.os])
    }
}

/* ===============================
 =            Program            =
 ===============================*/
// verify if are running on instagram site
if (program.hostname == 'instagram.com' || program.hostname == 'www.instagram.com') {
    new MediaScanner().execute(program, function (scannerFound: boolean, foundMediaType: MediaType, foundMediaUrl: string, foundMediaInfo: any, scannerProgram: Program) {
        program.foundByModule = scannerProgram.foundByModule

        if (process.env.DEV) {
            console.log('scannerFound', scannerFound)
            console.log('foundByModule', program.foundByModule)
        }

        if (scannerFound == false) {
            if (scannerProgram.regexProfilePath.test(scannerProgram.path)) {
                program.foundByModule = 'CUSTOM'

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
                        localize('index@profilepage_downloader_disabled')
                    ],
                    bodyStyle: 'text-align:center',
                    buttonList: [{
                        active: true,
                        text: 'Ok'
                    }]
                }).open()
            }
        } else {
            // Fix stuttering videos
            const updatedUrl = foundMediaUrl.replace(/\/\/[^/]+\.cdninstagram\.com/, "//scontent.cdninstagram.com")
            const userName = getUserName(document, foundMediaInfo)

            // Switch frontend depends on media type
            let modalBody = ""
            if (/\.(mp4)(\?.*)?$/.test(updatedUrl)) {
                modalBody += `<div style="background:black;"><video src="${updatedUrl}" style="background:black; max-width: 500px; max-height: 400px; height: auto;" controls></video>`
                // Add download button
                modalBody += `<button onclick="downloadFromHref('${updatedUrl}', '${userName + '_' + unixTimestampToDate(foundMediaInfo.postedAt)}.mp4')" style="font-size:20px;font-weight:600;margin-top:-4px;" class="instantgram-modal-db">Download</button>`

                modalBody += `</div>`
            } else {
                modalBody += `<div style="background:black;"><img src="${updatedUrl}" style="max-width: 500px; max-height: 400px; height: auto;" />`
                // Add download button
                modalBody += `<button onclick="downloadFromHref('${updatedUrl}', '${userName + '_' + unixTimestampToDate(foundMediaInfo.postedAt)}.jpg')" style="font-size:20px;font-weight:600;margin-top:-4px;" class="instantgram-modal-db">Download</button>`

                modalBody += `</div>`
            }

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
                body: [modalBody],
                bodyStyle: 'padding:0!important;text-align:center',
                buttonList: [{
                    active: true,
                    text: localize('index#program#profilePageDownload@is_private_modal_btn')
                }],
                callback: (_modal: Modal, el: HTMLElement) => {
                    el.querySelector('.instantgram-light-settings').addEventListener('click', function (_event) {
                        new Modal({
                            heading: [
                                `<h5>
                                      <span class="header-text-left">[instantgram-light]</span>
                                      <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
                                  </h5>
                                `
                            ],
                            body: [`<form style="padding-top: 25px;padding-bottom: 50px;padding-left: 20px;padding-right: 20px;"><div style="position: relative;">
                            <div class="left-div" style="position: absolute;"><label>Enable monetized posts (Requires ad blockers to be disabled):</label></div>
                            <div class="right-div" style="position: absolute;right: 0;"><label class="slideon" style="margin-left: 100px;">
                            <input type="checkbox" id="enabledAds">
                            <span class="slideon-slider"></span>
                          </label></div><div style="clear:both;"></div>
                          </div></form>`],
                            bodyStyle: 'padding:0!important;text-align:center',
                            buttonList: [{
                                active: true,
                                text: localize('index#program#profilePageDownload@is_private_modal_btn')
                            }],
                            callback: (_modal: Modal, el: HTMLElement) => {
                                var elements = el.querySelectorAll('.slideon.slideon-auto')
                                elements.forEach(function (element) {
                                    element.classList.remove("slideon-auto")
                                    var wrapper = document.createElement('label') as any
                                    wrapper.className = element.classList

                                    var slider = document.createElement('span')
                                    slider.className = 'slideon-slider'

                                    element.after(wrapper)
                                    wrapper.appendChild(element)
                                    element.after(slider)
                                })

                                const settingsListData = program.settings
                                if (typeof settingsListData === 'string') {
                                    let _data = JSON.parse(settingsListData) as InstantgramData

                                    if (_data.settings === undefined) {
                                        // Create default object
                                        _data.settings = [
                                            { name: "Enable ads Posts", value: true }
                                        ]
                                    }

                                    // Fill the switches with the existing settings if available
                                    (<any>el).querySelector("#enabledAds").checked = (_data.settings[0].value === true)

                                    const enabledAds = (<any>el).querySelector("#enabledAds")
                                    enabledAds.addEventListener('change', function (_event) {
                                        _data.settings = [
                                            { name: "Enable ads Posts", value: (el.querySelector("#enabledAds") as HTMLInputElement).checked }
                                        ]

                                        window.localStorage.setItem(
                                            'instantgram-light',
                                            JSON.stringify(_data)
                                        )
                                    })
                                } else {
                                    // No
                                    let _data = JSON.parse(settingsListData) as InstantgramData
                                    _data.settings = [{ "name": "Enable ads Posts", "value": true }]
                                    window.localStorage.setItem(
                                        'instantgram-light',
                                        JSON.stringify(_data)
                                    )
                                }
                            }
                        }).open()
                    })
                }
            }).open()
        }

        if (program.foundByModule == undefined) {
            if (!process.env.DEV) {
                if (foundMediaType == MediaType.UNDEFINED) {
                    new Modal({
                        heading: [
                            `<h5>
                                <span class="header-text-left">[instantgram-light]</span>
                                <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
                            </h5>
                            `
                        ],
                        body: [
                            localize('index#program@alert_dontFound')
                        ],
                        bodyStyle: 'text-align:center',
                        buttonList: [{
                            active: true,
                            text: 'Ok'
                        }]
                    }).open()
                }
            }
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
            localize('index@alert_onlyWorks')
        ],
        bodyStyle: 'text-align:center',
        buttonList: [{
            active: true,
            text: 'Ok'
        }]
    }).open()
}
/* =====  End of Program  ======*/