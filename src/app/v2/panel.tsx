"use client"

import React from 'react'
import LetterGlitch from "@/component/LetterGlitch";
import {useStateContext} from "@/app/v2/_providers/StateProvider";

const Mouth = () => {
    return (
        <div className={"absolute z-20 p-6 bg-purple-800  "}>
            {/* coming soon! */}
        </div>
    )
}

const Controler = () => {
    const {state, setState} = useStateContext();

    React.useEffect(() => {
        setState("Start")
    }, [setState])

    function handleStates() {
        if (state === "Start") {
            setState("Stop")
        } else {
            setState("Start")
        }
    }

    return (
        <div
            className={"absolute z-20 left-30 p-10 flex flex-col gap-2 border border-green-700 bg-black border-b-2 border-b-green-400 "}>
            <div>
                <h1 className={"font-bold text-green-500 font-display  text-[2.5rem]"}>Anuj
                    Lakhe<span
                        className={"selected"}>kar</span></h1>
                <hr className={"border-1 mt-2 mb-2 border-green-600"}/>
                <h2 className={"font-display"}>Developer.</h2>
                <div className={"m-4 w-[140px] text-center p-2 font-display bg-purple-600"}>
                    <button onClick={handleStates}>
                        {state}
                    </button>
                </div>
            </div>
        </div>
    )
}

const EmbedingOannel = () => {
    return (
        <div className={"absolute z-20 p-6 bg-purple-800  "}>Content</div>
    )
}

const Panel = () => {
    return (
        <div className={"dark"}>
            <div className="min-h-screen flex justify-center items-center bg-black text-gray-100">
                <div className="flex justify-center  w-full h-screen items-center">
                    <div className={"absolute z-20 w-full h-full flex flex-col items-center justify-center gap-10"}>
                        <Controler/>
                        <EmbedingOannel/>
                        <Mouth />
                    </div>
                    <LetterGlitch outerVignette={false} centerVignette={false} className={"rounded-lg opacity-30"}/>
                </div>
            </div>
        </div>
    )
}
export default Panel
