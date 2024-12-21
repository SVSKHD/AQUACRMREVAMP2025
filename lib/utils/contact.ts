export function formatPhoneNumber(phone: number | null): string {
  if (!phone) return "";
  return phone.toString();
}

export function getWhatsAppLink(phone: number | null): string {
  const formattedPhone = formatPhoneNumber(phone);
  return `https://wa.me/${formattedPhone}`;
}

export function getEmailLink(email: string): string {
  return `mailto:${email}`;
}