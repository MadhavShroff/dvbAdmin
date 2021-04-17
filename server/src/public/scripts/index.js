import QrScanner from "../assets/qrscanner/qr-scanner.min.js";

console.log(QrScanner);

QrScanner.WORKER_PATH = '../assets/qrscanner/qr-scanner-worker.min.js';

const video = $("#preview")[0]
// const flashToggle = document.getElementById('#flash')
const startScanButton = $("#startScan");
var isScannerActive = false;

QrScanner.hasCamera().then(hasCamera => {
    console.log(`hasCamera?: ${hasCamera}`);
});

const scanner = new QrScanner(video, result => {
    console.log("Hello");
    if(result !== "No QR code found") {
        scanner.stop()
        window.location = result;
    }
}, error => console.log(error));

$(startScanButton).on("click", () => {
    if(isScannerActive) { // Disable Scanner
        video.style.display = 'none';
        scanner.stop();
        resetCols()
    } else { // Enable Scanner
        video.style.display = 'block'
        scanner.start().then(() => {
            console.log("Hello");
            scanner.hasFlash().then(hasFlash => {
                if (hasFlash) {
                    // TODO: If flash is available, show a button to enable/disable it
                    // flashToggle.addEventListener('click', () => {
                    //     scanner.toggleFlash().then(() => flashState.textContent = scanner.isFlashOn() ? 'on' : 'off');
                    // });
                    console.log(hasFlash);
                }
            });
        });
        setCols();
    }
    isScannerActive = !isScannerActive;
});

const resetCols = () => {
    // change size of cols to show more of the video
}

const setCols = () => {

}

