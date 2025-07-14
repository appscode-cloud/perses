

export function isAppleDevice(): boolean | undefined {
  if (typeof navigator === 'undefined' || typeof navigator.userAgent === 'undefined') {
    return;
  }
  return /(iPod|iPad|iPhone|Mac)/i.test(navigator.userAgent);
}
