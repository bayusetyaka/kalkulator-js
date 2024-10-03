const readline = require("readline-sync");

let hasil = 0; // Variabel untuk menyimpan hasil kalkulasi sebelumnya
const requiredOperator = ["+", "-", "*", "/", "%"];

function processHasil(inputanPertama, inputanKedua, operator) {
    switch (operator) {
        case "+":
            return inputanPertama + inputanKedua;
        case "-":
            return inputanPertama - inputanKedua;
        case "*":
            return inputanPertama * inputanKedua;
        case "/":
            if (inputanKedua === 0) {
                console.log("Angka kedua tidak boleh bernilai 0");
                return null; // Kembalikan null untuk menandakan kesalahan
            }
            return inputanPertama / inputanKedua;
        case "%":
            return inputanPertama % inputanKedua;
        default:
            return null; // Kembalikan null jika operator tidak valid
    }
}

function showHistory(history) {
    console.log("Riwayat Kalkulasi:");
    history.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry}`);
    });
}

const history = []; // Array untuk menyimpan riwayat kalkulasi
let continueCalculating = true;

while (continueCalculating) {
    const angka = parseFloat(readline.question("Masukan angka pertama (atau hasil sebelumnya jika ingin melanjutkan): "));
    const operator = readline.question("Masukan operator (+ - * % /) :");
    let angka2;

    // Memeriksa apakah pengguna ingin menggunakan hasil sebelumnya
    if (isNaN(angka)) {
        console.log("Inputan angka pertama tidak valid. Menggunakan hasil sebelumnya.");
        angka = hasil; // Gunakan hasil sebelumnya
    }

    if (isNaN(angka)) {
        console.log("Inputan anda tidak valid");
        continue; // Lanjutkan ke iterasi berikutnya
    }

    if (!requiredOperator.includes(operator)) {
        console.log("Pilih sesuatu operator yang tersedia");
        continue; // Lanjutkan ke iterasi berikutnya
    }

    angka2 = parseFloat(readline.question("Masukan angka kedua: "));

    if (isNaN(angka2)) {
        console.log("Inputan angka kedua tidak valid");
        continue; // Lanjutkan ke iterasi berikutnya
    }

    hasil = processHasil(angka, angka2, operator);

    if (hasil !== null) {
        console.log(`Hasil: ${hasil}`);
        history.push(`${angka} ${operator} ${angka2} = ${hasil}`); // Simpan riwayat
    }

    const continueResponse = readline.question("Ingin melanjutkan perhitungan? (ya/tidak): ");
    continueCalculating = continueResponse.toLowerCase() === "ya";

    if (!continueCalculating) {
        showHistory(history); // Tampilkan riwayat sebelum keluar
    }
}
