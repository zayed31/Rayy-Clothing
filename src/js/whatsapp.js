// WhatsApp order message generation will be centralized here.
const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
