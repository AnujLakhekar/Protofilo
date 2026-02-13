import React from 'react'
import StateProvider from "@/app/v2/_providers/StateProvider";
import Panel from "@/app/v2/panel";

const Page = () => {
    return (
        <StateProvider>
            <Panel />
        </StateProvider>
    )
}
export default Page
