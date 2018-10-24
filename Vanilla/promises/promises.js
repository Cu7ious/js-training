document.addEventListener("DOMContentLoaded", () => {
    function delay(ms) {
        function executor(resolve, reject) {
            if (typeof ms !== "number") {
                reject(new Error("ms is not a number."));
            }

            setTimeout(resolve, ms);
        }
        return new Promise(executor);
    }

    function blink(el, time) {
        console.log("Blinking animation function was called");

        delay(DELAY_TIME)
            .then(() => {
                h2.style.opacity = 0;
            })
            .catch(err => console.log(err));

        delay(DELAY_TIME * 2)
            .then(() => {
                h2.style.opacity = 100;
            })
            .catch(err => console.log(err));
    }

    const h2 = document.getElementsByTagName("h2")[0];
    h2.style.transition = "opacity .5s linear";
    const DELAY_TIME = 1000;

    blink(h2, DELAY_TIME);
    setInterval(() => {
        blink(h2, DELAY_TIME);
    }, DELAY_TIME * 2);
});