/* Функция для корректировки ссылки на аватар, чтобы приходили разные картинки.
   Для этого нужно менять в ссылке размер картинки. */

export default function getAvatarUrl(url) {
  const imgUrl = new URL(url);
  // Определяем случайный размер в диапазоне 280 - 320.
  const imgSize = Math.floor(Math.random() * (320 - 280)) + 280;
  imgUrl.pathname = imgSize;
  return imgUrl.href;
}
