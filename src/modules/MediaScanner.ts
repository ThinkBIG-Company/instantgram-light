import { Program } from "../App"
import { Module } from "./Module"
import { MediaScanResult } from "../model/MediaScanResult"
import { Modal, ModalButton } from "../components/Modal"
import { cssCarouselSlider, cssGeneral, cssSlideOn, logo } from "../components/Interconnect"
import { FeedScanner } from "./FeedScanner"
import { PostAndReelScanner } from "./PostAndReelScanner"
import { ProfileScanner } from "./ProfileScanner"
import { ReelsScanner } from "./ReelsScanner"
import { StoriesScanner } from "./StoriesScanner"
import localize from "../helpers/localize"

export class MediaScanner implements Module {
    svgSettings: any = null

    public getName(): string {
        return "MediaScanner"
    }

    constructor() {
        const svgNS = "http://www.w3.org/2000/svg"
        this.svgSettings = document.createElementNS(svgNS, "svg")
        this.svgSettings.setAttribute("style", "margin-left: auto; margin-right:auto; display:block;")
        this.svgSettings.setAttribute("aria-label", "Optionen")
        this.svgSettings.setAttribute("class", "x1lliihq x1n2onr6")
        this.svgSettings.setAttribute("color", "rgb(255, 255, 255)")
        this.svgSettings.setAttribute("fill", "rgb(255, 255, 255)")
        this.svgSettings.setAttribute("height", "24")
        this.svgSettings.setAttribute("role", "img")
        this.svgSettings.setAttribute("viewBox", "0 0 24 24")
        this.svgSettings.setAttribute("width", "24")

        const title = document.createElementNS(svgNS, "title")
        title.textContent = "Optionen"
        this.svgSettings.appendChild(title)

        const circle = document.createElementNS(svgNS, "circle")
        circle.setAttribute("cx", "12")
        circle.setAttribute("cy", "12")
        circle.setAttribute("fill", "none")
        circle.setAttribute("r", "8.635")
        circle.setAttribute("stroke", "currentColor")
        circle.setAttribute("stroke-linecap", "round")
        circle.setAttribute("stroke-linejoin", "round")
        circle.setAttribute("stroke-width", "2")
        this.svgSettings.appendChild(circle)

        const path = document.createElementNS(svgNS, "path")
        path.setAttribute("d", "M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096")
        path.setAttribute("fill", "none")
        path.setAttribute("stroke", "currentColor")
        path.setAttribute("stroke-linejoin", "round")
        path.setAttribute("stroke-width", "2")
        this.svgSettings.appendChild(path)
    }

    /** Initialize settings listeners */
    private initModalSettingsListeners(el: HTMLElement, program: Program) {
        const myTabs = document.querySelectorAll("div.nav-tabs > button.nav-link")
        const panes = document.querySelectorAll(".tab-pane")

        const handleClick = (e: MouseEvent): void => {
            e.preventDefault()

            myTabs.forEach(t => t.classList.remove("active"))
            panes.forEach(p => p.classList.remove("show", "active"))

            const target = e.currentTarget as HTMLElement
            target.classList.add("active")

            const activePaneID = target.getAttribute("data-target")
            if (activePaneID) {
                const activePane = document.querySelector(activePaneID) as HTMLElement
                if (activePane) {
                    activePane.classList.add("show", "active")
                }
            }
        }
        myTabs.forEach(tab => {
            tab.addEventListener("click", handleClick as EventListener)
        })

        // Handle checkboxes
        Array.from(el.querySelectorAll<HTMLInputElement>('label.slideon input[type="checkbox"]')).forEach((checkbox) => {
            const checkboxKey = `${program.STORAGE_NAME}_${checkbox.id.replace(/-/g, "_")}`
            checkbox.checked = localStorage.getItem(checkboxKey) === "true"
            checkbox.addEventListener("change", () => {
                localStorage.setItem(checkboxKey, String(checkbox.checked))
            })
        })

        // Handle input text and button
        const inputFileFormat = el.querySelector<HTMLInputElement>('#settings-general-4')
        if (inputFileFormat) {
            const inputKey = `${program.STORAGE_NAME}_settings_general_4`
            inputFileFormat.value = localStorage.getItem(inputKey) || "{Username}__{Year}-{Month}-{Day}--{Hour}-{Minute}"

            const saveFilenameFormatBtn = el.querySelector<HTMLElement>(`#settings-general-btn-4`)
            saveFilenameFormatBtn.addEventListener("click", (event: Event) => {
                event.preventDefault()
                localStorage.setItem(inputKey, inputFileFormat.value)
                this.updateInputButtonStyle(saveFilenameFormatBtn, "saved", `${program.NAME}-primary`, `${program.NAME}-success`)
                setTimeout(() => {
                    this.updateInputButtonStyle(saveFilenameFormatBtn, "save", `${program.NAME}-success`, `${program.NAME}-primary`)
                }, 1000)
            })
        }
    }

    /** Initialize necessary styles */
    private initializeStyles(program: Program): void {
        this.removeStyleTagsWithIDs([
            program.NAME + "-cssGeneral",
            program.NAME + "-cssSlideOn",
            program.NAME + "-cssCarouselSlider"
        ])

        this.appendStyles(program.NAME + "-cssGeneral", cssGeneral)
        this.appendStyles(program.NAME + "-cssSlideOn", cssSlideOn)
        this.appendStyles(program.NAME + "-cssCarouselSlider", cssCarouselSlider)
    }

    /** Adds CSS styles to the DOM */
    private appendStyles(styleId: string, cssContent: string): void {
        const styleElement = document.createElement("style")
        styleElement.id = styleId
        styleElement.innerHTML = cssContent
        document.body.appendChild(styleElement)
    }

    /** Display modal with the given body and heading */
    private displayModal(result: MediaScanResult, heading: string, bodyStyle: string, buttonList: ModalButton[], callback) {
        new Modal({
            heading: [heading],
            body: [result.modalBody],
            bodyStyle: bodyStyle,
            buttonList: buttonList,
            callback: callback,
        }).open()
    }

    public handleSettingsButtonClick(program: Program): void {
        const createElement = (tag, className = '', attributes = {}, str = '') => {
            const el = document.createElement(tag)
            if (className) el.className = className
            Object.keys(attributes).forEach(attr => el.setAttribute(attr, attributes[attr]))
            if (str) el.innerHTML = str
            return el
        }

        const createListGroupItem = (title, description, settingsName, isLargeInput) => {
            const item = createElement('div', 'list-group-item')
            const row = createElement('div', 'row align-items-center')
            const col = createElement('div', 'col pr-0')
            col.appendChild(createElement('strong', 'mb-0', {}, title))
            if (description) col.appendChild(createElement('p', 'text-muted mb-0', {}, description))

            const colAuto = createElement('div', 'col-auto')
            const label = createElement('label', 'slideon')
            const input = createElement('input', '', { type: 'checkbox', id: `settings-${settingsName}` })
            const span = createElement('span', 'slideon-slider')
            label.appendChild(input)
            label.appendChild(span)
            colAuto.appendChild(label)

            if (isLargeInput) {
                // Create and add a paragraph to the new div
                const div = createElement(
                    'div',
                    'form-group',
                    { style: 'display: flex; flex-direction: column; align-items: flex-start;' },
                    `<strong class="col pr-0">${title}</strong>
                     <p class="text-muted ml-15 mb-0">${description}</p>
                     <input type="text" class="form-control ml-15 mt-1 w94" id="settings-${settingsName}" placeholder="${title}">
                     <button type="submit" class="${program.NAME}-btn ${program.NAME}-btn-primary mb-2 mt-2" id="settings-general-btn-4" style="align-self: flex-end; margin-right: 12px;">${localize("save")}</button>`
                )

                row.appendChild(div)
            } else {
                row.appendChild(col)
                row.appendChild(colAuto)
            }
            item.appendChild(row)

            return item
        }

        const container = createElement('div', 'container')
        const row = createElement('div', 'row justify-content-center')
        const col = createElement('div', 'col-12 col-lg-10 col-xl-8 mx-auto')
        const my4 = createElement('div', 'my-4')
        const nav = createElement('nav')
        const navTabs = createElement('div', 'nav nav-tabs', { id: 'nav-tab', role: 'tablist' })

        navTabs.appendChild(createElement('button', 'nav-link active', {
            id: 'nav-general-tab', 'data-toggle': 'tab', 'data-target': '#nav-general', type: 'button', role: 'tab',
            'aria-controls': 'nav-general', 'aria-selected': 'true'
        }, `${localize("modalSettingsGeneral")}`))
        navTabs.appendChild(createElement('button', 'nav-link', {
            id: 'nav-stories-tab', 'data-toggle': 'tab', 'data-target': '#nav-stories', type: 'button', role: 'tab',
            'aria-controls': 'nav-stories', 'aria-selected': 'false'
        }, 'Stories'))

        const tabContent = createElement('div', 'tab-content', { id: 'nav-tabContent' })
        const generalPane = createElement('div', 'tab-pane fade active show', { id: 'nav-general', role: 'tabpanel', 'aria-labelledby': 'nav-general-tab' })
        const storiesPane = createElement('div', 'tab-pane fade', { id: 'nav-stories', role: 'tabpanel', 'aria-labelledby': 'nav-stories-tab' })

        const items = [
            { title: 'modalSettingsGenTitle1', description: 'modalSettingsGenDesc1', settingsName: 'general-1' },
            { title: 'modalSettingsGenTitle2', description: 'modalSettingsGenDesc2', settingsName: 'general-2' },
            { title: 'modalSettingsGenTitle3', description: 'modalSettingsGenDesc3', settingsName: 'general-3' },
            { title: 'modalSettingsGenTitle4', description: 'modalSettingsGenDesc4', settingsName: 'general-4', isLargeInput: true },
            { title: 'modalSettingsStoriesTitle1', description: 'modalSettingsStoriesDesc1', settingsName: 'stories-1' },
            { title: 'modalSettingsStoriesTitle2', description: 'modalSettingsStoriesDesc2', settingsName: 'stories-2' },
            { title: 'modalSettingsStoriesTitle3', description: 'modalSettingsStoriesDesc3', settingsName: 'stories-3' },
        ]
        items.forEach((item) => {
            const pane = item.title.includes('Gen') ? generalPane : storiesPane
            pane.appendChild(createListGroupItem(localize(item.title), localize(item.description), item.settingsName, item.isLargeInput))
        })

        tabContent.appendChild(generalPane)
        tabContent.appendChild(storiesPane)

        nav.appendChild(navTabs)

        my4.appendChild(nav)
        my4.appendChild(tabContent)
        my4.appendChild(createElement('div', 'alert alert-warning mt-3', {}, localize("modalSettingsAttention")))
        col.appendChild(my4)
        row.appendChild(col)
        container.appendChild(row)

        new Modal({
            heading: [
                `<h5>
                    <span class="header-text-left">${logo}</span>
                    <span class="header-text-middle">${localize("modalSettingsTitle")}</span>
                    <span class="header-text-right" style="margin-right: 0">v${program.VERSION}</span>
                </h5>`
            ],
            body: [container],
            bodyStyle: null,
            buttonList: [{ active: true, text: localize("close") }],
            callback: (_modal, el) => {
                this.initModalSettingsListeners(el as HTMLElement, program)
            }
        }).open()
    }

    /** Handles different URL patterns */
    private async handleURLPatterns(program: Program): Promise<void> {
        if (!program.hostname.includes("instagram.com")) {
            new Modal({
                heading: [
                    `<h5>
                        <span class="header-text-left">${logo}</span>
                        <span class="header-text-right">v${program.VERSION}<button class="${program.NAME}-settings" style="margin-left:10px">${this.svgSettings.outerHTML}</button></span>
                    </h5>`
                ],
                body: [localize("alertWorksOnlyOn")],
                bodyStyle: "text-align:center;padding:20px",
                buttonList: [{ active: true, text: "Ok" }],
                callback: (_modal, el) => {
                    el.querySelector(`.${program.NAME}-settings`).addEventListener("click", () => {
                        this.handleSettingsButtonClick(program);
                    })
                }
            }).open()
            return
        }

        const tests = [
            { regex: program.regexStoriesURI, scanner: StoriesScanner },
            { regex: program.regexProfilePath, scanner: ProfileScanner },
            { regex: program.regexRootPath, scanner: FeedScanner },
            { regex: program.regexPostPath, scanner: PostAndReelScanner },
            { regex: program.regexReelURI, scanner: PostAndReelScanner },
            { regex: program.regexReelsURI, scanner: ReelsScanner },
        ]

        for (const test of tests) {
            if (test.regex.test(window.location.pathname)) {
                try {
                    const scanner = new test.scanner()
                    const scannerResult = await scanner.execute(program)
                    if (scannerResult.found) {
                        scannerResult.foundByModule = scanner.getName()
                        this.displayModal(scannerResult,
                            `<h5>
                                <span class="header-text-left">${logo}</span>
                                <span class="header-text-middle"><a href="${scannerResult.userLink}">@${scannerResult.userName}</a></span>
                                <span class="header-text-right"><button class="${program.NAME}-settings">${this.svgSettings.outerHTML}</button></span>
                            </h5>`,
                            "padding:0!important;text-align:center",
                            [{ active: true, text: localize("close") }],
                            (_modal, el) => {
                                if (el.querySelector(".slider")) {
                                    const slider = el.querySelector(".slider")
                                    const slides = el.querySelectorAll(".slide")
                                    const sliderControls = el.querySelector(".slider-controls")
                                    let sliderIndex = scannerResult.selectedSliderIndex

                                    // Attach event listeners to the slides
                                    slides.forEach((_slide, i) => {
                                        const button = document.createElement("button")
                                        button.innerHTML = String(i + 1)
                                        button.dataset.index = String(i)
                                        button.classList.toggle("active", slides.length === 1)
                                        if (slides.length > 1) {
                                            button.addEventListener("click", () => {
                                                sliderIndex = i
                                                updateSliderPosition(true)
                                            })
                                        }
                                        sliderControls.appendChild(button)
                                    })

                                    // Update the position of the slider
                                    let slideTimer
                                    const updateSliderPosition = (resetTimer) => {
                                        const isFullscreen = document.fullscreenElement !== null
                                        if (isFullscreen) return
                                        pauseResetAllVideos(false)
                                        slider.style.transform = `translateX(${-slides[0].clientWidth * sliderIndex}px)`;
                                        [...sliderControls.children].forEach((button, index) => {
                                            button.classList.toggle("active", index === sliderIndex)
                                        })

                                        if (resetTimer) clearTimeout(slideTimer)
                                        if (localStorage.getItem(`${program.STORAGE_NAME}_settings_general_3`) === "true")
                                            checkAndPlayVideoOrStartTimer()
                                    }

                                    // Play video or restart timer
                                    const checkAndPlayVideoOrStartTimer = () => {
                                        const currentSlide = slides[sliderIndex]
                                        const video = currentSlide.querySelector("video")
                                        video ? video.play() && (video.onended = advanceSlide) : restartSlideTimer()
                                    }

                                    const advanceSlide = () => {
                                        sliderIndex = (sliderIndex + 1) % slides.length
                                        updateSliderPosition(false)
                                    }

                                    const restartSlideTimer = () => {
                                        slideTimer = setTimeout(advanceSlide, 5000)
                                    }

                                    const pauseResetAllVideos = (reset) => {
                                        slides.forEach(slide => {
                                            const video = slide.querySelector("video")
                                            if (video) {
                                                video.pause()
                                                if (reset)
                                                    video.currentTime = 0
                                            }
                                        })
                                    }

                                    if (slides.length > 1) updateSliderPosition(false)

                                    // Function to handle fullscreen change
                                    const handleFullscreenChange = () => {
                                        const isFullscreen = document.fullscreenElement !== null
                                        if (isFullscreen) {
                                            clearTimeout(slideTimer)
                                        }
                                    }

                                    // Add fullscreen change event listener
                                    document.addEventListener('fullscreenchange', handleFullscreenChange)
                                }

                                el.querySelector(`.${program.NAME}-settings`).addEventListener("click", () => {
                                    this.handleSettingsButtonClick(program)
                                })
                            }
                        )
                    } else {
                        new Modal({
                            heading: [
                                `<h5>
                                    <span class="header-text-left">${logo}</span>
                                    <span class="header-text-right">v${program.VERSION}<button class="${program.NAME}-settings" style="margin-left:10px">${this.svgSettings.outerHTML}</button></span>
                                </h5>`
                            ],
                            body: [localize("alertNotFound")],
                            bodyStyle: "text-align:center;padding:20px",
                            buttonList: [{ active: true, text: "Ok" }],
                            callback: (_modal, el) => {
                                el.querySelector(`.${program.NAME}-settings`).addEventListener("click", () => {
                                    this.handleSettingsButtonClick(program)
                                })
                            }
                        }).open()
                    }
                } catch (error) {
                    const scanner = new test.scanner()
                    console.error(`Error executing scanner ${scanner.getName()}:`, error)
                }
            }
        }
    }

    /** Check if modal is open */
    private isModalOpen(program: Program): boolean {
        return !!document.querySelector("div." + program.NAME + "-modal-overlay." + program.NAME + "-modal-visible." + program.NAME + "-modal-show")
    }

    /** Removes style tags by IDs */
    private removeStyleTagsWithIDs(idsToRemove: string[]): void {
        idsToRemove.forEach(id => {
            const styleTag = document.getElementById(id)
            if (styleTag) {
                styleTag.remove()
            }
        })
    }

    /** Shake the modal window */
    private shakeModal(modalSelector: string): void {
        const modal = document.querySelector("." + modalSelector) as HTMLElement
        if (modal) {
            modal.style.animation = "horizontal-shaking 0.25s linear infinite"
            setTimeout(() => modal.style.animation = null, 1000)
        }
    }

    private updateInputButtonStyle(button: HTMLElement, text: string, oldClass: string, newClass: string) {
        button.textContent = localize(text)
        if (button.classList.contains(newClass)) {
            button.classList.remove(newClass)
            button.classList.add(oldClass)
        } else {
            button.classList.remove(oldClass)
            button.classList.add(newClass)
        }
    }

    /** Main execution logic */
    public async execute(program: Program): Promise<void> {
        try {
            if (this.isModalOpen(program)) {
                this.shakeModal(`${program.NAME}-modal`)
                return
            }

            this.initializeStyles(program)
            await this.handleURLPatterns(program)
        } catch (e) {
            console.error(`${this.getName()}()`, `[${program.NAME}] ${program.VERSION}`, e)
        }
    }
}