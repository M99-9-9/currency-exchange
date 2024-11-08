

// script.js

// استبدل `YOUR_API_KEY` بمفتاح API من خدمة أسعار الصرف
const apiURL = 'https://api.exchangerate-api.com/v4/latest/';

async function getExchangeRates(currency) {
    try {
        const response = await fetch(`${apiURL}${currency}`);
        if (!response.ok) throw new Error("تعذر الحصول على أسعار الصرف");
        return await response.json();
    } catch (error) {
        console.error("خطأ:", error);
    }
}

async function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').innerText = "يرجى إدخال مبلغ صالح.";
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById('result').innerText = `النتيجة: ${amount} ${toCurrency}`;
        return;
    }

    try {
        // استدعاء API لجلب سعر الصرف
        const ratesData = await getExchangeRates(fromCurrency);
        const rate = ratesData.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        document.getElementById('result').innerText = `النتيجة: ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        document.getElementById('result').innerText = "حدث خطأ أثناء تحويل العملات.";
    }
}

