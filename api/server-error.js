export default function handler(req, res) {
  // محاكاة انهيار خادم داخلي ينتج عنه خطأ 500 رسمي من Vercel
  res.status(500);
  throw new Error("Internal Server Error: Database cluster connection timeout");
}
