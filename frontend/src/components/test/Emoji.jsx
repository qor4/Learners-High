import JSConfetti from "js-confetti";
import { conteffi } from "../../App";

const Emoji = () => {
    const showConteffi = () => {
        conteffi.addConfetti({
            emojis: ["🍔", "🍕", "🍺"],
            emojiSize: 100,
            confettiNumber: 30,
          });
        };

    return (
        <>
        <button onClick={showConteffi}>이벤트 펑</button>
        </>
    )
}

export default Emoji;