// ==========================================
// WHATSAPP CONFIGURATION
// ==========================================
//
// IMPORTANT:
// Replace this with the brand's WhatsApp
// number including country code.
//
// Example for India:
// 919876543210
//
// Do NOT include:
// +
// spaces
// brackets
// dashes
// ==========================================

const WHATSAPP_NUMBER =
  "+919483234360";


// ==========================================
// OPEN WHATSAPP
// ==========================================

export function openWhatsApp(
  message
) {

  const encodedMessage =
    encodeURIComponent(
      message
    );


  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


  window.open(
    whatsappURL,
    "_blank"
  );

}