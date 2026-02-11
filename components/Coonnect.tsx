"use client"
import React, {useState} from 'react'
import Stepper, {Step} from "./animations/connectWithMe";


const Coonnect = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    return (
        <div className="w-full max-w-lg mx-auto px-2 sm:px-4 md:px-8">
            <Stepper
                initialStep={0}
                onStepChange={(step) => console.log("Step:", step)}
                onFinalStepCompleted={() => {
                    console.log("Form Data:", { name, email, message });
                }}
                backButtonText="Previous"
                nextButtonText="Next"
            >
                {/* STEP 1 */}
                <Step>
                    <h2 className="text-lg sm:text-xl font-bold p-2">Let’s Connect!</h2>
                    <p className={"mt-2 text-sm sm:text-base"}>
                        Want to collaborate, hire me, or just say hi?
                        Follow the steps to send me a message.
                    </p>
                </Step>

                {/* STEP 2 */}
                <Step>
                    <h2 className={"capitalize font-bold p-3 text-base sm:text-lg"}>Your Info</h2>

                    <input
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input border p-2 rounded w-full mb-3 text-sm sm:text-base"
                    />

                    <input
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input border p-2 rounded w-full text-sm sm:text-base"
                    />
                </Step>

                {/* STEP 3 */}
                <Step>
                    <h2 className={"p-2 text-base sm:text-lg"}>Your Message</h2>
                    <textarea
                        placeholder="Write your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="input border p-2 rounded w-full h-32 text-sm sm:text-base"
                    />
                </Step>

                {/* STEP 4 */}
                <Step>
                    <h2 className="text-base sm:text-lg">Ready to Send</h2>
                    <p className="text-sm sm:text-base">Click finish to connect with me.</p>
                    <div className="mt-4 text-sm sm:text-base">
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Message:</strong> {message}</p>
                    </div>
                </Step>
            </Stepper>
        </div>
    )
}
export default Coonnect
