// Sanitize environment variables before any third-party library attempts to parse them
if (process.env.CLOUDINARY_URL) {
  try {
    const rawUrl = process.env.CLOUDINARY_URL.trim();
    if (rawUrl.includes('<') || rawUrl.includes('>') || !rawUrl.startsWith('cloudinary://')) {
      console.warn(
        '⚠️ [Cloudinary] Detected malformed CLOUDINARY_URL with placeholder brackets (e.g. <cloud_name>). ' +
          'Stripping it from process.env to prevent Node ERR_INVALID_URL crash. ' +
          'Please set your actual cloud name in Render environment variables or set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET directly.',
      );
      delete process.env.CLOUDINARY_URL;
    } else {
      // Validate with Node URL parser
      new URL(rawUrl);
    }
  } catch {
    console.warn(
      '⚠️ [Cloudinary] Invalid CLOUDINARY_URL format. Stripping from process.env to prevent startup crash.',
    );
    delete process.env.CLOUDINARY_URL;
  }
}
