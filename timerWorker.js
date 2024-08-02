let timerId;
let timeLeft = 0;

self.onmessage = function(e) {
    const { command, minutes } = e.data;

    switch(command) {
        case 'start':
            timeLeft = minutes * 60;
            timerId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    self.postMessage({ timeLeft });
                } else {
                    clearInterval(timerId);
                    self.postMessage({ timeLeft: 0, finished: true });
                }
            }, 1000);
            break;
        case 'pause':
            clearInterval(timerId);
            break;
        case 'reset':
            clearInterval(timerId);
            timeLeft = 0;
            self.postMessage({ timeLeft });
            break;
    }
}
