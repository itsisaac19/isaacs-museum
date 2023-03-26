import React, { useEffect } from "react"

export const NavigationList = () => {
    const mouseEnter = (e) => {
        e.currentTarget.classList.remove('hide')
    }
    const mouseLeave = (e) => {
        e.currentTarget.classList.add('hide')
    }

    const scrollRef = React.createRef()

    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY > 315) {
                scrollRef.current.classList.add('fix')
            } else {
                scrollRef.current.classList.remove('fix')
            }
        }
        window.addEventListener('scroll', scrollHandler, {passive: true})
    })

    return (
    <div ref={scrollRef} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className={`navigation-wrapper hide`}>
        <div className={`table-wrap`}>
            <div className={`item-wrap active`}>
                <div className={`item-value`}>home</div>
                <div className={`item-wrap sub sub1 active tour`}>
                    <div className={`item-value`}>tour</div>
                    <div className={`item-wrap sub2 active`}>
                        <div className={`item-value`}>2020</div>
                    </div>
                    <div className={`item-wrap sub2`}>
                        <div className={`item-value`}>2021</div>
                    </div>
                    <div className={`item-wrap sub2`}>
                        <div className={`item-value`}>2022</div>
                    </div>
                    <div className={`item-wrap sub2`}>
                        <div className={`item-value`}>2023</div>
                    </div>
                </div>
                <div className={`item-wrap sub sub1`}>
                    <div className={`item-value`}>thank you's</div>
                </div>
            </div>
            <div className={`item-wrap`}>
                <div className={`item-value`}>works</div>
                <div className={`item-wrap sub sub1 worklist`}>
                    <div className={`item-value`}>tour</div>
                    <div className={`item-value`}>tour</div>
                    <div className={`item-value`}>tour</div>
                    <div className={`item-value`}>tour</div>
                </div>
            </div>
            <div className={`item-wrap`}>
                <div className={`item-value`}>contact</div>
            </div>
            <div className={`item-wrap`}>
                <div className={`item-value`}>about</div>
            </div>
      </div>
    </div>
    )
}