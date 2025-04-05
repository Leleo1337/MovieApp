type ButtonTypes = {
    emoji: React.ReactNode
    text: string
    active: boolean
}

export default function Button({ emoji, text, active }: ButtonTypes) {
    return (
        <>                
            <button className={`flex flex-row-reverse justify-center gap-2 px-2 py-2 ${active? "text-button" : "text-gray-300"} cursor-pointer`}>
                {text}
                {emoji}
            </button>
        </>
    )
}  